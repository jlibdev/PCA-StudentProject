<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use App\Models\AgencyShare;
use App\Models\CompensationType;
use App\Models\DeductionType;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\PayrollSheet;
use Inertia\Inertia;
use Inertia\Response;

class PayrollSheetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payrollSheets = PayrollSheet::all();

        return Inertia::render('Payroll/Admin/PayrollsPage/PayrollsPage', ['data' => $payrollSheets]);
    }

    public function get_employees()
    {
        $employees = Employee::get(['first_name', 'last_name', 'employee_code']);
        return response()->json([
            'status' => 'success',
            'message' => 'Employees retrieved successfully',
            'data' => $employees,
        ]);
    }

    public function get_employee(int $id)
    {
        $employee = Employee::where('employee_code', $id)->first();

        return response()->json([
            'status' => 'success',
            'message' => 'Employees retrieved successfully',
            'data' => $employee,
        ]);
    }

    public function get_all_compensatation_types()
    {
        $compensation_types = CompensationType::all();

        return response()->json(['data' => $compensation_types]);
    }

    public function get_all_agency_types()
    {
        $agency_types = AgencyShare::all();

        return response()->json(['data' => $agency_types]);
    }

    public function get_all_deduction_types()
    {
        $deduction_types = DeductionType::all();

        return response()->json(['data' => $deduction_types]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $payroll_name)
    {
        $validated = $request->validate([
            'payroll_name' => 'required|string|max:255',
            'payroll_type' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'date_created' => 'nullable|date',
            'date_posted' => 'nullable|date',
            'date_paid' => 'nullable|date',
            'prepared_by' => 'string|required',
            'recommended_by' => 'string|required',
            'certified_by' => 'string|required',
            'approved_by' => 'string|required',
            'fund_cluster' => 'string',
            'include_deduction' => 'boolean',
        ]);

        PayrollSheet::where('payroll_name', $payroll_name)->update($validated);
        return redirect()->back()->with('success', 'Successfully stored Payroll Sheet');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
