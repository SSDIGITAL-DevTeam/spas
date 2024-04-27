<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmploysHistory\StoreEmploymentHistoryRequest;
use App\Http\Requests\EmploysHistory\UpdateEmploymentHistoryRequest;
use App\Http\Resources\EmploysHistory\EmploymentHistoryResource;
use App\Models\EmploymentHistory;
use Illuminate\Http\Request;

class EmploymentHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function store(StoreEmploymentHistoryRequest $request): EmploymentHistoryResource
    {
        $userId = auth()->user();

        $data = $request->validated();

        $data['therapist_id'] = $userId['therapist_id'];

        $employs = EmploymentHistory::create($data);

        return new EmploymentHistoryResource($employs->load('therapist'));
    }

    public function show(EmploymentHistory $career): EmploymentHistoryResource
    {
        return new EmploymentHistoryResource($career->load('therapist'));
    }

    public function update(UpdateEmploymentHistoryRequest $request, EmploymentHistory $career): EmploymentHistoryResource
    {
        $data = $request->validated();
        // dd($data);
        $career->update($data);

        return new EmploymentHistoryResource($career->load('therapist'));
    }

    public function destroy(EmploymentHistory $career)
    {
        try {
            $career->delete();

            return response()->json(['message' => 'Employment deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete employment. ' . $e->getMessage()], 500);
        }
    }
}
