<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MyTestEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Créer une nouvelle instance de message.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Obtenir l'enveloppe du message.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */

    public function envelope()
    {
        return new Envelope(
            subject: 'Mon Email de Test',
        );
    }
 /**
     * Obtenir la définition du contenu du message.
     *
     * @return \Illuminate\Mail\Mailables\Content
     */

    public function content()
    {
        return new Content(
            view:'mail.test.email',
            with: [
                'name' => $this->name]
        );
    }

    /**
     * Obtenir les pièces jointes du message.
     *
     * @return array
     */
    public function attachments()
    {
        return [];
    }
}