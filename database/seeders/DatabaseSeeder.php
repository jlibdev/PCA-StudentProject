<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use \DateTime;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // users =================================================================
        $users = [];
        
        for ($i = 1; $i <= 50; $i++) {
            $users[] = [
                'name' => "User $i",
                'email' => "user$i@example.com",
                'user_level' => $i % 2 == 0 ? 'admin' : 'bioadmin',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        
        DB::table('users')->insert($users);
        
        // for fakeh data ========================================================
        $faker = Faker::create();

        // SSL ===================================================================
        $salaryGrades = [];
        for ($grade = 1; $grade <= 33; $grade++) {
            $steps = [];
            for ($step = 1; $step <= 8; $step++) {
                if ($grade < 33 || $step <= 2) {
                    $steps["step{$step}"] = random_int(10000, 200000);
                } else {
                    $steps["step{$step}"] = 0;
                }
            }

            $steps['grade'] = $grade;
            $salaryGrades[] = $steps;
        }
        DB::table('salary_grades')->insert($salaryGrades);


        // stations =============================================================
        $stations = [];

        $stationNames = [
            'Central Office',
            'Regional Office',
            'Field Station',
            'Research Hub',
            'Monitoring Center',
            'Training Facility',
            'Operational Unit',
            'Administrative Wing',
            'Coordination Bureau',
            'Satellite Office'
        ];
        $cities = [
            'Quezon City',
            'Makati City',
            'Davao City',
            'Cebu City',
            'Baguio City',
            'Iloilo City',
            'Butuan City',
            'Zamboanga City',
            'General Santos City',
            'Tagaytay City'
        ];
        $provinces = [
            'Metro Manila',
            'Davao del Sur',
            'Cebu',
            'Benguet',
            'Iloilo',
            'Agusan del Norte',
            'Zamboanga del Sur',
            'South Cotabato',
            'Cavite',
            'Misamis Oriental'
        ];

        for ($i = 0; $i < 10; $i++) {
            $stations[] = [
                'name' => $stationNames[array_rand($stationNames)] . " " . ($i + 1),
                'street_address' => 'Street ' . random_int(1, 100) . ' ' . chr(random_int(65, 90)), // Random street (e.g., "Street 42 B")
                'barangay' => 'Barangay ' . random_int(1, 500),
                'city' => $cities[array_rand($cities)],
                'province' => $provinces[array_rand($provinces)],
                'postal_code' => random_int(8000, 8600)
            ];
        }
        DB::table('stations')->insert($stations);

        $appointments = [];

        // Holidays ==================================================================================
        $holidays = [];
        $holidayNames = [
            'New Year\'s Day',
            'Independence Day',
            'Labor Day',
            'Thanksgiving',
            'Christmas',
            'Easter',
            'Valentine\'s Day',
            'Halloween',
            'Memorial Day',
            'Veterans Day'
        ];
        $holiday_types = ['National', 'Religious', 'Cultural', 'Historical'];
        for ($i = 0; $i < 10; $i++) {
            $holidays[] = [
                'name' => $holidayNames[$i],
                'date' => date('Y-m-d', strtotime('2024-01-01 +' . random_int(0, 364) . ' days')), // Random date in 2024
                'type' => $holiday_types[array_rand($holiday_types)],
                'is_recurring' => (bool)random_int(0, 1)
            ];
        }
        DB::table('holidays')->insert($holidays);

        // compensation_types ==================================================

        // compensation types
        $compensation_names = [
            'basic_salary',
            'regular',
            'flexy',
            'pera',
            'athletic allowance',
            'honorarium',
            'cash gift',
            'overtime pay',
            'teaching overload',
            'tax refund 101',
            'tax refund 163',
        ];

        $compensationTypes = [];

        // Initialize Faker instance
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) {
            $compensationTypes[] = [
                'name' => $compensation_names[$i], // Correctly reference each name
                'shorthand' => strtoupper($faker->unique()->word),        // Generate random uppercase word
                'fixed_amount' => $faker->randomFloat(2, 5000, 20000), // Random amount between 5000 and 20000
                'is_taxable' => $faker->boolean,               // Random boolean
                'is_fixed' => $faker->boolean,                 // Random boolean
            ];
        }

        // Insert into the table
        DB::table('compensation_types')->insert($compensationTypes);

        // Appointments ===========================================================================
        $appointments = [];
        $uniqueAppointmentTypes = [
            'Regular',
            'Contractual',
            'Casual',
            'Temporary',
            'Job Order',
            'Part-Time',
            'Internship',
            'Consultant',
            'Freelance',
            'Seasonal'
        ];

        $basicPayTypes = ['Basic', 'Gross', 'Net'];
        $taxTypes = ['Basic', 'Withholding', 'Exempt'];

        foreach ($uniqueAppointmentTypes as $appointmentType) {
            $i = 1;
            $appointments[] = [
                'compensation_code' => $i++,
                'type' => $appointmentType,
                'has_mandatory_deduction' => (bool)random_int(0, 1)
            ];
        }
        DB::table('appointments')->insert($appointments);

        // positions ================================================================
        $positions = [];

        $jobTitles = [
            'Developer',
            'Analyst',
            'Coordinator',
            'Specialist',
            'Manager',
            'Engineer',
            'Consultant',
            'Technician',
            'Officer',
            'Administrator',
            'Planner',
            'Supervisor',
            'Strategist',
            'Director',
            'Executive',
            'Architect',
            'Assistant',
            'Lead',
            'Trainer',
            'Designer'
        ];

        for ($i = 1; $i <= 19; $i++) {
            $positions[] = [
                'title' => "$jobTitles[$i]",
                'salary_grade' => $i
            ];
        }
        DB::table('positions')->insert($positions);

        // employees ========================================================================
        $employees = [];
        $deviceBioIds = range(1, 100);
        shuffle($deviceBioIds);
        for ($i = 1; $i <= 50; $i++) {
            $employees[] = [
                'position_code' => $faker->numberBetween(1, 10),
                'appointment_code' => $faker->numberBetween(1, 10),
                'employee_number' => $faker->unique()->randomNumber(5),
                'user_code' => $i,
                'first_name' => $faker->firstName,
                'middle_name' => $faker->lastName,
                'last_name' => $faker->lastName,
                'name_extension' => $faker->optional(0.1)->suffix,
                'salary_step' => $faker->numberBetween(1, 8),
                'scanner_id' => array_pop($deviceBioIds),
                'is_active' => $faker->boolean,
                'credits' => $faker->numberBetween(1, 10)
            ];
        }
        // Insert into the employees table
        DB::table('employees')->insert($employees);

        // daily time entries ==================================================================
        $dailyTimeEntries = [];
        for ($i = 0; $i < 50; $i++) {
            $date = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');
            $timeInAm = $faker->time('08:00:00', '10:00:00');
            $timeOutAm = (new DateTime($timeInAm))->modify('+' . $faker->numberBetween(60, 120) . ' minutes')->format('H:i:s');
            $timeInPm = $faker->time('13:00:00', '14:00:00');
            $timeOutPm = (new DateTime($timeInPm))->modify('+' . $faker->numberBetween(60, 240) . ' minutes')->format('H:i:s');
            $tardyMinutes = $faker->numberBetween(0, 30);
            $totalMinutesWorked = (strtotime($timeOutAm) - strtotime($timeInAm)) / 60 + (strtotime($timeOutPm) - strtotime($timeInPm)) / 60;
            $expectedDailyMinutes = 480;
            $undertimeMinutes = max(0, $expectedDailyMinutes - $totalMinutesWorked - $tardyMinutes);

            $dailyTimeEntries[] = [
                'employee_code' => random_int(1, 49),
                'am_clockin' => $timeInAm,
                'am_clockout' => $timeOutAm,
                'pm_clockin' => $timeInPm,
                'pm_clockout' => $timeOutPm,
                'late_minutes' => $tardyMinutes,
                'under_minutes' => $undertimeMinutes,
                'work_minutes' => $totalMinutesWorked,
            ];
        }
        DB::table('daily_entries')->insert($dailyTimeEntries);

        //Signatory =========================================================================

        $signatoryData=[];
        for($i = 1; $i<= 7;$i++){
            $signatoryData[] = [
                'preparer_code'=>$faker->numberBetween(1,49),
                'recommender_code'=>$faker->numberBetween(1,49),
                'certifier_code'=>$faker->numberBetween(1,49),
                'approver_code'=>$faker->numberBetween(1,49),
                'name'=>$faker->word
            ];
        }
        DB::table('signatories')->insert($signatoryData);

        // leave_requests =========================================================================
        $leaveRequests = [];
        $leaveTypes = ['Sick Leave', 'Vacation Leave', 'Emergency Leave', 'Maternity Leave', 'Paternity Leave'];
       # $statuses = ['Pending', 'Approved', 'Rejected'];

        for ($i = 0; $i < 10; $i++) {
            $dateFiled = $faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d');
            $startDate = $faker->dateTimeBetween($dateFiled, '+5 day')->format('Y-m-d');
            $endDate = $faker->dateTimeBetween($startDate, '+1 month')->format('Y-m-d');
            $leaveType = $faker->randomElement($leaveTypes);
            $leaveDescription = $faker->boolean(80) ? $faker->sentence() : 'N/A'; // 80% chance of having a description
          #  $status = $faker->randomElement($statuses);
            $employeeCode = random_int(1, 50);
            $approverCode = random_int(1, 10);

            $leaveRequests[] = [
                'employee_code' => $employeeCode,
                'approver_code' => $approverCode,
                'type' => $leaveType,
                'description' => $leaveDescription,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'file_date' => $dateFiled,
                # 'leave_request_status' => $status,
                'is_approved' => $faker->boolean
            ];
        }
        DB::table('leave_requests')->insert($leaveRequests);

        // travel_orders =================================================
        $travelOrders = [];

        for ($i = 1; $i <= 50; $i++) {
            $startDate = $faker->dateTimeBetween('-1 year', '+1 year'); // Start date within a year from now
            $endDate = (clone $startDate)->modify('+' . $faker->numberBetween(1, 14) . ' days'); // End date 1-14 days later

            $travelOrders[] = [
                'type' => $leaveType,
                'description' => $leaveDescription,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'file_date' => $dateFiled,
                # 'leave_request_status' => $status,
                'is_approved' => $faker->boolean
            ];
        }
        DB::table('travel_orders')->insert($travelOrders);

        // Job orders =========================================================================
        $jobOrders = [];
        for ($i = 0; $i < 10; $i++) {
            $employeeCode = $faker->numberBetween(1, 50);
            $startDate = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');
            $endDate = (new DateTime($startDate))->modify('+' . $faker->numberBetween(1, 5) . ' days')->format('Y-m-d');
            $jobOrders[] = [
                'employee_code' => $employeeCode,
                'start_date' => $startDate,
                'end_date' => $endDate
            ];
        }
        DB::table('job_orders')->insert($jobOrders);

        // Contracts=========================================================================
        $contracts = [];

        for ($i = 0; $i < 10; $i++) {
            $employeeCode = $faker->numberBetween(1, 50);
            $startDate = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');
            $endDate = (new DateTime($startDate))->modify('+' . $faker->numberBetween(1, 5) . ' years')->format('Y-m-d');
            $contracts[] = [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'employee_code' => $employeeCode
            ];
        }
        DB::table('contracts')->insert($contracts);

        // payroll_sheets====================================================
        // compensation types
        $compensation_names_for_sheets = [
            'basic_salarys',
            'regulars',
            'flexys',
            'pera',
            'athletic allowances',
            'honorariums',
            'cash gifts',
            'overtime pays',
            'teaching overloads',
            'tax refund 1011',
            'tax refund 1631',
        ];

        $payrollSheets = [];
        for ($i = 0; $i < 10; $i++) {


             // Get three random keys
            $randomKeys = array_rand($compensation_names_for_sheets, 3);

             // Extract the random names using the keys
            $three_random = array_map(function ($key) use ($compensation_names_for_sheets) {
                return $compensation_names_for_sheets[$key];
            }, $randomKeys);

             // Combine into a single string separated by commas

            $payrollName = $faker->unique()->word. ' Payroll';
            $payrollType = $faker->randomElement(['Regular', 'Overtime', 'Bonus', 'Holiday']);
            $startDate = $faker->dateTimeBetween('-1 month', 'now')->format('Y-m-d');
            $endDate = (new DateTime($startDate))->modify('+' . $faker->numberBetween(1, 5) . ' days')->format('Y-m-d');
            $dateCreated = $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d');
            $datePosted = $faker->dateTimeBetween($dateCreated, $dateCreated)->format('Y-m-d');
            $datePaid = $faker->dateTimeBetween($datePosted, $datePosted)->format('Y-m-d');
            $signatory_code = $faker->numberBetween(1, 7);

            $payrollSheets[] = [
                'name' => $payrollName,
                'fund_cluster' => $faker->word,
                'payroll_format' => $faker->word,
                'include_mandatory_deductions' => $faker->boolean,
                'type' => $payrollType,
                'signatory_code' => $signatory_code,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'create_date' => $dateCreated,
                'post_date' => $datePosted,
                'pay_date' => $datePaid,
            ];
        }
        DB::table('payroll_sheets')->insert($payrollSheets);

        // deduction_types==================================================
        $deductionTypes = [];

        for ($i = 0; $i < 10; $i++) {

            // Get three random keys
            $randomKeys = array_rand($compensation_names, 3);

            // Extract the random names using the keys
            $three_random = array_map(function ($key) use ($compensation_names) {
                return $compensation_names[$key];
            }, $randomKeys);

            // Combine into a single string separated by commas
            $randomString = implode(', ', $three_random);

            $deductionTypes[] = [
                'name' => $faker->unique()->word . ' Deduction',  // Random deduction name
                'shorthand' => strtoupper($faker->unique()->word),  // Random shorthand, uppercase
                'fixed_amount' => $faker->randomFloat(2, 1000, 10000),  // Random amount between 1,000 and 10,000
                'is_mandatory' => $faker->boolean,  // Random boolean value for mandatory status
                'remittance_percent' => $faker->randomFloat(2, 5, 20),  // Random remittance percent between 5% and 20%
                'ceiling_amount' => $faker->randomFloat(2, 0, 5000),  // Random ceiling amount between 0 and 5,000
                'compensation_link' => $randomString,
            ];
        }
        DB::table('deduction_types')->insert($deductionTypes);

        // agency_shares =============================================================
        for ($i = 0; $i < 10; $i++) {


            // Get three random keys
            $randomKeys = array_rand($compensation_names, 3);

            // Extract the random names using the keys
            $three_random = array_map(function ($key) use ($compensation_names) {
                return $compensation_names[$key];
            }, $randomKeys);

            // Combine into a single string separated by commas
            $randomString = implode(', ', $three_random);


            DB::table('agency_shares')->insert([
                'name' => $faker->company . ' Share',  // Random company share name
                'shorthand' => strtoupper($faker->unique()->lexify('??')),   // Random shorthand (2 letters)
                'fixed_amount' => $faker->randomFloat(2, 50, 500),       // Random amount (50 to 500)
                'is_mandatory' => $faker->boolean,                // Random boolean (true/false)
                'remittance_percent' => $faker->randomFloat(2, 0.01, 0.15), // Percent (0.01 to 0.15)
                'ceiling_amount' => $faker->randomFloat(2, 10, 100),  // Ceiling amount (10 to 100)
                'compensation_link' => $randomString,
            ]);
        }

        // loan types ============================================================
        $loanTypes = [];
        for ($i = 0; $i < 10; $i++) {
            $loanTypes[] = [
                'name' => $faker->unique()->word . ' Loan',
                'shorthand' => strtoupper($faker->unique()->lexify('??')),
                'provider' => $randomString,
            ];
        }
        DB::table('loan_types')->insert($loanTypes);

        // payroll entries====================================================
        $payrollEntries = [];
        for ($i = 1; $i <= 10; $i++) {
            $payrollEntries[] = [
                'employee_code' => $i,
                'payroll_sheet_code' => $faker->numberBetween(1, 10),  // Random payroll sheet code (1-10)
            ];
        }
        DB::table('payroll_entries')->insert($payrollEntries);

        // applied_compensations===================================================================
        // $appliedCompensations = [];

        // for ($i = 1; $i <= 10; $i++) {
        //     $appliedCompensations[] = [
        //         'employee_code' => $i,
        //         'compensation_code' => $i,
        //         'payroll_sheet_code' => $faker->numberBetween(1, 10),
        //         'amount' => $faker->randomFloat(2, 50, 5000)
        //     ];
        // }
        // DB::table('applied_compensations')->insert($appliedCompensations);


        // applied deductions====================================================================
        // $appliedDeductions = [];

        // for ($i = 1; $i <= 10; $i++) {
        //     $appliedDeductions[] = [
        //         'employee_code' => $i,
        //         'deduction_code' => $faker->numberBetween(1, 5),
        //         'payroll_sheet_code' => $faker->numberBetween(1, 10),
        //         'amount' => $faker->randomFloat(2, 500, 5000),
        //     ];
        // }
        // DB::table('applied_deductions')->insert($appliedDeductions);

        // applied shares ====================================================================
        // $appliedShares = [];
        // for ($i = 1; $i <= 10; $i++) {
        //     $appliedShares[] = [
        //         'employee_code' => $i,
        //         'agency_share_code' => $faker->numberBetween(1, 5),
        //         'payroll_sheet_code' => $faker->numberBetween(1, 10),
        //         'amount' => $faker->randomFloat(2, 100, 5000),
        //     ];
        // }
        // DB::table('applied_shares')->insert($appliedShares);

        // applied loans====================================================================
        // $appliedLoans = [];

        // for ($i = 1; $i <= 10; $i++) {
        //     $startDate = $faker->date();
        //     $endDate = $faker->date();

        //     while (strtotime($endDate) <= strtotime($startDate)) {
        //         $endDate = $faker->date();
        //     }

        //     $appliedLoans[] = [
        //         'employee_code' => $i,        // Random employee code between 1 and 10
        //         'loan_code' => $faker->numberBetween(1, 5),             // Random loan code between 1 and 5
        //         'start_date' => $startDate,
        //         'end_date' => $endDate,
        //         'monthly_amount' => $faker->randomFloat(2, 50, 5000),  // Random monthly amount between 50 and 5000
        //         'begin_balance' => $faker->randomFloat(2, 50, 5000),    // Random begin balance
        //         'amount_paid' => $faker->randomFloat(2, 50, 5000),      // Random paid amount
        //         'current_balance' => $faker->randomFloat(2, 50, 5000),          // Random balance
        //         'recent_paid' => $faker->randomFloat(2, 50, 5000),    // Random previous paid amount
        //     ];
        // }
        // DB::table('applied_loans')->insert($appliedLoans);

    }
}
