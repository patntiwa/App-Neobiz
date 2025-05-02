<?php

namespace App\Services;

use App\Models\Account;
use App\Models\Role;
use App\Models\AccountStatus;
use App\Repositories\AccountRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class AuthService
{
    protected $accounts;

    public function __construct(AccountRepository $accounts)
    {
        $this->accounts = $accounts;
    }

    public function register(array $data)
    {
        // 1. Récupérer le rôle "client" et le status "standard"
        $role = Role::where('name', 'client')->first();
        $status = AccountStatus::where('name', 'standard')->first();

        // 2. Créer le compte
        $account = Account::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'is_active' => true,
            'account_status_id' => $status?->id,
        ]);

        // 3. Attacher le rôle client
        if ($role) {
            $account->roles()->attach($role->id);
        }

        // 4. Initialiser userInfo vide
        $account->userInfo()->create([
            'prenom' => $data['prenom'] ?? null,
            'nom' => $data['nom'] ?? null,
        ]);

        // 5. Envoyer l’email de vérification
        $account->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Compte créé. Veuillez vérifier votre adresse e-mail.',
        ], 201);
    }

    public function login(array $credentials)
    {
        $account = $this->accounts->findByEmail($credentials['email']);
        $remember = $credentials['remember_me'] ?? false;

        if (! $account || ! Hash::check($credentials['password'], $account->password)) {
            abort(401, 'Identifiants incorrects.');
        }

        if (! $account->is_active) {
            abort(403, 'Votre compte est désactivé.');
        }

        if (! $account->hasVerifiedEmail()) {
            abort(403, 'Votre adresse email n\'est pas vérifiée.');
        }

        // Générer le code 2FA
        $account->two_factor_code = rand(100000, 999999);
        $account->two_factor_expires_at = now()->addMinutes(10);
        $account->save();

        // Envoi du code 2FA par mail
        Mail::raw('Votre code de vérification est : ' . $account->two_factor_code, function ($message) use ($account) {
            $message->to($account->email)->subject('Code de vérification 2FA');
        });

        return response()->json([
            'message' => 'Un code de vérification a été envoyé à votre adresse email.',
        ]);
    }

    public function verify2fa(array $data)
    {
        $account = auth()->user();
    
        if (!$account) {
            return response()->json(['message' => 'Utilisateur non authentifié.'], 401);
        }
    
        if (!isset($data['code'])) {
            return response()->json(['message' => 'Le code 2FA est requis.'], 422);
        }
    
        // Supposons que le code soit stocké temporairement dans une colonne `two_factor_code`
        if ($account->two_factor_code !== $data['code']) {
            return response()->json(['message' => 'Code 2FA invalide.'], 400);
        }
    
        // Optionnel : vérifier l’expiration du code (ex : validité 10 minutes)
        if ($account->two_factor_expires_at && now()->greaterThan($account->two_factor_expires_at)) {
            return response()->json(['message' => 'Code 2FA expiré.'], 403);
        }
    
        // 2FA validé : suppression du code temporaire
        $account->update([
            'two_factor_code' => null,
            'two_factor_expires_at' => null,
        ]);
    
        // Génération du token (si nécessaire)
        $token = $account->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'message' => '2FA validé avec succès',
            'token' => $token,
            'account' => $account,
        ], 200);
    }
    
}
