<?php

namespace App\Http\Requests\Operator;

use Illuminate\Foundation\Http\FormRequest;

class StoreOperatorRequest extends FormRequest
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
            'company_name' => ['required', 'string', 'max:255'],
            'uen_no' => ['required', 'string', 'max:255', 'unique:operators,uen_no'],
            'brand_name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'contact_no' => ['required', 'string', 'max:255'],
            'contact_person' => ['required', 'string', 'max:255'],
            'contact_person_no' => ['required', 'string', 'max:255'],
            'url' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'payment_slip' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
            'email' => ['required', 'email', 'unique:users,email'],
        ];
    }

    public function message()
    {
        return [
            'company_name.required' => 'Company name is required.',
            'uen_no.required' => 'UEN number is required.',
            'uen_no.unique' => 'UEN number has already been taken.',
            'brand_name.required' => 'Brand name is required.',
            'address.required' => 'Address is required.',
            'contact_no.required' => 'Contact number is required.',
            'contact_person.required' => 'Contact person name is required.',
            'contact_person_no.required' => 'Contact person number is required.',
            'payment_slip.required' => 'Payment slip is required.',
            'payment_slip.image' => 'Payment slip must be an image.',
            'payment_slip.mimes' => 'Payment slip must be a file of type: jpeg, png, jpg, gif, svg.',
            'payment_slip.max' => 'Payment slip may not be greater than 2mb.',
            'url.required' => 'Logo company is required.',
            'url.image' => 'Logo company must be an image.',
            'url.mimes' => 'Logo company must be a file of type: jpeg, png, jpg, gif, svg.',
            'url.max' => 'Logo company may not be greater than 2mb.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email address is already in use.',
        ];
    }
}
