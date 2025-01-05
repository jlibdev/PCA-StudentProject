<?php

namespace Database\Seeders;

use App\Models\StandardSalaryLaw;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StandardSalaryLawSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StandardSalaryLaw::factory()->count(20)->create();
    }
}
