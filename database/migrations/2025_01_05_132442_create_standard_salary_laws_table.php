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
        Schema::create('standard_salary_laws', function (Blueprint $table) {
            $table->id();
            $table->integer('step');
            $table->decimal('salary', 10,2);
            $table->integer('grade');
            $table->unique(['grade', 'step']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('standard_salary_laws');
    }
};
