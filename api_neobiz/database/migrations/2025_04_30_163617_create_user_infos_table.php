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
        Schema::create('user_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_id')->constrained('accounts')->onDelete('cascade');
            $table->string('prenom')->nullable();
            $table->string('nom')->nullable();
            $table->string('telephone')->nullable();
            $table->text('adresse')->nullable();
            $table->enum('sexe', ['Masculin', 'Feminin', 'autre'])->nullable();
            $table->date('date_naissance')->nullable();
            $table->integer('update_count')->default(0); // Limitation des mises à jour
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_infos');
    }
};
