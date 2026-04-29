<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return $this->handleApiException($e);
        }

        return parent::render($request, $e);
    }

    private function handleApiException(Throwable $e)
    {
        if ($e instanceof ValidationException) {
            return response()->json([
                'status' => false,
                'message' => 'The given data was invalid.',
                'errors' => $e->errors(),
            ], 422);
        }

        if ($e instanceof AuthenticationException) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthenticated. Please log in to continue.',
            ], 401);
        }

        if ($e instanceof AuthorizationException) {
            return response()->json([
                'status' => false,
                'message' => 'You do not have permission to perform this action.',
            ], 403);
        }

        if ($e instanceof ModelNotFoundException) {
            $model = class_basename($e->getModel());
            return response()->json([
                'status' => false,
                'message' => "{$model} not found.",
            ], 404);
        }

        if ($e instanceof NotFoundHttpException) {
            return response()->json([
                'status' => false,
                'message' => 'The requested URL was not found.',
            ], 404);
        }

        if ($e instanceof HttpException) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage() ?: 'An HTTP error occurred.',
            ], $e->getStatusCode());
        }

        return response()->json([
            'status' => false,
            'message' => app()->environment('production')
                ? 'An unexpected error occurred. Please try again later.'
                : '[' . class_basename($e) . '] ' . $e->getMessage(),
        ], 500);
    }
}
