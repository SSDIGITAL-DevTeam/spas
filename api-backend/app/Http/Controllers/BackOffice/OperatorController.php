<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Operator\StoreOperatorRequest;
use App\Http\Requests\Operator\UpdateOperatorRequest;
use App\Http\Resources\Operator\OperatorCollection;
use App\Http\Resources\Operator\OperatorResource;
use App\Models\Operator;
use Illuminate\Http\Request;

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
