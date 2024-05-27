<?php

namespace App\Http\Controllers\EndUser;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Therapist\StoreTherapistRequest;
use App\Http\Requests\Therapist\UpdateTherapistRequest;
use App\Http\Resources\Therapist\TherapistCollection;
use App\Http\Resources\Therapist\TherapistResource;
use App\Models\Therapist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TherapistController extends Controller
{
    public function index()
    {
        return TherapistCollection::make(
            Therapist::with(['user', 'cover', 'employHistorys', 'socialMedia'])
                ->latest()
                ->paginate(10)
        );
    }

    public function store(StoreTherapistRequest $request)
    {
        return DB::transaction(function () use ($request): TherapistResource {
            $therapistData = $request->validated();

            $therapistData = new Therapist();
            $therapistData->name = $request->name;
            $therapistData->slug = Str::slug($request->name);
            $therapistData->passport_finno = $request->passport_finno;
            $therapistData->date_of_birth = $request->date_of_birth;
            $therapistData->sex = $request->sex;
            $therapistData->contact_no = $request->contact_no;
            $therapistData->nationality = $request->nationality;
            $therapistData->date_of_issue = $request->date_of_issue;
            $therapistData->address = $request->address;
            $therapistData->address_nearest_mrt = "";
            $therapistData->professional_certs = $request->file('professional_certs')->store('therapist-certs');
            $therapistData->name_cert = $request->name_cert;
            $therapistData->issuing_organization = $request->issuing_organization;
            $therapistData->expired_date = $request->expired_date;
            $therapistData->credential_id = $request->credential_id;
            $therapistData->save();

            $therapistData->cover()->create([
                'url' => $request->file('url')->store('therapist-picture')
            ]);

            $user = $therapistData->user()->create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => UserStatus::Therapist,
            ]);

            // dd($user->role);

            return new TherapistResource($therapistData->load('user', 'cover'));
        });
    }

    public function show($slug): TherapistResource
    {
        $therapist = Therapist::where('slug', $slug)->firstOrFail();

        if (!$therapist) {
            // Handle not found scenario, for example, return an error response
            return response()->json(['error' => 'Therapist not found'], 404);
        }

        return new TherapistResource($therapist->load('user', 'cover', 'employHistorys', 'socialMedia'));
    }

    public function update(UpdateTherapistRequest $request, Therapist $therapist)
    {
        $data = $request->validated();

        $therapist->update($data);

        if (array_key_exists('name', $data)) {
            $therapist->slug = Str::slug($data['name']);
            $therapist->save();
        }

        $newFile = $request->file('url');
        if ($newFile) {
            $therapist->cover()->update(['url' => $newFile->store('therapist-picture')]);
        }

        return new TherapistResource($therapist->load('user', 'cover'));
    }

    public function destroy(Therapist $therapist)
    {
        try {
            $therapist->cover()->delete();
            $therapist->user()->delete();
            $therapist->delete();
            return response()->json(['message' => 'Therapist deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete therapist. ' . $e->getMessage()], 500);
        }
    }
}
