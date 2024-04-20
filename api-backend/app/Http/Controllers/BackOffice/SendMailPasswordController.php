<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Mail\ApproveOperator;
use App\Mail\ApproveTherapist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMailPassword;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SendMailPasswordController extends Controller
{
    public function updatePasswordOperator(Request $request, $email)
    {
        // Temukan pengguna berdasarkan alamat email
        $user = User::where('operator_id', $email)->first();

        // Pastikan pengguna ditemukan sebelum melanjutkan
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Buat kata sandi baru
        $newPassword = Str::random(8);

        // Update kata sandi pengguna dengan kata sandi baru yang di-hash
        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        // Kirim email dengan kata sandi baru
        Mail::to('lawakclub17@gmail.com')->send(new ApproveOperator($newPassword, $user));
        // Mail::mailer('smtp')->to('hello@spas.com.sg')->send(new SendMailPassword($newPassword, $user));

        // Mengembalikan variabel $user dan $newPassword dalam bentuk array
        return response()->json([
            'status' => 'success',
            'mesagge' => 'Send email login success'
        ], 200);
    }

    public function updatePasswordTherapist(Request $request, $email)
    {
        // Temukan pengguna berdasarkan alamat email
        $user = User::where('therapist_id', $email)->first();

        // Pastikan pengguna ditemukan sebelum melanjutkan
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Buat kata sandi baru
        $newPassword = Str::random(8);

        // Update kata sandi pengguna dengan kata sandi baru yang di-hash
        $user->update([
            'password' => Hash::make($newPassword),
        ]);

        // Kirim email dengan kata sandi baru
        Mail::to('lawakclub17@gmail.com')->send(new ApproveTherapist($newPassword, $user));
        // Mail::mailer('smtp')->to('hello@spas.com.sg')->send(new SendMailPassword($newPassword, $user));

        // Mengembalikan variabel $user dan $newPassword dalam bentuk array
        return response()->json([
            'status' => 'success',
            'mesagge' => 'Send email login success'
        ], 200);
    }
}
