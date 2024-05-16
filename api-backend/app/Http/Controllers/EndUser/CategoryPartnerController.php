<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryPartner\CategoryPartnerCollection;
use App\Http\Resources\CategoryPartner\CategoryPartnerResource;
use App\Models\CategoryPartner;
use Illuminate\Http\Request;

class CategoryPartnerController extends Controller
{
    public function index(): CategoryPartnerCollection
    {
        return CategoryPartnerCollection::make(
            CategoryPartner::with('valuePartners')->latest()->paginate(10)
        );
    }

    public function show($slug): CategoryPartnerResource
    {
        $categoryPartner = CategoryPartner::where('slug', $slug)->firstOrFail();

        // Check if the post exists
        if (!$categoryPartner) {
            // Handle not found scenario, for example, return an error response
            return response()->json(['error' => 'Category Partner not found'], 404);
        }

        return CategoryPartnerResource::make($categoryPartner->load('valuePartners'));
    }
}
