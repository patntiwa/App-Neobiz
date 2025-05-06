@component('mail::message')
# Paiement confirmé

Bonjour,

Nous confirmons la réception de votre paiement pour la facture **#{{ $invoice->id }}**.

- Montant : **{{ number_format($invoice->amount, 0, ',', ' ') }} FCFA**
- Projet : {{ $invoice->project->titre ?? '-' }}
- Statut : ✅ Payée

@component('mail::button', ['url' => url('/facture/' . $invoice->id)])
Voir la facture
@endcomponent

Merci pour votre confiance,<br>
{{ config('app.name') }}
@endcomponent
