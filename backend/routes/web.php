<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\ProductController;
use App\Models\Product;

Route::get('/', function () {
    return view('welcome');
});


// =======================
// 📦 LISTAR PRODUCTOS
// =======================
Route::get('/products', function () {
    $products = Product::all();

    $html = "<h1>Lista de productos</h1>";
    $html .= "<a href='/create-product'>Crear nuevo</a><br><br>";

    foreach ($products as $p) {
        $html .= "
            <div>
                <strong>{$p->name}</strong> - $ {$p->price}
                <a href='/edit-product/{$p->id}'>✏️ Editar</a>
                <a href='/delete-product/{$p->id}'>🗑️ Eliminar</a>
            </div>
        ";
    }

    return $html;
});


// =======================
// ➕ FORMULARIO CREAR
// =======================
Route::get('/create-product', function () {
    return '
        <h1>Crear Producto</h1>
        <form method="POST" action="/products">
            <input type="hidden" name="_token" value="' . csrf_token() . '">
            
            <input type="text" name="name" placeholder="Nombre"><br><br>
            <input type="number" step="0.01" name="price" placeholder="Precio"><br><br>
            
            <button type="submit">Guardar</button>
        </form>
        <br>
        <a href="/products">Volver</a>
    ';
});


// =======================
// 💾 GUARDAR PRODUCTO
// =======================
Route::post('/products', [ProductController::class, 'store']);


// =======================
// ❌ ELIMINAR
// =======================
Route::get('/delete-product/{id}', function ($id) {
    Product::destroy($id);
    return redirect('/products');
});


// =======================
// ✏️ FORMULARIO EDITAR
// =======================
Route::get('/edit-product/{id}', function ($id) {
    $product = Product::findOrFail($id);

    return '
        <h1>Editar Producto</h1>
        <form method="POST" action="/update-product/'.$product->id.'">
            <input type="hidden" name="_token" value="'.csrf_token().'">
            
            <input type="text" name="name" value="'.$product->name.'"><br><br>
            <input type="number" step="0.01" name="price" value="'.$product->price.'"><br><br>
            
            <button type="submit">Actualizar</button>
        </form>
        <br>
        <a href="/products">Volver</a>
    ';
});


// =======================
// 🔄 ACTUALIZAR (SIN PUT)
// =======================
Route::post('/update-product/{id}', function (Request $request, $id) {
    $product = Product::findOrFail($id);
    $product->update($request->all());

    return redirect('/products');
});