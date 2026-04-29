<?php

namespace App\Http\Requests\ValuePartner;

use Illuminate\Foundation\Http\FormRequest;

class UpdateValuePartnerRequest extends FormRequest
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
            'category_partner_id' => ['nullable'],
            'brand_name' => ['nullable', 'string'],
            'phone_number' => ['nullable', 'phone:ID,AUTO'],
            'email' => ['nullable', 'email'],
            'logo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:2048'],
        ];
    }
}
