<?php

namespace App\Http\Controllers\Payroll;
use App\Http\Controllers\Controller;
use App\Models\SalaryGrade;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Exports\SalaryGradeExport;
use Maatwebsite\Excel\Facades\Excel;

class SalaryGradeController extends Controller
{
    /* Retrieves all the salary grade records. */
    public function index(): Response
    {
        /* Fetching all the entries stored within the database. */
        $data = SalaryGrade::all();

        /* Returning a success message to the user. */
        return Inertia::render('Payroll/Admin/SslPage/SslPage', ['data' => $data]);
    }

    /* Creates and stores a new salary grade record. */
    public function store(Request $request)
    {
        /* Validating the request entries. */
        $validated = $request->validate([
            'grade' => 'required|numeric|unique:salary_grades|min:1',
            'step1' => 'required|numeric|min:0',
            'step2' => 'required|numeric|min:0',
            'step3' => 'required|numeric|min:0',
            'step4' => 'required|numeric|min:0',
            'step5' => 'required|numeric|min:0',
            'step6' => 'required|numeric|min:0',
            'step7' => 'required|numeric|min:0',
            'step8' => 'required|numeric|min:0',
        ]);

        /* Creating a new profile for the record. */
        SalaryGrade::create([
            'grade' => $validated['grade'],
            'step1' => $validated['step1'],
            'step2' => $validated['step2'],
            'step3' => $validated['step3'],
            'step4' => $validated['step4'],
            'step5' => $validated['step5'],
            'step6' => $validated['step6'],
            'step7' => $validated['step7'],
            'step8' => $validated['step8'],
        ]);

        /* Returning a success message to the user. */
        return redirect()->back()->with('success', 'Data saved successfully!');
    }

    /* Finds and updates a single salary grade. */
    // [x]: FIXED SSL UPDATE
    public function update(Request $request, $salary_grade_code)
    {
        /* Validating the request entries. */
        $validated = $request->validate([
            'grade' => 'required|numeric|min:1|unique:salary_grades,grade,' . $salary_grade_code . ',salary_grade_code',
            'step1' => 'required|numeric|min:0',
            'step2' => 'required|numeric|min:0',
            'step3' => 'required|numeric|min:0',
            'step4' => 'required|numeric|min:0',
            'step5' => 'required|numeric|min:0',
            'step6' => 'required|numeric|min:0',
            'step7' => 'required|numeric|min:0',
            'step8' => 'required|numeric|min:0',
        ]);

        /* Finding and updating the record within the database. */
        SalaryGrade::where('salary_grade_code', $salary_grade_code)->update($validated);

        /* Returning a success message to the user. */
        return redirect()->back()->with('success', 'Successfully stored ssl');
    }


    /* Deletes all the information for a single salary grade. */
    public function destroy($salary_grade_code)
    {
        /* Finding and deleting the record within the database. */
        SalaryGrade::where('salary_grade_code', $salary_grade_code)->delete();

        /* Returning a success message to the user. */
        return redirect()->back()->with('success', 'Success');
    }

    /**
     * Export Salary Grades to Excel.
     */
    public function exportToExcel()
    {
        return Excel::download(new SalaryGradeExport, 'salary_grades.xlsx');
    }
}
