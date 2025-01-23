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
        Schema::create('daily_entries', function (Blueprint $table) {
            $table->id('daily_entry_code');

            $table->foreignId('employee_code')->constrained('employees')->references('employee_code');

			$table->time('am_clockin')->nullable()->default;
			$table->time('am_clockout')->nullable()->default;
            $table->time('pm_clockin')->nullable()->default;
			$table->time('pm_clockout')->nullable()->default;
			$table->integer('work_minutes', false, true)->nullable()->default;
			$table->integer('under_minutes', false, true)->nullable()->default;
			$table->integer('late_minutes', false, true)->nullable()->default;

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_entries');
    }
};
