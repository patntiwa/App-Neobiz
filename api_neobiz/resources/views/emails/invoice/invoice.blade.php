<h1>Facture #{{ $invoice->id }}</h1>
<p>Client : {{ $invoice->client->company_name }}</p>
<p>Montant : {{ $invoice->amount }} FCFA</p>
<p>Statut : {{ $invoice->status }}</p>
