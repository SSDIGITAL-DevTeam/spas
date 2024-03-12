<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Mail\ContactUsMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactUsController extends Controller
{
    public function ContactUs(Request $request)
    {
        $message = [
            'topic.required' => 'Topic is required.',
            'fullname.required' => 'Full Name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'message.required' => 'Message is required.',
        ];

        $validatedData = $request->validate([
            'topic' => ['required', 'string'],
            'fullname' => ['required', 'string'],
            'email' => ['required', 'email'],
            'message' => ['required', 'string'],
        ], $message);

        // Jika validasi berhasil, kirim email
        Mail::mailer('smtp')->to('hello@spas.com.sg')->send(new ContactUsMail($validatedData));

        return response()->json(['message' => 'Email is sent successfully.'], 200);
    }
}
