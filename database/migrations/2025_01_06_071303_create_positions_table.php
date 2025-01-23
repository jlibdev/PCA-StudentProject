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
        Schema::create('positions', function (Blueprint $table) {
            $table->id('position_code');

            /* The positions come in the syntax:
				[Name of Position] [Roman Numeral]
				This might need to be utilized;
				or this could be set by the user. */

            $table->string('title')->unique();
            $table->integer('salary_grade', false, true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
