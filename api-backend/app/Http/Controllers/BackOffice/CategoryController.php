<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\HttpResponses;

class CategoryController extends Controller
{
    use HttpResponses;

    public function index()
    {
        return CategoryResource::collection(
            Category::latest()
                ->filterCategory(request(['search']))
                ->paginate(10)
        );
    }

    public function store(StoreCategoryRequest $request)
    {
        return CategoryResource::make(Category::create($request->validated()));
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return new CategoryResource($category);
    }

    public function destroy(Category $category)
    {
        try {
            $category->post()->detach();
            $category->delete();

            return $this->success(null, 'Category deleted successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to delete category. ' . $e->getMessage(), 500);
        }
    }
}
