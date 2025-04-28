<?php

namespace App\Http\Controllers\API;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:accounts',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $account = Account::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($account));

        return response()->json(['message' => 'Utilisateur créé avec succès. Please verify your email.'], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $account = Account::where('email', $request->email)->first();

        if (! $account || ! Hash::check($request->password, $account->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (! $account->is_active) {
            return response()->json(['message' => 'Account inactive.'], 403);
        }

        if (! $account->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email not verified.'], 403);
        }

        // Génération du code 2FA
        $account->two_factor_code = rand(100000, 999999);
        $account->two_factor_expires_at = now()->addMinutes(10);
        $account->save();

        Mail::raw('Your 2FA Code: ' . $account->two_factor_code, function ($message) use ($account) {
            $message->to($account->email)->subject('2FA Code');
        });

        return response()->json(['message' => '2FA code sent to your email']);
    }

    public function verify2fa(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|numeric',
        ]);

        $account = Account::where('email', $request->email)
            ->where('two_factor_code', $request->code)
            ->where('two_factor_expires_at', '>', now())
            ->first();

        if (! $account) {
            return response()->json(['message' => 'Invalid or expired 2FA code.'], 422);
        }

        $account->two_factor_code = null;
        $account->two_factor_expires_at = null;
        $account->save();

        $token = $account->createToken('api-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
