<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('is_active')->default(true);
            $table->string('two_factor_code')->nullable();
            $table->timestamp('two_factor_expires_at')->nullable();
            $table->foreignId('account_status_id')
                  ->nullable()
                  ->constrained('account_statuses')
                  ->onDelete('set null');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('accounts');
    }
};
