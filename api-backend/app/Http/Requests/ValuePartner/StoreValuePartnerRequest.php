<?php

namespace App\Http\Requests\ValuePartner;

use Illuminate\Foundation\Http\FormRequest;

class StoreValuePartnerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'category_partner_id' => ['required'],
            'brand_name' => ['required', 'string'],
            'phone_number' => ['required', 'phone'],
            'email' => ['required', 'email', 'unique:value_partners,email'],
            'logo' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'name_brand.required' => 'brand name is required.',
            'phone_number.required' => 'phone number is required.',
            'phone_number.phone' => 'phone number is not valid.',
            'email.required' => 'email address is required.',
            'email.email' => 'email address must be a valid email format.',
            'email.unique' => 'The email address has already been taken.',
            'logo.required' => 'logo is required.',
            'logo.image' => 'logo must be an image.',
            'logo.mimes' => 'logo must be a file of type: jpeg, png, jpg, gif, svg.',
            'logo.max' => 'logo may not be greater than 2MB.',
        ];
    }
}
