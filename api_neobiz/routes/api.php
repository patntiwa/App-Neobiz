<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\{
    AuthController,
    PasswordResetController,
    ClientController,
    ProjectController,
    UserInfoController,
    RoleController,
    InvoiceController,
    TaskController,
    PaymentController,
    CsrfCookieController
};

use Illuminate\Foundation\Auth\EmailVerificationRequest;

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);


Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/verify-2fa', [AuthController::class, 'verify2fa']);
    Route::post('/forgot-password', [PasswordResetController::class, 'forgot']);
    Route::post('/reset-password', [PasswordResetController::class, 'reset']);
});

/*
|--------------------------------------------------------------------------
| Email Verification Routes
|--------------------------------------------------------------------------
*/
Route::middleware(['signed'])->name('verification.verify')
    ->get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return response()->json(['message' => 'Votre adresse email a été vérifiée avec succès.']);
    });

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // User Profile Routes
    Route::get('/user', fn(Request $request) => $request->user());
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    // User Info Routes
    Route::prefix('user-info')->group(function () {
        Route::put('/', [UserInfoController::class, 'update']);
    });

    // Client Management Routes
    Route::prefix('clients')->group(function () {
        Route::get('/', [ClientController::class, 'index']);
        Route::post('/', [ClientController::class, 'store']);
        Route::get('{client}', [ClientController::class, 'show']);
        Route::put('{client}', [ClientController::class, 'update']);
        Route::delete('{client}', [ClientController::class, 'destroy']);
    });

   //paiement routes 
    Route::middleware(['auth:sanctum'])->prefix('payments')->group(function () {
        Route::get('/', [PaymentController::class, 'index']);
        Route::post('/', [PaymentController::class, 'store']);
        Route::get('/stats', [PaymentController::class, 'stats']);
    });


    // Project Management Routes
    Route::prefix('projects')->group(function () {
        Route::get('/', [ProjectController::class, 'index']);
        Route::post('/', [ProjectController::class, 'store']);
        Route::get('{project}', [ProjectController::class, 'show']);
        Route::put('{project}', [ProjectController::class, 'update']);
        Route::delete('{project}', [ProjectController::class, 'destroy']);
    });

     // Invoices Routes
    Route::middleware('auth:sanctum')->prefix('invoices')->group(function () {
        Route::get('/', [InvoiceController::class, 'index']);
        Route::post('/', [InvoiceController::class, 'store']);
        Route::get('{id}', [InvoiceController::class, 'show']);
        Route::put('{id}', [InvoiceController::class, 'update']);
        Route::delete('{id}', [InvoiceController::class, 'destroy']);
    });
    
     // tasks Routes
    Route::middleware('auth:sanctum')->prefix('tasks')->group(function () {
        Route::get('/', [TaskController::class, 'index']);
        Route::post('/', [TaskController::class, 'store']);
        Route::get('{id}', [TaskController::class, 'show']);
        Route::put('{id}', [TaskController::class, 'update']);
        Route::delete('{id}', [TaskController::class, 'destroy']);
    });

    /*
    |--------------------------------------------------------------------------
    | Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:admin')->group(function () {
        // Role Management Routes
        Route::prefix('roles')->group(function () {
            Route::get('/', [RoleController::class, 'index']);
            Route::post('/', [RoleController::class, 'store']);
            Route::get('{id}', [RoleController::class, 'show']);
            Route::put('{id}', [RoleController::class, 'update']);
            Route::delete('{id}', [RoleController::class, 'destroy']);
        });

        Route::prefix('admin')->group(function () {
            Route::get('/dashboard', fn() => response()
                ->json(['message' => 'Bienvenue Admin']));
        });
    });

    /*
    |--------------------------------------------------------------------------
    | Super Admin Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('role:super_admin')->prefix('super-admin')->group(function () {
        Route::get('/management/users', fn() => response()
            ->json(['message' => 'Gestion des utilisateurs']));
    });

    // Email Verification for Authenticated Users
    Route::post('/email/resend', function (Request $request) {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json(['message' => 'Votre email est déjà vérifié.'], 400);
        }
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Un nouvel email de vérification a été envoyé.']);
    });
});




