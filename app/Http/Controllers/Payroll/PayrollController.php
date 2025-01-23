<?php

namespace App\Http\Controllers\Payroll;


use App\Exports\Payrollentries;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PayrollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // TODO: Buhatan og query builder ni kyr
    // [x]: need bag full crud diria?
    public function index()
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    public function exportPayrollEntries()
    {
        return Excel::download(new Payrollentries, 'payroll_entries.xlsx');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
