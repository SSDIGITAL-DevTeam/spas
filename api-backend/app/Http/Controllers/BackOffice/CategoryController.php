<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(
            Category::latest()->get()
        );
    }

    public function store(StoreCategoryRequest $request)
    {
        return CategoryResource::make(Category::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {

        $category->update($request->all());

        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {

        try {
            $category->post()->detach();
            $category->delete();

            return response()->json(['message' => 'Category deleted successfully'], 200);
        } catch (\Exception $e) {
            // Jika terjadi kesalahan saat menghapus halaman
            return response()->json(['error' => 'Failed to delete category. ' . $e->getMessage()], 500);
        }
    }
}
