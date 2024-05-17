<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestUpdate\StoreRequestUpdateRequest;
use App\Http\Resources\RequestUpdate\RequestUpdateCollection;
use App\Http\Resources\RequestUpdate\RequestUpdateResource;
use App\Models\RequestUpdate;
use App\Models\Therapist;
use Illuminate\Http\Request;

class RequestUpdateController extends Controller
{
    public function requestOperator(StoreRequestUpdateRequest $request): RequestUpdateResource
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->validated();

        $data['operator_id'] = $user->id;

        if ($request->hasFile('url_logo_operator')) {
            $data['url_logo_operator'] = $request->file('url_logo_operator')->store('operator-logo');
        }

        $requestUpdate = RequestUpdate::create($data);

        return RequestUpdateResource::make($requestUpdate);
    }

    public function requestTherapist(StoreRequestUpdateRequest $request): RequestUpdateResource
    {
        $user = auth()->user();

        if (Therapist::where('id', $user->id)->first()) {
            return response()->json(['error' => 'Therapist not found'], 404);
        }

        $data = $request->validated();

        if ($request->hasFile('professional_certs')) {
            $data['professional_certs'] = $request->file('professional_certs')->store('therapist-certs');
        }

        if ($request->hasFile('url_logo_therapist')) {
            $data['url_logo_therapist'] = $request->file('url_logo_therapist')->store('therapist-logos');
        }

        $data['therapist_id'] = $user->id;

        try {
            $requestUpdate = RequestUpdate::create($data);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return RequestUpdateResource::make($requestUpdate);
    }
}
