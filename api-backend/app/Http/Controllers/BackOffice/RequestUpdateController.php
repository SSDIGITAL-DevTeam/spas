<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Resources\RequestUpdate\RequestUpdateCollection;
use App\Http\Resources\RequestUpdate\RequestUpdateResource;
use App\Models\Operator;
use App\Models\RequestUpdate;
use App\Models\Therapist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RequestUpdateController extends Controller
{
    public function index(): RequestUpdateCollection
    {
        return RequestUpdateCollection::make(
            RequestUpdate::latest()
                ->with(['operator.cover', 'therapist.cover'])
                ->filterRequest(
                    request(['search'])
                )
                ->where('status', 'pending')
                ->paginate(10)
        );
    }

    public function show(RequestUpdate $request_update): RequestUpdateResource
    {
        return RequestUpdateResource::make($request_update->loadMissing(['operator.cover', 'therapist.cover']));
    }

    public function updateOperator(Request $request, RequestUpdate $request_update): JsonResponse
    {
        try {
            DB::beginTransaction();

            $dataRequest = RequestUpdate::whereKey($request_update->id)
                ->where('status', 'pending')
                ->lockForUpdate()
                ->firstOrFail();

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

            if (!empty($dataRequest->url_logo_operator)) {
                $updateOperator->cover()->updateOrCreate([], ['url' => $dataRequest->url_logo_operator]);
            }

            $dataRequest->update(['status' => 'approve']);

            DB::commit();

            return response()->json([
                'message' => 'Operator request approved.',
                'data' => $updateOperator->fresh(['cover', 'user']),
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'message' => 'error',
                'error' => $th->getMessage(),
            ], 400);
        }
    }

    public function updateTherapist(Request $request, RequestUpdate $request_update): JsonResponse
    {
        try {
            DB::beginTransaction();

            $dataRequest = RequestUpdate::whereKey($request_update->id)
                ->where('status', 'pending')
                ->lockForUpdate()
                ->firstOrFail();

            $therapist = Therapist::findOrFail($dataRequest->therapist_id);

            $therapist->update([
                'name' => $dataRequest->name,
                'passport_finno' => $dataRequest->passport_finno,
                'date_of_birth' => $dataRequest->date_of_birth,
                'sex' => $dataRequest->sex,
                'contact_no_therapist' => $dataRequest->contact_no_therapist,
                'nationality' => $dataRequest->nationality,
                'date_of_issue' => $dataRequest->date_of_issue,
                'address' => $dataRequest->address_therapist,
                'address_nearest_mrt' => $dataRequest->address_nearest_mrt,
                'professional_certs' => $dataRequest->professional_certs,
                'name_cert' => $dataRequest->name_cert,
                'issuing_organization' => $dataRequest->issuing_organization,
                'expired_date' => $dataRequest->expired_date,
                'credential_id' => $dataRequest->credential_id,
            ]);

            if ($dataRequest->url_logo_therapist) {
                $therapist->cover()->updateOrCreate([], ['url' => $dataRequest->url_logo_therapist]);
            }

            $dataRequest->update(['status' => 'approve']);

            DB::commit();

            return response()->json([
                'message' => 'Therapist request approved.',
                'data' => $therapist->fresh(['cover', 'user']),
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
