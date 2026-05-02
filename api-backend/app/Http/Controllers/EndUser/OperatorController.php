<?php

namespace App\Http\Controllers\EndUser;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Operator\StoreOperatorRequest;
use App\Http\Requests\Operator\UpdateOperatorRequest;
use App\Http\Resources\Operator\OperatorCollection;
use App\Http\Resources\Operator\OperatorResource;
use App\Models\Operator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class OperatorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): OperatorCollection
    {
        return OperatorCollection::make(
            Operator::with('user', 'cover', 'branchOffices')
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
            $operatorData->slug = Str::slug($request->company_name);
            $operatorData->uen_no = $request->uen_no;
            $operatorData->brand_name = $request->brand_name;
            $operatorData->address = $request->address;
            $operatorData->contact_no = $request->contact_no;
            $operatorData->contact_person = $request->contact_person;
            $operatorData->contact_person_no = $request->contact_person_no;

            if ($request->hasFile('payment_slip')) {
                $paymentSlipPath = $request->file('payment_slip')->store('payment_slips', 'public');
                $operatorData->payment_slip = $paymentSlipPath;
            }

            $operatorData->save();

            $operatorData->cover()->create([
                'url' => $request->file('url')->store('operator-logo', 'public')
            ]);

            $operatorData->user()->create([
                'name' => $request->company_name,
                'email' => $request->email,
                'password' => $request->password,
                'role' => UserStatus::Operator,
            ]);

            return new OperatorResource($operatorData->load('user', 'cover'));
        });
    }

    /**
     * Display the specified resource.
     */
    public function show($slug): OperatorResource
    {
        $operator = null;
        $user = auth('sanctum')->user();

        if ($user?->operator_id) {
            $operator = Operator::whereKey($user->operator_id)
                ->where('slug', $slug)
                ->first();
        }

        $operator ??= Operator::where('slug', $slug)->firstOrFail();

        if (!$operator) {
            // Handle not found scenario, for example, return an error response
            return response()->json(['error' => 'Operator not found'], 404);
        }

        return new OperatorResource($operator->load('user', 'cover', 'branchOffices'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOperatorRequest $request, Operator $operator)
    {
        $validatedData = $request->validated();

        $operator->update($validatedData);

        if (array_key_exists('company_name', $validatedData)) {
            $operator->slug = Str::slug($validatedData['company_name']);
            $operator->save();
        }

        $newFile = $request->file('url');
        if ($newFile) {
            $operator->cover()->update(['url' => $newFile->store('operator-logo', 'public')]);
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
