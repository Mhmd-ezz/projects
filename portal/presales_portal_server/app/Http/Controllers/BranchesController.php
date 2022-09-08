<?php

namespace App\Http\Controllers;

use App\Branch;
use Illuminate\Http\Request;
use App\Http\Resources\BranchResource;
use App\Http\Requests\CreateBranchRequest;
use App\Http\Requests\UpdateBranchRequest;

class BranchesController extends Controller
{

    public function get(Branch $branch)
    {
        try {
            new BranchResource($branch);
            return response([
                'data' => new BranchResource($branch),
                'message' => "",
                'errors' => []
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
        // return (new BranchResource($branch))->response();
    }
  
    public function list(Request $request)
    {
        // DB::enableQueryLog();
        // dd(DB::getQueryLog());

        // @ page: string
        // @ By default paginator will intercept the request and handle page number

        // @ limit: string
        $limit = !empty($request->limit) ? $request->limit : 10;

        // @ sortBy: string
        $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'id';

        // @ descending: Boolean
        $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';

        // dd(DB::getQueryLog());

        $records = Branch::orderby($sortBy, $descending)
        
            ->where(function ($query) use ($request) {
                if (!empty($request->filter))
                    $query
                        ->where('name', 'like', '%' . $request->filter  . '%');
            })
            ->paginate($limit);

        return BranchResource::collection($records);
    }

    public function create(CreateBranchRequest $request)
    {
        try {
            $branch = Branch::create($request->all());
            return response([
                'data' => new BranchResource($branch),
                'message' => "Branch {$branch->name} created successfully.",
                'errors' => []
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }

        // $branch = new Branch();
        // $branch->name = $request->input('name');
        // $branch->country_code = $request->input('country_code');
        // $branch->currency_code = $request->input('currency_code');
        // $branch->save();
    }

    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        try {
            $branch->update($request->all());
            return response([
                'data' => new BranchResource($branch),
                'message' => "Branch {$branch->name} updated successfully.",
                'errors' => []
            ], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }

        // $branch->name = $request->input('name');
        // $branch->country_code = $request->input('country_code');
        // $branch->currency_code = $request->input('currency_code');
        // $branch->save();
    }

    public function delete(Branch $branch)
    {
        try {
            Branch::destroy($branch->id);
            return response([
                'data' => null,
                'message' => "Branch $branch->name deleted successfully.",
                'errors' => []
            ], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
        // return response()->json(['message' => "Deleted successfully."], 200);
    }

}
