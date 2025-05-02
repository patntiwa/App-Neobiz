<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Invoice;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Liste des paiements du compte connecté
     */
    public function index()
    {
        $payments = Payment::with('invoice')
            ->where('account_id', auth()->id())
            ->latest()
            ->get();

        return response()->json($payments);
    }

    /**
     * Enregistrement d’un paiement (manuel/test)
     */
    public function store(Request $request)
    {
        $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'amount' => 'required|numeric|min:100',
            'payment_method' => 'nullable|string',
        ]);

        $payment = Payment::create([
            'account_id' => auth()->id(),
            'invoice_id' => $request->invoice_id,
            'account_status_id' => null, // facultatif
            'amount' => $request->amount,
            'status' => 'paid',
            'payment_method' => $request->payment_method ?? 'manuel',
            'paid_at' => now(),
        ]);

        return response()->json([
            'message' => 'Paiement enregistré',
            'payment' => $payment
        ], 201);
    }

    /**
     * Statistiques globales pour tableau de bord client
     */
    public function stats()
    {
        $accountId = auth()->id();

        return response()->json([
            'total_paid' => Payment::where('account_id', $accountId)->where('status', 'paid')->sum('amount'),
            'invoice_count' => Invoice::where('client_id', $accountId)->count(),
            'unpaid_invoices' => Invoice::where('client_id', $accountId)->where('status', 'pending')->count(),
        ]);
    }
}
