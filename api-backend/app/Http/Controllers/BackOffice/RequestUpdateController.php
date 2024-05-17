<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Http\Resources\RequestUpdate\RequestUpdateCollection;
use App\Models\RequestUpdate;
use Illuminate\Http\Request;

class RequestUpdateController extends Controller
{
    public function index(): RequestUpdateCollection
    {
        return RequestUpdateCollection::make([
            RequestUpdate::latest()->paginate(10)
        ]);
    }
}
