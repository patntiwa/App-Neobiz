<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Vérifie si l'utilisateur a le rôle nécessaire
        if (Auth::user()->role !== $role) {
            return response()->json(['message' => 'Accès refusé. Vous n\'avez pas le rôle nécessaire.'], 403);
        }

        return $next($request);
    }
}
