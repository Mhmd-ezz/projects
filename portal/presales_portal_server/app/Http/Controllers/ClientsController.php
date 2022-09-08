<?php

namespace App\Http\Controllers;

use App\Client;
use Illuminate\Http\Request;
use App\Http\Resources\ClientResource;
use App\Http\Requests\CreateClientRequest;
use App\Http\Requests\UpdateClientRequest;

class ClientsController extends Controller
{
    public function get(Client $client)
    {
        try {
            new ClientResource($client);
            return response([
                'data' => new ClientResource($client),
                'message' => "",
                'errors' => []
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
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

        $records = Client::orderby($sortBy, $descending)

            ->where(function ($query) use ($request) {
                if (!empty($request->filter))
                    $query
                        ->where('name', 'like', '%' . $request->filter  . '%');
            })
            ->paginate($limit);

        return ClientResource::collection($records);
    }

    public function create(CreateClientRequest $request)
    {
        try {
            $client = Client::create($request->all());
            return response([
                'data' => new ClientResource($client),
                'message' => "Client {$client->name} created successfully.",
                'errors' => []
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        try {
            $client->update($request->all());
            return response([
                'data' => new ClientResource($client),
                'message' => "Client {$client->name} updated successfully.",
                'errors' => []
            ], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function delete(Client $client)
    {
        try {
            Client::destroy($client->id);
            return response([
                'data' => null,
                'message' => "Client {$client->name} deleted successfully.",
                'errors' => []
            ], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

}
