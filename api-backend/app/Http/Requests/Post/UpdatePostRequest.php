<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePostRequest extends FormRequest
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
            'title' => ['nullable', 'string', 'max:255'],
            'slug' => ['nullable', 'alpha_dash', 'max:255'],
            'content' => ['nullable', 'string'],
            'status' => ['nullable', 'in:PUBLISHED,DRAFT'],
            'published_at' => ['nullable', 'date'],
            'url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'name' => ['nullable']
        ];
    }
}
