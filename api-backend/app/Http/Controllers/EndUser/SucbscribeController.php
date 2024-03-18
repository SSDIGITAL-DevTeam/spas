<?php

namespace App\Http\Controllers\EndUser;

use App\Http\Controllers\Controller;
use App\Http\Requests\Subscribe\StoreSubscribeRequest;
use App\Http\Resources\SubscribeResource;
use App\Models\Subscribe;
use Illuminate\Http\Request;

class SucbscribeController extends Controller
{

    public function index()
    {
        return SubscribeResource::collection([
            Subscribe::latest()->paginate(10)
        ]);
    }

    public function store(StoreSubscribeRequest $request)
    {
        return SubscribeResource::make(Subscribe::create($request->validated()));
    }
}
