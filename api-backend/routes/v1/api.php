<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BackOffice;
use App\Http\Controllers\EndUser;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// PUBLIC ROUTES


Route::prefix('auth')->as('auth.')->group(function (): void {
    Route::post('/sign-in', [AuthController::class, 'login']);
    Route::post('/sign-up', [AuthController::class, 'register']);

    Route::middleware(['auth:sanctum'])->group(function (): void {
        Route::get('validate-token', fn () => ['status' => true]);
        Route::post('/sign-out', [AuthController::class, 'logout']);
    });
});

// PROTECTED ROUTES
Route::group(['middleware' => ['auth:sanctum']], function (): void {

    Route::apiResource('posts', BackOffice\PostController::class)->parameters(['posts' => 'post']);
    Route::apiResource('categories', BackOffice\CategoryController::class)->parameters(['categories' => 'category']);
    Route::apiResource('events', BackOffice\EventController::class)->parameters(['events' => 'event']);
    Route::apiResource('pages', BackOffice\PageController::class)->parameters(['pages' => 'page']);
    Route::apiResource('metas', BackOffice\MetaController::class)->parameters(['metas' => 'meta']);
});

Route::prefix('end-user')->as('end-user.')->group(function (): void {

    Route::apiResource('posts', EndUser\PostController::class)->only(['index', 'show']);
    Route::apiResource('events', BackOffice\EventController::class)->only(['index', 'show']);
    Route::apiResource('categories', BackOffice\CategoryController::class)->only(['index', 'show']);
});
