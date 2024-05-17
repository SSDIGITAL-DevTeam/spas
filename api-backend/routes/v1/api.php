<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\BackOffice;
use App\Http\Controllers\EndUser;
use Illuminate\Support\Facades\Route;

// PUBLIC ROUTES
Route::prefix('auth')->as('auth.')->group(function (): void {
    Route::post('/sign-in', [AuthController::class, 'login']);
    Route::post('/sign-up', [AuthController::class, 'register']);

    // this route for OTP mail
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot-password');
    Route::post('validate-otp', [AuthController::class, 'validateOtp'])->name('validate-otp');
    Route::post('reset-password/{user}', [AuthController::class, 'resetPassword'])->name('reset-password');

    Route::middleware(['auth:sanctum'])->group(function (): void {
        Route::post('/sign-out', [AuthController::class, 'logout']);

        Route::middleware('role:admin')->group(function (): void {
            Route::get('/validate-token', fn () => ['role' => true]);

            Route::put('change-password', [ChangePasswordController::class, 'update'])->name('change-password');
        });
    });
});

// PROTECTED ROUTES
Route::group(['middleware' => ['auth:sanctum']], function (): void {

    Route::middleware('role:admin')->group(function (): void {
        Route::apiResource('posts', BackOffice\PostController::class)->parameters(['posts' => 'post']);
        Route::apiResource('categories', BackOffice\CategoryController::class)->parameters(['categories' => 'category']);
        Route::apiResource('events', BackOffice\EventController::class)->parameters(['events' => 'event']);
        Route::apiResource('pages', BackOffice\PageController::class)->parameters(['pages' => 'page']);
        Route::apiResource('metas', BackOffice\MetaController::class)->parameters(['metas' => 'meta']);
        Route::apiResource('operators', BackOffice\OperatorController::class);
        Route::apiResource('therapists', BackOffice\TherapistController::class);
        Route::apiResource('value-partners', BackOffice\ValuePartnerController::class);
        Route::apiResource('category-partners', BackOffice\CategoryPartnerController::class);
        Route::apiResource('request-updates', BackOffice\RequestUpdateController::class);

        // this route for email send detail login member
        Route::patch('send-mail-operator/{user}', [BackOffice\SendMailPasswordController::class, 'updatePasswordOperator'])->name('send-mail-operator');
        Route::patch('send-mail-therapist/{user}', [BackOffice\SendMailPasswordController::class, 'updatePasswordTherapist'])->name('send-mail-therapist');

        // this route for reject member
        Route::post('reject-operator/{user}', [BackOffice\SendMailPasswordController::class, 'rejectOperator'])->name('reject-operator');
        Route::post('reject-therapist/{user}', [BackOffice\SendMailPasswordController::class, 'rejectTherapist'])->name('reject-therapist');
    });
});

Route::prefix('end-user')->as('end-user.')->group(function (): void {

    // GUEST
    Route::apiResource('operators', EndUser\OperatorController::class)->only('store', 'index', 'show');
    Route::apiResource('therapists', EndUser\TherapistController::class)->only('store');


    // IF LOGIN WITH ROLE OPERATOR OR THERAPIST
    Route::middleware(['auth:sanctum'])->group(function (): void {
        // For Operators
        Route::middleware('role:operator')->group(function () {
            Route::prefix('operator')->group(function () {
                Route::apiResource('therapists', EndUser\TherapistController::class)->only('index', 'show');
                Route::apiResource('operators', EndUser\OperatorController::class)->only('update', 'index', 'show');

                Route::apiResource('partners', EndUser\CategoryPartnerController::class)->only('index', 'show');

                Route::apiResource('value-partners', EndUser\ValurPartnerController::class)->only('index', 'show');

                Route::post('request-operators', [EndUser\RequestUpdateController::class, 'requestOperator']);
            });
        });

        // For Therapists
        Route::middleware('role:therapist')->group(function () {
            Route::prefix('therapist')->group(function () {
                Route::apiResource('therapists', EndUser\TherapistController::class)->only('update', 'show');
                Route::apiResource('operators', EndUser\OperatorController::class)->only('index', 'show');

                Route::apiResource('carrers', EndUser\EmploymentHistoryController::class);

                Route::post('request-therapists', [EndUser\RequestUpdateController::class, 'requestTherapist']);
            });
        });

        Route::get('/me', [AuthController::class, 'me']);
    });


    Route::apiResource('posts', EndUser\PostController::class)->only(['index', 'show']);
    Route::apiResource('events', BackOffice\EventController::class)->only(['index', 'show']);
    Route::apiResource('categories', BackOffice\CategoryController::class)->only(['index', 'show']);

    Route::post('contacts', [BackOffice\ContactUsController::class, 'ContactUs'])->name('contacts');
    Route::post('subscribes', [EndUser\SucbscribeController::class, 'store'])->name('subscribes');
});
