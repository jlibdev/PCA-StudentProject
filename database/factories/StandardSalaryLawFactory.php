<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StandardSalaryLaw>
 */
class StandardSalaryLawFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'step' => $this->faker->numberBetween(1, 8), // Random step number
            'salary' => $this->faker->randomFloat(2, 30000, 100000), // Random salary between 30,000 and 100,000
            'grade' => $this->faker->numberBetween(1, 33), // Random grade between 1 and 5
        ];
    }
}
