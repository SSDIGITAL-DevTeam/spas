<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestUpdate\StoreRequestUpdateRequest;
use App\Http\Resources\RequestUpdate\RequestUpdateResource;
use App\Models\Operator;
use App\Models\RequestUpdate;
use App\Models\Therapist;
use Illuminate\Http\Request;

class RequestUpdateController extends Controller
{
    public function requestOperator(StoreRequestUpdateRequest $request): RequestUpdateResource
    {
        $user = auth()->user();

        $id_opreator = $user->operator_id;

        $operator = Operator::find($id_opreator);

        if (!$operator) {
            return response()->json(['error' => 'Operator not found'], 404);
        }

        $data = $request->validated();

        $data['operator_id'] = $id_opreator;
        $data['role'] = 'operator';

        if ($request->hasFile('url_logo_operator')) {
            $data['url_logo_operator'] = $request->file('url_logo_operator')->store('operator-logo', 'public');
        }

        $requestUpdate = RequestUpdate::create($data);

        return RequestUpdateResource::make($requestUpdate);
    }

    public function requestTherapist(StoreRequestUpdateRequest $request): RequestUpdateResource
    {
        $user = auth()->user();

        $id_therapist = $user->therapist_id;

        $therapist = Therapist::find($id_therapist);

        if (!$therapist) {
            return response()->json(['error' => 'Therapist not found'], 404);
        }

        $data = $request->validated();

        if ($request->hasFile('professional_certs')) {
            $data['professional_certs'] = $request->file('professional_certs')->store('therapist-certs', 'public');
        }

        if ($request->hasFile('url_logo_therapist')) {
            $data['url_logo_therapist'] = $request->file('url_logo_therapist')->store('therapist-logos', 'public');
        }

        $data['therapist_id'] = $id_therapist;
        $data['role'] = 'therapist';

        $requestUpdate = RequestUpdate::create($data);

        return RequestUpdateResource::make($requestUpdate);
    }
}
