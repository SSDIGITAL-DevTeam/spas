<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\ValuePartner\StoreValuePartnerRequest;
use App\Http\Requests\ValuePartner\UpdateValuePartnerRequest;
use App\Http\Resources\ValuePartner\ValuePartnerCollection;
use App\Http\Resources\ValuePartner\ValuePartnerResource;
use App\Models\ValuePartner;
use App\Traits\HttpResponses;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ValuePartnerController extends Controller
{
    use HttpResponses;

    public function index(): ValuePartnerCollection
    {
        return ValuePartnerCollection::make(
            ValuePartner::with('categoryPartner')
                ->filterPartner(request(['search']))
                ->latest()
                ->paginate(10)
        );
    }

    public function store(StoreValuePartnerRequest $request): ValuePartnerResource
    {
        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($data['brand_name']);

            if ($request->hasFile('logo')) {
                $data['logo'] = $request->file('logo')->store('logo-partner', 'public');
            }

            $valuePartner = ValuePartner::create($data);

            return new ValuePartnerResource($valuePartner);
        } catch (\Exception $e) {
            abort(500, 'Failed to create value partner. ' . $e->getMessage());
        }
    }

    public function show(ValuePartner $value_partner): ValuePartnerResource
    {
        return ValuePartnerResource::make($value_partner->load('categoryPartner'));
    }

    public function update(UpdateValuePartnerRequest $request, ValuePartner $valuePartner): ValuePartnerResource
    {
        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($data['brand_name']);

            if ($request->hasFile('logo')) {
                if ($valuePartner->logo) {
                    Storage::disk('public')->delete($valuePartner->logo);
                }
                $data['logo'] = $request->file('logo')->store('logo-partner', 'public');
            }

            $valuePartner->update($data);

            return new ValuePartnerResource($valuePartner->load('categoryPartner'));
        } catch (\Exception $e) {
            abort(500, 'Failed to update value partner. ' . $e->getMessage());
        }
    }

    public function destroy(ValuePartner $value_partner)
    {
        try {
            if ($value_partner->logo) {
                Storage::disk('public')->delete($value_partner->logo);
            }

            $value_partner->delete();

            return $this->success(null, 'Value partner deleted successfully.');
        } catch (\Exception $e) {
            return $this->error('Failed to delete value partner. ' . $e->getMessage(), 500);
        }
    }
}
