<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\SocialMedia\StoreSocialMedia;
use App\Http\Requests\SocialMedia\UpdateSocialMedia;
use App\Http\Resources\SocialMedia\SocialMediaCollection;
use App\Http\Resources\SocialMedia\SocialMediaResource;
use App\Models\SocialMedia;
use App\Models\Therapist;
use Illuminate\Http\Request;

class SocialMediaController extends Controller
{
    public function index(): SocialMediaCollection
    {
        $user = auth()->user();

        $socialMedia = SocialMedia::where('therapist_id', $user->therapist_id)
            ->with('therapist')
            ->latest()
            ->paginate(10);

        return SocialMediaCollection::make($socialMedia);
    }

    public function store(StoreSocialMedia $request): SocialMediaResource
    {
        $userId = auth()->user();

        $data = $request->validated();

        $data['therapist_id'] = $userId['therapist_id'];

        $employs = SocialMedia::create($data);

        return new SocialMediaResource($employs);
    }

    public function show(SocialMedia $social_medium): SocialMediaResource
    {
        return SocialMediaResource::make($social_medium);
    }

    public function update(UpdateSocialMedia $request, SocialMedia $social_medium): SocialMediaCollection
    {
        $data = $request->validated();

        $social_medium->update($data);

        $updatedSocialMedium = SocialMedia::find($social_medium->id);

        return SocialMediaCollection::make(collect([$updatedSocialMedium]));
    }

    public function destroy(SocialMedia $social_medium)
    {
        $social_medium->delete();
    }
}
