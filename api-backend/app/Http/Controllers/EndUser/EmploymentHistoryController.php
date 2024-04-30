<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmploysHistory\StoreEmploymentHistoryRequest;
use App\Http\Requests\EmploysHistory\UpdateEmploymentHistoryRequest;
use App\Http\Resources\EmploysHistory\EmploymentHistoryCollection;
use App\Http\Resources\EmploysHistory\EmploymentHistoryResource;
use App\Models\EmploymentHistory;
use Illuminate\Http\Request;

class EmploymentHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): EmploymentHistoryCollection
    {
        return EmploymentHistoryCollection::make([
            EmploymentHistory::with('therapist')->latest()->paginate(10)
        ]);
    }

    public function store(StoreEmploymentHistoryRequest $request): EmploymentHistoryResource
    {
        $userId = auth()->user();

        $data = $request->validated();

        $data['therapist_id'] = $userId['therapist_id'];

        $employs = EmploymentHistory::create($data);

        return new EmploymentHistoryResource($employs);
    }

    public function show(EmploymentHistory $carrer): EmploymentHistoryResource
    {
        return new EmploymentHistoryResource($carrer);
    }

    public function update(UpdateEmploymentHistoryRequest $request, EmploymentHistory $carrer): EmploymentHistoryResource
    {
        $data = $request->validated();
        // dd($data);
        $carrer->update($data);

        return new EmploymentHistoryResource($carrer);
    }

    public function destroy(EmploymentHistory $carrer)
    {
        try {
            $carrer->delete();

            return response()->json(['message' => 'Employment deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete employment. ' . $e->getMessage()], 500);
        }
    }
}
