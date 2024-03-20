<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateChangePasswordRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    public function update(UpdateChangePasswordRequest $request)
    {
        $validatedData = $request->validated();

        unset($validatedData['current_password']);
        unset($validatedData['password_confirmation']);

        $hashedPassword = Hash::make($validatedData['password']);

        $request->user()->update(['password' => $hashedPassword]);

        $user = $request->user();

        // $userWithMember = $user->load('member');

        return response()->json([
            'status' => 'Request wa successfull',
            'message' => null,
            'data' => [
                'user' => $user
            ]
        ], 200);
    }
}
