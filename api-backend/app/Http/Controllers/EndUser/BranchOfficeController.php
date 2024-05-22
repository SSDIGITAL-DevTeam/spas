<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\EndUser\BranchOffice\StoreBranchOffice;
use App\Http\Requests\EndUser\BranchOffice\UpdateBranchOffice;
use App\Http\Resources\EndUser\BranchOffice\BranchOfficeCollection;
use App\Http\Resources\EndUser\BranchOffice\BranchOfficeResource;
use App\Models\BranchOffice;
use App\Models\Operator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BranchOfficeController extends Controller
{
    public function index(): BranchOfficeCollection
    {
        return BranchOfficeCollection::make(
            BranchOffice::latest()->paginate(10)
        );
    }

    public function store(StoreBranchOffice $request): BranchOfficeResource
    {
        $user = auth()->user();

        $id_opreator = $user->operator_id;

        $operator = Operator::find($id_opreator);

        if (!$operator) {
            return response()->json(['error' => 'Operator not found'], 404);
        }

        $data = $request->validated();

        $data['operator_id'] = $id_opreator;

        $branchCreate = BranchOffice::create($data);

        return BranchOfficeResource::make($branchCreate);
    }

    public function show(BranchOffice $branch_office): BranchOfficeResource
    {
        return BranchOfficeResource::make($branch_office);
    }

    public function update(UpdateBranchOffice $request, BranchOffice $branch_office): JsonResponse
    {
        $user = auth()->user();
        $operator_id = $user->operator_id;

        if ($branch_office->operator_id !== $operator_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validated();

        $branch_office->update($data);

        return response()->json([
            'data' => $branch_office,
        ], 200);
    }

    public function destroy(BranchOffice $branch_office)
    {
        $branch_office->delete();
    }
}
