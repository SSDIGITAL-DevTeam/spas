<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\ValuePartner\StoreValuePartnerRequest;
use App\Http\Requests\ValuePartner\UpdateValuePartnerRequest;
use App\Http\Resources\ValuePartner\ValuePartnerCollection;
use App\Http\Resources\ValuePartner\ValuePartnerResource;
use App\Models\ValuePartner;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ValuePartnerController extends Controller
{
    public function index(): ValuePartnerCollection
    {
        return ValuePartnerCollection::make(
            ValuePartner::with('categoryPartner')->latest()->paginate(10)
        );
    }

    public function store(StoreValuePartnerRequest $request): ValuePartnerResource
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['brand_name']);

        if ($request->hasFile('logo')) {
            $data['logo'] = $request->file('logo')->store('logo-partner');
        }

        $valuePartner = ValuePartner::create($data);

        return new ValuePartnerResource($valuePartner);
    }

    public function show(ValuePartner $value_partner): ValuePartnerResource
    {
        return ValuePartnerResource::make($value_partner->load('categoryPartner'));
    }

    public function update(UpdateValuePartnerRequest $request, ValuePartner $valuePartner): ValuePartnerResource
    {
        $data = $request->validated();

        $data['slug'] = Str::slug($data['brand_name']);

        if ($request->hasFile('logo')) {
            if ($valuePartner->logo) {
                Storage::delete($valuePartner->logo);
            }

            $data['logo'] = $request->file('logo')->store('logo-partner');
        }

        $valuePartner->update($data);

        return new ValuePartnerResource($valuePartner->load('categoryPartner'));
    }

    public function destroy(ValuePartner $value_partner)
    {
        $value_partner->delete();
    }
}
