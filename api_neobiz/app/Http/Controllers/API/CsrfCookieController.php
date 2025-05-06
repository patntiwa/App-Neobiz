<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CsrfCookieController extends Controller
{
    /**
     * Show the CSRF cookie.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show()
    {
        return response()->json(['message' => 'CSRF cookie set successfully.']);
    }
}
