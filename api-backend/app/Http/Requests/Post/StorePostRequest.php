<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
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
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'unique:posts,slug', 'alpha_dash', 'max:255'],
            'content' => ['required', 'string'],
            'status' => ['nullable', 'in:PUBLISHED,DRAFT'],
            'published_at' => ['nullable', 'date'],
            'url' => ['required', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'tags' => ['required', 'array'],
            'tags.*.name' => ['required'],
            'categories' => ['required', 'array'],
            'categories.*.category_id' => ['required']
        ];
    }
}
