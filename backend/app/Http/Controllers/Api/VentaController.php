<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Venta;
use App\Models\Product;

class VentaController extends Controller
{
    public function index()
    {
        return Venta::with(['product', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id'     => 'required|exists:products,id',
            'cantidad'       => 'required|integer|min:1',
            'cliente_nombre' => 'required|string|max:255',
            'tipo_cliente'   => 'required|in:consumidor_final,cedula,ruc',
            'cliente_cedula' => 'required_unless:tipo_cliente,consumidor_final|nullable|string',
        ]);

        // Validar cédula o RUC solo si no es consumidor final
        if ($request->tipo_cliente !== 'consumidor_final') {
            if (!$this->validarCedulaRuc($request->cliente_cedula)) {
                return response()->json([
                    'error' => 'La cédula o RUC ingresado no es válido'
                ], 422);
            }
        }

        $product = Product::findOrFail($request->product_id);

        // Verificar stock suficiente
        if ($product->stock < $request->cantidad) {
            return response()->json([
                'error' => 'Stock insuficiente. Disponible: ' . $product->stock
            ], 422);
        }

        // Reducir stock
        $product->stock -= $request->cantidad;
        $product->save();

        // Registrar venta
        $venta = Venta::create([
            'product_id'      => $product->id,
            'user_id'         => $request->user()->id,
            'cantidad'        => $request->cantidad,
            'cliente_nombre'  => $request->cliente_nombre,
            'tipo_cliente'    => $request->tipo_cliente,
            'cliente_cedula'  => $request->tipo_cliente !== 'consumidor_final'
                                    ? $request->cliente_cedula
                                    : null,
            'precio_unitario' => $product->price,
            'total'           => $product->price * $request->cantidad,
        ]);

        return response()->json($venta->load(['product', 'user']), 201);
    }

    private function validarCedulaRuc(string $numero): bool
    {
        if (!ctype_digit($numero)) return false;

        $longitud = strlen($numero);

        if ($longitud !== 10 && $longitud !== 13) return false;

        $provincia = intval(substr($numero, 0, 2));
        if ($provincia < 1 || $provincia > 24) return false;

        if ($longitud === 13 && substr($numero, 10, 3) !== '001') return false;

        $digits = array_map('intval', str_split(substr($numero, 0, 9)));
        $coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
        $suma = 0;

        foreach ($digits as $i => $digit) {
            $resultado = $digit * $coeficientes[$i];
            $suma += $resultado > 9 ? $resultado - 9 : $resultado;
        }

        $digitoVerificador = $suma % 10 === 0 ? 0 : 10 - ($suma % 10);

        return $digitoVerificador === intval($numero[9]);
    }
}