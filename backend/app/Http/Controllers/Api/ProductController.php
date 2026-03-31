<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // GET
    public function index()
    {
        return Product::all();
    }

    // POST
    public function store(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    // GET by ID
    public function show($id)
    {
        return Product::findOrFail($id);
    }

    // PUT
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return $product;
    }

    // DELETE
    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(['message' => 'Eliminado']);
    }
}