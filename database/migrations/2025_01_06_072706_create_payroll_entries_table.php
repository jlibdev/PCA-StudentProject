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
        Schema::create('payroll_entries', function (Blueprint $table) {
            $table->id('payroll_entry_code');

            $table->foreignId('payroll_sheet_code')->constrained('payroll_sheets')->references('payroll_sheet_code');
            $table->foreignId('employee_code')->constrained('employees')->references('employee_code');

            $table->string('current_position')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_entries');
    }
};
