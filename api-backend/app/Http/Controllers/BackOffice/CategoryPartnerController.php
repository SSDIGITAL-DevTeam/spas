<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryPartner\StoreCategoryPartnerRequest;
use App\Http\Requests\CategoryPartner\UpdateCategoryPartnerRequest;
use App\Http\Resources\CategoryPartner\CategoryPartnerCollection;
use App\Http\Resources\CategoryPartner\CategoryPartnerResource;
use App\Http\Resources\CategoryResource;
use App\Models\CategoryPartner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryPartnerController extends Controller
{
    public function index(): CategoryPartnerCollection
    {
        return CategoryPartnerCollection::make(
            CategoryPartner::latest()->paginate(10)
        );
    }

    public function store(StoreCategoryPartnerRequest $request): CategoryPartnerResource
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['name']);

        $categoryPartner = CategoryPartner::create($data);

        return new CategoryPartnerResource($categoryPartner);
    }

    public function show(CategoryPartner $category_partner): CategoryResource
    {
        return new CategoryResource($category_partner);
    }

    public function update(UpdateCategoryPartnerRequest $request, CategoryPartner $category_partner): CategoryPartnerResource
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['name']);

        $category_partner->update($data);

        return new CategoryPartnerResource($category_partner);
    }

    public function destroy(CategoryPartner $category_partner)
    {
        $category_partner->delete();
    }
}
