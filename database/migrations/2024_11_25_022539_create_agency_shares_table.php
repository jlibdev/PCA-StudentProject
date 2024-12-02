<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('agency_shares', function (Blueprint $table) {
            $table->id('agency_share_code');
<<<<<<< HEAD

			$table->string('agency_share_name')->unique();
			$table->string('shorthand')->unique();
			$table->double('amount');
			$table->boolean('is_mandatory');
			$table->double('remittance_percent');
			$table->double('ceiling_amount');

=======
            $table->string('agency_share_name');
            $table->string('shorthand');
            $table->double('amount');
            $table->boolean('is_mandatory');
            $table->double('remittance_percent');
            $table->double('ceiling_amount');
            $table->string('compensation_links')->nullable();
>>>>>>> origin/AddedsheetAndSign
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agency_shares');
    }
};
