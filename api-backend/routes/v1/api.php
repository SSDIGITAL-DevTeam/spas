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
        Route::get('validate-token', fn () => ['status' => true]);
        Route::post('/sign-out', [AuthController::class, 'logout']);

        Route::put('change-password', [ChangePasswordController::class, 'update'])->name('change-password');
    });
});

// PROTECTED ROUTES
Route::group(['middleware' => ['auth:sanctum']], function (): void {

    Route::apiResource('posts', BackOffice\PostController::class)->parameters(['posts' => 'post']);
    Route::apiResource('categories', BackOffice\CategoryController::class)->parameters(['categories' => 'category']);
    Route::apiResource('events', BackOffice\EventController::class)->parameters(['events' => 'event']);
    Route::apiResource('pages', BackOffice\PageController::class)->parameters(['pages' => 'page']);
    Route::apiResource('metas', BackOffice\MetaController::class)->parameters(['metas' => 'meta']);
    Route::apiResource('operators', BackOffice\OperatorController::class);
});

Route::prefix('end-user')->as('end-user.')->group(function (): void {

    Route::apiResource('operators', EndUser\OperatorController::class)->only('store', 'index', 'show');

    Route::middleware(['auth:sanctum'])->group(function (): void {
        Route::apiResource('operators', EndUser\OperatorController::class)->only('update');
    });

    Route::apiResource('posts', EndUser\PostController::class)->only(['index', 'show']);
    Route::apiResource('events', BackOffice\EventController::class)->only(['index', 'show']);
    Route::apiResource('categories', BackOffice\CategoryController::class)->only(['index', 'show']);

    Route::post('contacts', [BackOffice\ContactUsController::class, 'ContactUs'])->name('contacts');
    Route::post('subscribes', [EndUser\SucbscribeController::class, 'store'])->name('subscribes');
});
