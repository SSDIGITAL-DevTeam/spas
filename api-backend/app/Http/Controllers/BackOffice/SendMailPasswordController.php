<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Mail\ApproveOperator;
use App\Mail\ApproveTherapist;
use App\Mail\RejectOperator;
use App\Mail\RejectTherapist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMailPassword;
use App\Models\Operator;
use App\Models\Therapist;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SendMailPasswordController extends Controller
{
    public function updatePasswordOperator(Request $request, $email)
    {
        $user = User::where('operator_id', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $newPassword = Str::random(8);

        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        // Mail::to('lawakclub17@gmail.com')->send(new ApproveOperator($newPassword, $user));
        Mail::to($user->email)->send(new ApproveOperator($newPassword, $user));

        return response()->json([
            'status' => 'success',
            'mesagge' => 'Send email login success'
        ], 200);
    }

    public function updatePasswordTherapist(Request $request, $email)
    {
        $user = User::where('therapist_id', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $newPassword = Str::random(8);

        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        // Mail::to('lawakclub17@gmail.com')->send(new ApproveTherapist($newPassword, $user));
        Mail::to($user->email)->send(new ApproveTherapist($newPassword, $user));

        return response()->json([
            'status' => 'success',
            'mesagge' => 'Send email login success'
        ], 200);
    }

    public function rejectOperator(Request $request, $id)
    {
        $validateData = $request->validate([
            'provide_issue' => ['required'],
        ]);

        $operator = Operator::find($id);

        if (!$operator) {
            return response()->json([
                'message' => 'Operator not found!',
            ]);
        }

        $user = $operator->user;

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ]);
        }

        Mail::to($user->email)->send(new RejectOperator($validateData));

        $operator->user()->delete();
        $operator->cover()->delete();
        $operator->delete();

        return response()->json([
            'message' => 'Send mail success'
        ], 201);
    }

    public function rejectTherapist(Request $request, $id)
    {
        $validateData = $request->validate([
            'provide_issue' => ['required'],
        ]);

        $therapist = Therapist::find($id);

        if (!$therapist) {
            return response()->json([
                'message' => 'Therapist not found!',
            ]);
        }

        $user = $therapist->user;

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ]);
        }

        Mail::to($user->email)->send(new RejectTherapist($validateData));

        $therapist->user()->delete();
        $therapist->cover()->delete();
        $therapist->delete();

        return response()->json([
            'message' => 'Send mail success'
        ], 201);
    }
}
