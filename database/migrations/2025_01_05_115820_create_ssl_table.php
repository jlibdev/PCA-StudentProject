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
        Schema::create('ssl', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('ssl', function (Blueprint $table) {
            $table->id('ssl_id');
            $table->string('step_name', 10);
            $table->decimal('salary', 10, 2);
            $table->string('grade_id', 10);
            $table->unique(['grade_id', 'step_name']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ssl');
    }
};
