<?php

namespace App\Traits;

trait HttpResponses
{
    protected function success(mixed $data = null, string $message = 'Request was successful.', int $code = 200)
    {
        return response()->json([
            'status' => true,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    protected function error(string $message = 'An error occurred.', int $code = 500, array|null $errors = null)
    {
        $response = [
            'status' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }
}
