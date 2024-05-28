<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Therapist\UpdateTherapistRequest;
use App\Http\Resources\Therapist\TherapistCollection;
use App\Http\Resources\Therapist\TherapistResource;
use App\Models\Therapist;
use Illuminate\Http\Request;

class TherapistController extends Controller
{
    public function index()
    {
        return TherapistCollection::make(
            Therapist::with('user', 'cover')    
                ->filterTherapist(
                    request(['search'])
                )
                ->latest()
                ->paginate(10)
        );
    }

    public function show(Therapist $therapist)
    {
        return new TherapistResource($therapist->load('user', 'cover'));
    }

    public function update(UpdateTherapistRequest $request, Therapist $therapist)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('professional_certs')) {
            $certFilePath = $request->file('professional_certs')->store('therapist-certs');
            $validatedData['professional_certs'] = $certFilePath;
        }
        $therapist->update($validatedData);

        if ($request->hasFile('url')) {
            $newFile = $request->file('url');

            // Simpan file baru
            $filePath = $newFile->store('therapist-picture');

            if ($filePath) {
                if ($therapist->cover) {
                    $therapist->cover()->update(['url' => $filePath]);
                } else {
                    $therapist->cover()->create(['url' => $filePath]);
                }
            }
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
