<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use App\Http\Requests\Verify2FARequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        return $this->authService->login($request->validated());
    }

    public function register(RegisterRequest $request)
    {
        return $this->authService->register($request->validated());
    }
    /*
    public function verify2fa(Request $request)
    {
        // Appel au service
        return $this->authService->verify2fa($request->all());
    }
    */
}
