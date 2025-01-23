<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\CompensationType;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data = DB::select('
            SELECT 
                a.*, 
                (SELECT ct.name 
                FROM compensation_types AS ct 
                WHERE a.compensation_code = ct.compensation_code) AS compensation_name
            FROM appointments AS a;
        ');

        // for selection of store appointments
        $compensation_name = CompensationType::pluck("name");

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/AppointmentsPage/AppointmentsPage', ['data' => $data, 'compensationTypes' => $compensation_name]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
        /* Validating the user request. */
        $validated = $request->validate([
            'type' => 'required|unique:appointments',
            'has_mandatory_deduction' => 'required|boolean',
            'compensation_name' => 'required|string',
        ]);

        // process compensation name => compensation code
        $compensation_code = DB::select(
            'select compensation_code
            from compensation_types
            where name = ?', [$validated["compensation_name"]]
        );

        // Create a new profile record in the database
        Appointment::create([
            'type' => $validated['type'],
            'has_mandatory_deduction' => $validated['has_mandatory_deduction'],
            'compensation_code' => $compensation_code[0]->compensation_code,
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $appointment_code)
    {
        /* Validating the user request. */
        $validated = $request->validate([
            'type' => 'required|unique:appointments',
            'has_mandatory_deduction' => 'required|boolean',
            'compensation_code' => 'required|integer',
        ]);

        Appointment::where('appointment_code', $appointment_code)->update($validated);
        return redirect()->back()->with('success', 'Successfully updated Appointment');
    }

    /**
     * Remove the specified resource from storage.
     */    public function destroy($appointment_code)
    {
        // Find the record by salary_grade
        Appointment::where('appointment_code', $appointment_code)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }
}
