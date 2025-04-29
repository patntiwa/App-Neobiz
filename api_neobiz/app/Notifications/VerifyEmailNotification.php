<?php

namespace App\Notifications;

use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmailNotification extends Notification
{
    protected $verificationUrl;

    public function __construct(string $verificationUrl)
    {
        $this->verificationUrl = $verificationUrl;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Vérification de votre adresse e-mail')
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line("Merci de vous être inscrit sur NeoBiz.")
            ->line("Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous afin de vérifier votre adresse e-mail.")
            ->action('Vérifier mon adresse e-mail', $this->verificationUrl)
            ->line("Si vous n'avez pas créé de compte, vous pouvez ignorer cet e-mail.")
            ->salutation("\nCordialement,\nL'équipe NeoBiz");
    }
} 
