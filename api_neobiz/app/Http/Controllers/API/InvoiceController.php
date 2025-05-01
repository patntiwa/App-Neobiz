<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Http\Requests\InvoiceRequest;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return response()->json(Invoice::all());
    }

    public function store(InvoiceRequest $request)
    {
        $invoice = Invoice::create($request->validated());
        return response()->json($invoice, 201);
    }

    public function show($id)
    {
        return response()->json(Invoice::findOrFail($id));
    }

    public function update(InvoiceRequest $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->update($request->validated());
        return response()->json($invoice);
    }

    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();
        return response()->json(['message' => 'Invoice deleted']);
    }
}
