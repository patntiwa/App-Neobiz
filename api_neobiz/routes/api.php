<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PasswordResetController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\API\ClientController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\UserInfoController;
use App\Http\Controllers\API\RoleController;



/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/

// Routes d'authentification
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify-2fa', [AuthController::class, 'verify2fa']);
    Route::post('/forgot-password', [PasswordResetController::class, 'forgot']);
    Route::post('/reset-password', [PasswordResetController::class, 'reset']);
});

// Email verification routes
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return response()->json(['message' => 'Votre adresse email a été vérifiée avec succès.']);
})->middleware(['signed'])->name('verification.verify');

Route::post('/email/resend', function (Request $request) {
    if ($request->user()->hasVerifiedEmail()) {
        return response()->json(['message' => 'Votre email est déjà vérifié.'], 400);
    }

    $request->user()->sendEmailVerificationNotification();

    return response()->json(['message' => 'Un nouvel email de vérification a été envoyé.']);
})->middleware(['auth:sanctum']);

/*
|--------------------------------------------------------------------------
| Protected API Routes
|--------------------------------------------------------------------------
*/

    Route::middleware('auth:sanctum')->group(function () {
        // Route utilisateur
        Route::get('/user', function (Request $request) {
            return $request->user();
        });

        Route::middleware('auth:sanctum')->prefix('user-info')->group(function () {
            Route::put('/', [UserInfoController::class, 'update']); // Mise à jour des informations de l'utilisateur
        });
        Route::middleware(['auth:sanctum', 'role:admin'])->prefix('roles')->group(function () {
            Route::get('/', [RoleController::class, 'index']); // Liste des rôles
            Route::post('/', [RoleController::class, 'store']); // Créer un rôle
            Route::get('{id}', [RoleController::class, 'show']); // Afficher un rôle
            Route::put('{id}', [RoleController::class, 'update']); // Mettre à jour un rôle
            Route::delete('{id}', [RoleController::class, 'destroy']); // Supprimer un rôle
        });
    
     // Route client des utilisateurs
    Route::get('/', [ClientController::class, 'index']); // Liste des clients
    Route::post('/', [ClientController::class, 'store']); // Création d'un client
    Route::get('{client}', [ClientController::class, 'show']); // Voir un client
    Route::put('{client}', [ClientController::class, 'update']); // Mise à jour d'un client
    Route::delete('{client}', [ClientController::class, 'destroy']); // Supprimer un client

    Route::middleware('auth:sanctum')->prefix('projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::get('{project}', [ProjectController::class, 'show']);
        Route::put('{project}', [ProjectController::class, 'update']);
        Route::delete('{project}', [ProjectController::class, 'destroy']);
    });

    // Route de déconnexion
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Bienvenue Admin']);
        });
    });

    /*
    |--------------------------------------------------------------------------
    | Super Admin & Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::prefix('management')
        ->middleware('role:super_admin,admin')
        ->group(function () {
            Route::get('/users', function () {
                return response()->json(['message' => 'Gestion des utilisateurs']);
            });
            
            // Espace pour ajouter d'autres routes de gestion
    });
});

/*
|--------------------------------------------------------------------------
| API Version Control (Optional)
|--------------------------------------------------------------------------
*/

// Example pour versionner l'API si nécessaire
// Route::prefix('v1')->group(function () {
//     // Routes de l'API v1
// });



