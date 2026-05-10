<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ventas', function (Blueprint $table) {
            $table->enum('tipo_cliente', ['consumidor_final', 'cedula', 'ruc'])
                  ->default('consumidor_final')
                  ->after('cliente_nombre');
            $table->string('cliente_cedula', 13)
                  ->nullable()
                  ->change();
        });
    }

    public function down(): void
    {
        Schema::table('ventas', function (Blueprint $table) {
            $table->dropColumn('tipo_cliente');
            $table->string('cliente_cedula', 13)->nullable(false)->change();
        });
    }
};