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
use App\Models\Cover;
use App\Models\OneTimePassword;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\JsonResponse;
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
        $user->role = UserStatus::Admin->value;
        $user->save();

        return $this->success(new UserResource($user), 'User registered successfully.', 201);
    }

    public function login(LoginUserRequest $request)
    {
        $credentials = $request->validated();

        if (!auth()->attempt($credentials)) {
            return $this->error('The provided credentials do not match our records.', 401);
        }

        /** @var User $user */
        $user = auth()->user();

        return $this->success([
            'token' => $user->createToken('access-token')->plainTextToken,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success(null, 'You have successfully been logged out.');
    }

    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $validated = $request->validated();

        $user = User::where('email', $validated['email'])->firstOrFail();

        $otp = OneTimePassword::create([
            'user_id' => $user->id,
            'code' => random_int(100000, 999999),
            'expired_at' => now()->addMinutes(5),
        ]);

        Mail::to($user->email)->send(new Otp($otp));

        return $this->success(null, 'OTP has been sent to your email.');
    }

    public function validateotp(ValidateOtpRequest $request)
    {
        $validatedData = $request->validated();

        $otp = OneTimePassword::where('code', $validatedData['code'])->firstOrFail();

        return new OtpResource($otp->load('user'));
    }

    public function resetPassword(PasswordResetRequest $request, User $user): JsonResponse
    {
        try {
            $validatedData = $request->validated();

            unset($validatedData['password_confirmation']);

            $user->update(['password' => Hash::make($validatedData['password'])]);

            return response()->json([
                'status' => true,
                'message' => 'Password reset successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to reset password. Please try again later.',
            ], 500);
        }
    }

    public function me()
    {
        /** @var User $user */
        $user = Auth::user();

        $coverUrl = null;

        if ($user->therapist_id) {
            $therapist = Cover::find($user->therapist_id);
            if ($therapist) {
                $coverUrl = $therapist->url;
            }
        }

        if (!$coverUrl && $user->operator_id) {
            $operator = Cover::find($user->operator_id);
            if ($operator) {
                $coverUrl = $operator->url;
            }
        }

        $user->cover_url = $coverUrl;

        return new UserResource($user);
    }
}
