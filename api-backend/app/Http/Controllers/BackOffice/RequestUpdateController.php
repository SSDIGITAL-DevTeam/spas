<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Resources\RequestUpdate\RequestUpdateCollection;
use App\Http\Resources\RequestUpdate\RequestUpdateResource;
use App\Models\Operator;
use App\Models\RequestUpdate;
use App\Models\Therapist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RequestUpdateController extends Controller
{
    public function index(): RequestUpdateCollection
    {
        return RequestUpdateCollection::make(
            RequestUpdate::latest()
                ->filterRequest(
                    request(['search'])
                )
                ->where('status', 'pending')
                ->paginate(10)
        );
    }

    public function show(RequestUpdate $request_update): RequestUpdateResource
    {
        return RequestUpdateResource::make($request_update);
    }

    public function updateOperator(Request $request, RequestUpdate $request_update): RequestUpdateResource
    {
        $request_update->update(['status' => 'approve']);

        $url_logo_operator = null;
        if ($request->hasFile('url_logo_operator') && $request->file('url_logo_operator')->isValid()) {
            $url_logo_operator = $request->file('url_logo_operator')->store('operator-logo', 'public');
        }

        $dataRequest = RequestUpdate::where('operator_id', $request_update->operator_id)
            ->where('status', 'approve')
            ->latest()
            ->firstOrFail();

        try {
            DB::beginTransaction();

            $updateOperator = Operator::findOrFail($dataRequest->operator_id);

            $updateOperator->update([
                'company_name' => $dataRequest->company_name,
                'uen_no' => $dataRequest->uen_no,
                'brand_name' => $dataRequest->brand_name,
                'address' => $dataRequest->address,
                'contact_no' => $dataRequest->contact_no,
                'contact_person' => $dataRequest->contact_person,
                'contact_person_no' => $dataRequest->contact_person_no,
            ]);

            if (!empty($url_logo_operator)) {
                $updateOperator->cover()->updateOrCreate([], ['url' => $url_logo_operator]);
            }

            RequestUpdate::where('operator_id', $request_update->operator_id)
                ->where('status', 'approve')
                ->delete();

            DB::commit();

            return new RequestUpdateResource($updateOperator);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'error',
                'error' => $th->getMessage(),
            ], 400);
        }
    }

    public function updateTherapist(Request $request, RequestUpdate $request_update)
    {
        $request_update->update(['status' => 'approve']);

        $url_logo_therapist = null;
        if ($request->hasFile('url_logo_therapist') && $request->file('url_logo_therapist')->isValid()) {
            $url_logo_therapist = $request->file('url_logo_therapist')->store('therapist-picture', 'public');
        }

        $dataRequest = RequestUpdate::where('therapist_id', $request_update->therapist_id)
            ->where('status', 'approve')
            ->latest()
            ->firstOrFail();

        try {
            DB::beginTransaction();

            $therapist = Therapist::findOrFail($dataRequest->therapist_id);

            $therapist->update([
                'name' => $dataRequest->name,
                'passport_finno' => $dataRequest->passport_finno,
                'date_of_birth' => $dataRequest->date_of_birth,
                'sex' => $dataRequest->sex,
                'contact_no_therapist' => $dataRequest->contact_no_therapist,
                'nationality' => $dataRequest->nationality,
                'date_of_issue' => $dataRequest->date_of_issue,
                'address_therapist' => $dataRequest->address_therapist,
                'professional_certs' => $dataRequest->professional_certs,
                'name_cert' => $dataRequest->name_cert,
                'issuing_organization' => $dataRequest->issuing_organization,
                'expired_date' => $dataRequest->expired_date,
                'credential_id' => $dataRequest->credential_id,
            ]);

            if ($url_logo_therapist) {
                $therapist->cover()->updateOrCreate([], ['url' => $url_logo_therapist]);
            }

            // Hapus data RequestUpdate yang sudah di-approve
            // RequestUpdate::where('therapist_id', $request_update->therapist_id)
            //     ->where('status', 'approve')
            //     ->delete();
            DB::commit();

            return response()->json([
                'data' => $therapist,
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'error',
                'error' => $th->getMessage(),
            ], 400);
        }
    }
}
