<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use App\Http\Requests\InvoiceRequest;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return response()->json(Invoice::with('invoiceDetails')->get()); // Charger les détails avec les factures
    }

    public function store(InvoiceRequest $request)
    {
        $invoice = Invoice::create($request->validated());

        // Ajouter les détails de la facture si existants
        if ($request->has('invoice_details')) {
            foreach ($request->invoice_details as $detail) {
                InvoiceDetail::create([
                    'invoice_id' => $invoice->id,
                    'item_description' => $detail['item_description'],
                    'quantity' => $detail['quantity'],
                    'unit_price' => $detail['unit_price'],
                    'total_price' => $detail['quantity'] * $detail['unit_price'],
                    'discount' => $detail['discount'] ?? 0,
                ]);
            }
        }

        return response()->json(['message' => 'Facture créée avec succès.', 'invoice' => $invoice], 201);
    }

    public function show($id)
    {
        $invoice = Invoice::with('invoiceDetails')->findOrFail($id);
        return response()->json($invoice);
    }

    public function update(InvoiceRequest $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->update($request->validated());

        // Mettre à jour ou ajouter les détails de facture
        if ($request->has('invoice_details')) {
            foreach ($request->invoice_details as $detail) {
                $invoiceDetail = InvoiceDetail::find($detail['id']); // Vérifier si le détail existe
                if ($invoiceDetail) {
                    $invoiceDetail->update([
                        'item_description' => $detail['item_description'],
                        'quantity' => $detail['quantity'],
                        'unit_price' => $detail['unit_price'],
                        'total_price' => $detail['quantity'] * $detail['unit_price'],
                        'discount' => $detail['discount'] ?? 0,
                    ]);
                }
            }
        }

        return response()->json(['message' => 'Facture mise à jour avec succès.', 'invoice' => $invoice]);
    }

    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();
        return response()->json(['message' => 'Facture supprimée avec succès']);
    }
}
