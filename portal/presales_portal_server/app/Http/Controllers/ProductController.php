<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    public function get(Product $product)
    {
        try {
            new ProductResource($product);
            return response([
                'data' => new ProductResource($product),
                'message' => "",
                'errors' => []
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function list(Request $request)
    {
        // @ page: string
        // @ By default paginator will intercept the request and handle page number

        // @ limit: string
        $limit = !empty($request->limit) ? $request->limit : 10;

        // @ filter: string
        $filter = $request->filter ? [['name', 'like', '%' . $request->filter  . '%']] : [];

        // @ sortBy: string
        $sortBy =  !empty($request->sortBy) ? $request->sortBy : 'name';

        // @ descending: Boolean
        $descending =  json_decode($request->descending)  ? "DESC" : 'ASC';

        $records = Product::orderby($sortBy, $descending)
            // ->where($filter)
            ->where(function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->filter  . '%');
            })
            ->paginate($limit);

        return ProductResource::collection($records);
    }

    public function create(CreateProductRequest $request)
    {
        try {
            $product = Product::create($request->all());
            return response([
                'data' => new ProductResource($product),
                'message' => "Product {$product->name} created successfully.",
                'errors' => []
            ], 201);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $product->update($request->all());
            return response([
                'data' => new ProductResource($product),
                'message' => "Product {$product->name} updated successfully.",
                'errors' => []
            ], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    public function delete(Product $product)
    {
        try {
            Product::destroy($product->id);
            return response([
                'data' => null,
                'message' => "Product {$product->name} deleted successfully.",
                'errors' => []
            ], 200);
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }
    
}
