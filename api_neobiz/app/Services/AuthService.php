<?php

namespace App\Services;

use App\Models\Account;
use App\Repositories\AccountRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;

class AuthService
{
    protected AccountRepository $accounts;

    public function __construct(AccountRepository $accounts)
    {
        $this->accounts = $accounts;
    }

    /**
     * Handle user login and send 2FA code.
     */
    public function login(array $credentials)
    {
        $remember = $credentials['remember_me'] ?? false;

        $account = $this->accounts->findByEmail($credentials['email']);

        if (! $account || ! Hash::check($credentials['password'], $account->password)) {
            abort(401, 'Identifiants incorrects.');
        }

        if (! $account->is_active) {
            abort(403, 'Votre compte est désactivé.');
        }

        if (! $account->hasVerifiedEmail()) {
            abort(403, 'Votre adresse email n\'est pas vérifiée.');
        }

        $this->generateAndSendTwoFactorCode($account);

        return response()->json([
            'message' => 'Un code de vérification a été envoyé à votre adresse email.',
            'remember_me' => $remember,
        ]);
    }

    public function register(array $data)
    {
        $account = Account::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'is_active' => true,
        ]);

        event(new \Illuminate\Auth\Events\Registered($account));

        $verificationUrl = \Illuminate\Support\Facades\URL::temporarySignedRoute(
            'verification.verify',
            \Illuminate\Support\Carbon::now()->addMinutes(60),
            ['id' => $account->id, 'hash' => sha1($account->email)]
        );

        return response()->json([
            'message' => 'Inscription réussie. Veuillez vérifier votre adresse email.',
            'verification_url' => $verificationUrl,
        ], 201);
    }


    /**
     * Generate and send a two-factor authentication code.
     */
    protected function generateAndSendTwoFactorCode(Account $account): void
    {
        $account->two_factor_code = random_int(100000, 999999);
        $account->two_factor_expires_at = now()->addMinutes(10);
        $account->save();

        Mail::raw('Votre code de vérification est : ' . $account->two_factor_code, function ($message) use ($account) {
            $message->to($account->email)
                    ->subject('Code de vérification 2FA');
        });
    }


}
