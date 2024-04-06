<?php

namespace App\Http\Requests\Member;

use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRequest extends FormRequest
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
            'address' => ['required', 'string', 'max:255'],
            'nirc_work_pass' => ['required', 'string', 'max:255'],
            'contact_no' => ['required', 'string', 'max:20'],
            'wechat_representative_id' => ['required', 'string', 'max:255'],
            'company_uen_no' => ['required', 'string', 'max:255'],
            'company_email' => ['required', 'email', 'unique:members,company_email', 'max:255'],
            'name_of_representative' => ['required', 'string', 'max:255'],
            'designation' => ['required', 'string', 'max:255'],
            'wechat_id' => ['required', 'string', 'max:255'],
            'url' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],

            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email', 'max:255'],
            'password' => ['required', 'string', 'max:255'],
        ];
    }
}
