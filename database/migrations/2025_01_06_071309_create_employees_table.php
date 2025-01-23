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
        Schema::create('employees', function (Blueprint $table) {
            /* This employee_code is different from the PCA-administered Employee Number.
				There is a difference because the employee_code is strictly Laravel's own auto-incrementing unsigned big integer.
				This is processed faster than the string-based Employee Number from PCA.
				(According to sources online.) */

            $table->id('employee_code');

            $table->foreignId('appointment_code')->constrained('appointments')->references('appointment_code')->nullable();
            $table->foreignId('position_code')->constrained('positions')->references('position_code');
            $table->foreignId('user_code')->constrained('users')->references('id');

            $table->string('employee_number')->unique();
            $table->string('scanner_id')->unique();

            $table->string('first_name');
            $table->string('middle_name')->nullable();
            $table->string('last_name');
            $table->string('name_extension')->nullable();
            $table->integer('salary_step', false, true);
            $table->boolean('is_active')->default(true);
            $table->double('credits');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
