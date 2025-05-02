<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('account_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // ex: standard, professionnel, full-option
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->default(0); // coût éventuel
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_statuses');
    }
};
