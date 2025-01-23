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
        Schema::create('payroll_sheets', function (Blueprint $table) {
            $table->id('payroll_sheet_code');

            $table->foreignId('signatory_code')->constrained('signatories')->references('signatory_code');

            $table->string('name')->unique();
            
            $table->string('fund_cluster');
            $table->string('payroll_format');
            $table->boolean('include_mandatory_deductions');
            $table->string('type');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->date('create_date')->nullable();
            $table->date('post_date')->nullable();
            $table->date('pay_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payroll_sheets');
    }
};
