<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    if (!Schema::hasColumn('accounts', 'account_status_id')) {
        Schema::table('accounts', function (Blueprint $table) {
            $table->foreignId('account_status_id')
                  ->nullable()
                  ->constrained('account_statuses')
                  ->onDelete('set null');
        });
    }
}

public function down()
{
    if (Schema::hasColumn('accounts', 'account_status_id')) {
        Schema::table('accounts', function (Blueprint $table) {
            $table->dropForeign(['account_status_id']);
            $table->dropColumn('account_status_id');
        });
    }
}

};
