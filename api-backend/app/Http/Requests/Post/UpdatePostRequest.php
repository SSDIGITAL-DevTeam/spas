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
            'status' => ['nullable', 'in:4,2'],
            'published_at' => ['nullable', 'date'],
            'url' => ['image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'tags' => ['array'],
            'tags.*.name' => ['required'],
            'categories' => ['array'],
            'categories.*.category_id' => ['required']
        ];
    }
}
