<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  mixed  ...$roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $account = $request->user();

        if (!$account) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        foreach ($roles as $role) {
            if ($account->hasRole($role)) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Forbidden: Insufficient permissions'], 403);
    }
}
