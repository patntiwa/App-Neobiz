<?php

namespace App\Services;

use App\Models\Account;
use App\Repositories\AccountRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Role; // Assurez-vous que votre modèle Role est bien ici


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
    
        $account = Account::with('roles')->where('email', $credentials['email'])->first();
    
        if (!$account || !Hash::check($credentials['password'], $account->password)) {
            abort(401, 'Identifiants incorrects.');
        }
    
        if (!$account->is_active) {
            abort(403, 'Votre compte est désactivé.');
        }
    
        Auth::login($account, $remember);
    
        return response()->json([
            'message' => 'Connexion réussie.',
            'user' => [
                'id' => $account->id,
                'name' => $account->name,
                'email' => $account->email,
                'roles' => $account->roles->pluck('name')->toArray() // Récupère tous les rôles sous forme de tableau
            ],
            'remember_me' => $remember
        ]);
    }

    public function register(array $data)
    {
        $account = Account::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'is_active' => true, // Actif par défaut
        ]);

        // Attribution automatique du rôle "client" en utilisant le modèle Role
        $clientRole = Role::where('name', 'client')->first();
        if ($clientRole) {
            $account->roles()->attach($clientRole->id);
        } else {
            // Gérer le cas où le rôle 'client' n'existe pas, par exemple, logguer une erreur.
            // Il est préférable de s'assurer que ce rôle est créé via les migrations/seeders.
        }

        // Connexion automatique
        Auth::login($account);
        $account->load('roles'); // Recharger l'instance pour inclure la relation des rôles

        return response()->json([
            'message' => 'Inscription réussie.',
            'user' => [
                'id' => $account->id,
                'name' => $account->name,
                'email' => $account->email,
                'is_active' => $account->is_active,
                'roles' => $account->roles->pluck('name')->toArray() // Inclure les rôles
            ]
        ], 201);
    }


    /**
     * Generate and send a two-factor authentication code.
     */
    
     /*
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
        */

   /*
    public function verify2fa(array $data)
    {
        $account = Account::where('email', $data['email'])->first();

        if (! $account) {
            abort(404, 'Compte non trouvé.');
        }

        if ($account->two_factor_code !== $data['code']) {
            abort(401, 'Code de vérification incorrect.');
        }

        if ($account->two_factor_expires_at->lt(now())) {
            abort(401, 'Code expiré.');
        }

        // Si tout est OK ➔ Authentification validée
        $token = $account->createToken('auth_token')->plainTextToken;

        // Réinitialiser le code 2FA
        $account->update([
            'two_factor_code' => null,
            'two_factor_expires_at' => null,
        ]);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    */

}
