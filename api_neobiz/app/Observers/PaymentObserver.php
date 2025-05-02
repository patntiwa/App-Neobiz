<?php

namespace App\Observers;

use App\Models\Payment;
use App\Mail\InvoicePaidMail;
use Illuminate\Support\Facades\Mail;

class PaymentObserver
{
    /**
     * Handle the Payment "created" event.
     */
    public function created(Payment $payment)
    {
        if ($payment->invoice && $payment->status === 'paid') {
            $invoice = $payment->invoice;

            // Total payé (par tous les paiements)
            $totalPaid = $invoice->payments()->where('status', 'paid')->sum('amount');

            if ($totalPaid >= $invoice->amount) {
                $invoice->update(['status' => 'paid']);

                // Envoi automatique d’un mail avec PDF
                if ($invoice->client && $invoice->client->email) {
                    Mail::to($invoice->client->email)->send(new InvoicePaidMail($invoice));
                }
            }
        }
    }

    public function updated(Payment $payment): void {}
    public function deleted(Payment $payment): void {}
    public function restored(Payment $payment): void {}
    public function forceDeleted(Payment $payment): void {}
}
