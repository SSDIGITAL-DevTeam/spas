<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\PasswordResetRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\ValidateOtpRequest;
use App\Http\Resources\Otp\OtpResource;
use App\Http\Resources\User\UserResource;
use App\Mail\Otp;
use App\Models\OneTimePassword;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    use HttpResponses;

    public function register(StoreUserRequest $request)
    {
        $request->validated($request->all());

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->role = UserStatus::class;
        $user->save();

        return response()->json([
            'message' => $user
        ]);
    }

    public function login(LoginUserRequest $request)
    {

        $credentials = $request->validated();

        if (!auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'The provided credentials do not match our records.',
            ], 401);
        }

        /** @var User $user */
        $user = auth()->user();

        return response()->json([
            'data' => [
                'token' => $user->createToken('access-token')->plainTextToken,
            ],
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'You have successfully been logged out'
        ]);
    }

    // SEND MAIL OTP
    public function forgotPassword(ForgotPasswordRequest $request): array
    {
        $email = $request->validated();

        $user = User::where('email', $email)->firstOrFail();

        if (!$user) {
            return  ['message' => 'user not found'];
        }

        $otp = OneTimePassword::create(
            [
                'user_id' => $user->id,
                'code' => random_int(100000, 999999),
                'expired_at' => now()->addMinutes(5),
            ]
        );

        Mail::to('lawakclub17@gmail.com')->send(new Otp($otp));
        return compact('user', 'otp');
    }

    public function validateotp(ValidateOtpRequest $request)
    {
        $validatedData = $request->validated();

        $otp = OneTimePassword::where('code', $validatedData['code'])->firstOrFail();

        if ($otp) {
            return new OtpResource($otp->load('user'));
        } else {
            return response()->json([
                'message' => 'Invalid Otp'
            ], 400);
        }
    }

    public function resetPassword(PasswordResetRequest $request, User $user): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            unset($validatedData['password_confirmation']);

            $hashedPassword = Hash::make($validatedData['password']);

            $user->update(['password' => $hashedPassword]);

            return new JsonResponse([
                'message' => 'Password reset successfully.',
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'message' => 'Failed to reset password. Please try again later.',
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function me(): UserResource
    {

        /** @var User $user */
        $user = Auth::user();

        if ($user !== null) {
            $user->load(['operator.cover', 'therapist.cover']);
        }

        return UserResource::make($user);
    }
}
