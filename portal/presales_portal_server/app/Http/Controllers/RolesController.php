<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientResource;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => '']);
    }

    public function getAll()
    {
        return response()->json(['data' =>  Role::get()], 200);
    }
}
