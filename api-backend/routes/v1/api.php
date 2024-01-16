<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BackOffice;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// PUBLIC ROUTES
Route::post('/sign-up', [AuthController::class, 'register']);
Route::post('/sign-in', [AuthController::class, 'login']);

// PROTECTED ROUTES 
Route::group(['middleware' => ['auth:sanctum']], function (): void {

    Route::post('/sign-out', [AuthController::class, 'logout']);

    Route::apiResource('posts', BackOffice\PostController::class)->parameters(['posts' => 'post']);
    Route::apiResource('categories', BackOffice\CategoryController::class)->parameters(['categories' => 'category']);
    Route::apiResource('events', BackOffice\EventController::class)->parameters(['events' => 'event']);
    Route::apiResource('pages', BackOffice\PageController::class)->parameters(['pages' => 'page']);
    Route::apiResource('metas', BackOffice\MetaController::class)->parameters(['metas' => 'meta']);
});
