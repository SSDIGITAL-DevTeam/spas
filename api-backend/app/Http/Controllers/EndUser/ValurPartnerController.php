<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Resources\ValuePartner\ValuePartnerCollection;
use App\Http\Resources\ValuePartner\ValuePartnerResource;
use App\Models\CategoryPartner;
use App\Models\ValuePartner;
use Illuminate\Http\Request;

class ValurPartnerController extends Controller
{
    public function index(): ValuePartnerCollection
    {
        return ValuePartnerCollection::make(
            ValuePartner::with('categoryPartner')->latest()->paginate(10)
        );
    }

    public function show($slug): ValuePartnerResource
    {
        $valuePartner = ValuePartner::where('slug', $slug)->firstOrFail();

        // Check if the post exists
        if (!$valuePartner) {
            // Handle not found scenario, for example, return an error response
            return response()->json(['error' => 'value Partner not found'], 404);
        }

        return ValuePartnerResource::make($valuePartner->load('CategoryPartner'));
    }
}
