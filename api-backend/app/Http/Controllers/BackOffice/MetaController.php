<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Requests\Meta\StoreMetaRequest;
use App\Http\Requests\Meta\UpdateMetaRequest;
use App\Http\Resources\MetaResource;
use App\Models\Meta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MetaController extends Controller
{
    public function index()
    {
        return MetaResource::collection(
            Meta::orderby('id', 'DESC', Auth::user()->id)->get()
        );
    }

    public function store(StoreMetaRequest $request)
    {
        return MetaResource::make(Meta::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Meta $meta)
    {
        return new MetaResource($meta);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMetaRequest $request, Meta $meta)
    {

        $meta->update($request->all());

        return new MetaResource($meta);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meta $meta)
    {
        return $meta->delete();
    }
}
