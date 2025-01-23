<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\CompensationType;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Fetch data from the database
        $data = Appointment::all();

        $compensationTypes = CompensationType::pluck('name');

        // Return the data to the frontend
        return Inertia::render('Payroll/Admin/AppointmentsPage/AppointmentsPage', ['data' => $data, 'name' => $compensationTypes]);
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
            'compensation_code' => 'required|integer',
        ]);

        // Create a new profile record in the database
        Appointment::create([
            'type' => $validated['type'],
            'has_mandatory_deduction' => $validated['has_mandatory_deduction'],
            'compensation_code' => $validated['compensation_code'],
        ]);

        // Redirect back or to a specific page after saving
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /**
     * Update the specified resource in storage.
     */
    //  TODO: SA PAG UPDATE SA MGA DAPAT NAKA UNIQUE LIKE SHORTHAND DAPAT MA ADDRESS
    // [x]: MANA SAB BAIII
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
     */
    // TODO: NEED PUD I DELETE ANG FOREING KEY NGA NAA SA EMPLOYEES (APPOINTMENT_TYPE)
    public function destroy($appointment_code)
    {
        dd("DISABLED");
        // Find the record by salary_grade
        Appointment::where('appointment_code', $appointment_code)->delete();
        return redirect()->back()->with('success', 'Successfully deleted ssl');
    }
}
