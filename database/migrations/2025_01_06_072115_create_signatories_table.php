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
        Schema::create('signatories', function (Blueprint $table) {
            $table->id('signatory_code');

            $table->foreignId('preparer_code')->constrained('employees')->references('employee_code');
            $table->foreignId('recommender_code')->constrained('employees')->references('employee_code');
            $table->foreignId('certifier_code')->constrained('employees')->references('employee_code');
            $table->foreignId('approver_code')->constrained('employees')->references('employee_code');

            $table->string('name');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('signatories');
    }
};
