<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VentaController;
use App\Http\Controllers\Api\ProveedorController;

Route::get('/unauthenticated', function() {
    return response()->json(['message' => 'Unauthenticated.'], 401);
})->name('login');

// Rutas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Rutas protegidas
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin y vendedor pueden leer
    Route::get('/products',        [ProductController::class, 'index']);
    Route::get('/products/{id}',   [ProductController::class, 'show']);
    Route::get('/proveedores',     [ProveedorController::class, 'index']);

    // Admin y vendedor pueden vender
    Route::post('/ventas', [VentaController::class, 'store']);

    // Solo admin
    Route::middleware('role:admin')->group(function () {
        Route::post('/products',          [ProductController::class, 'store']);
        Route::put('/products/{id}',      [ProductController::class, 'update']);
        Route::delete('/products/{id}',   [ProductController::class, 'destroy']);

        Route::post('/proveedores',       [ProveedorController::class, 'store']);
        Route::put('/proveedores/{id}',   [ProveedorController::class, 'update']);
        Route::delete('/proveedores/{id}',[ProveedorController::class, 'destroy']);
        Route::get('/proveedores/{id}',   [ProveedorController::class, 'show']);

        Route::get('/ventas',             [VentaController::class, 'index']);
    });
});