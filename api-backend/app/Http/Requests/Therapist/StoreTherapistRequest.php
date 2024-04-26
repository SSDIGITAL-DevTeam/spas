<?php

namespace App\Http\Requests\Therapist;

use Illuminate\Foundation\Http\FormRequest;

class StoreTherapistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'url' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'name' => ['required', 'string', 'max:255'],
            'passport_finno' => ['required', 'string', 'max:255'],
            'date_of_birth' => ['required', 'date'],
            'sex' => ['required', 'in:Male,Female'],
            'contact_no' => ['required', 'max:255', 'phone'],
            'nationality' => ['required', 'string'],
            'date_of_issue' => ['required', 'date'],
            'address' => ['required', 'string'],
            'professional_certs' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'email' => ['required', 'email', 'unique:users,email'],
            'name_cert' => ['required'],
            'issuing_organization' => ['required'],
            'date_of_issue' => ['required', 'date'],
            'expired_date' => ['required', 'date'],
            'credential_id' => ['required', 'numeric'],
        ];
    }

    public function messages()
    {
        return [
            'profile_picture.required' => 'A profile picture is required.',
            'profile_picture.image' => 'Profile Picture must be an image.',
            'profile_picture.mimes' => 'Profile Picture must be a file of type: jpeg, png, jpg, gif, svg.',
            'profile_picture.max' => 'Profile Picture may not be greater than 2mb.',
            'name.required' => 'Please enter your name.',
            'passport_finno.required' => 'Your passport or FIN number is required.',
            'date_of_birth.required' => 'Your date of birth is required.',
            'date_of_birth.date' => 'Date of birth must be a valid date.',
            'sex.required' => 'Please select a gender.',
            'sex.in' => 'Gender must be male, female.',
            'contact_no.required' => 'A contact number is required.',
            'contact_no.phone' => 'Contact number is not valid.',
            'nationality.required' => 'Nationality is required.',
            'date_of_issue.required' => 'Date of issue is required.',
            'date_of_issue.date' => 'Date of issue must be a valid date.',
            'address.required' => 'Address is required.',
            'address_nearest_mrt.required' => 'Nearest MRT station is required.',
            'professional_certs.required' => 'Professional certifications are required.',
            'professional_certs.image' => 'Professional Certs must be an image.',
            'professional_certs.mimes' => 'Professional Certs must be a file of type: jpeg, png, jpg, gif, svg.',
            'professional_certs.max' => 'Professional Certs may not be greater than 2mb.',
            'employment_history.required' => 'Employment history is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already in use.',
        ];
    }
}
