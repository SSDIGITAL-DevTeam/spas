<?php

namespace App\Http\Requests\Meta;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreMetaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'key' => ['nullable', 'string', 'max:255'],
            'value' => ['nullable'],
            'content' => ['nullable'],
            'metaable_type' => ['nullable', 'string', 'max:255'],
            'metaable_id' => ['nullable', 'integer', 'numeric'],
        ];
    }
}
