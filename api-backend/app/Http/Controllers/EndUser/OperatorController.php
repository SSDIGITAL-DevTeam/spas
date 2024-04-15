<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Operator\StoreOperatorRequest;
use App\Http\Requests\Operator\UpdateOperatorRequest;
use App\Http\Resources\Operator\OperatorCollection;
use App\Http\Resources\Operator\OperatorResource;
use App\Models\Operator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class OperatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): OperatorCollection
    {
        return OperatorCollection::make(
            Operator::with('user', 'cover')
                ->latest()
                ->paginate(10)
        );
    }

    public function store(StoreOperatorRequest $request)
    {
        return DB::transaction(function () use ($request): OperatorResource {

            $operatorData = $request->validated();

            $operatorData = new Operator();
            $operatorData->company_name = $request->company_name;
            $operatorData->uen_no = $request->uen_no;
            $operatorData->brand_name = $request->brand_name;
            $operatorData->address = $request->address;
            $operatorData->contact_no = $request->contact_no;
            $operatorData->contact_person = $request->contact_person;
            $operatorData->contact_person_no = $request->contact_person_no;
            $operatorData->payment_slip = $request->file('payment_slip')->store('payment_slips');
            $operatorData->save();

            $operatorData->cover()->create([
                'url' => $request->file('url')->store('operator-logo')
            ]);

            $operatorData->user()->create([
                'name' => $request->company_name, // Assuming you have a 'name' field for the user
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'operator', // Set the role to default operator
            ]);

            return new OperatorResource($operatorData->load('user', 'cover'));
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(Operator $operator)
    {
        return new OperatorResource($operator->load('user', 'cover'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOperatorRequest $request, Operator $operator)
    {
        $operator->update($request->validated());

        $newFile = $request->file('url');

        if ($newFile) {
            $operator->cover()->update(['url' => $newFile->store('operator-logo')]);
        }

        return new OperatorResource($operator->load('user', 'cover'));
    }   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Operator $operator)
    {
        try {
            $operator->cover()->delete();
            $operator->user()->delete();
            $operator->delete();
            return response()->json(['message' => 'Operator deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete operator. ' . $e->getMessage()], 500);
        }
    }
}
