<?php

namespace App\Http\Controllers\Payroll;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SignatoriesModel;
use Inertia\Inertia;

class SignatoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch data from the database
        $data = SignatoriesModel::all();

        // Return the data to the frontend
        return Inertia::render('signatories', ['data' => $data]);
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
    public function store(Request $request, int $signatory_code)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'signatory_template' => 'required|string|max:255',
            'signatory_A' => 'required|string|max:255',
            'signatory_B' => 'required|string|max:255',
            'signatory_C' => 'required|string|max:255',
            'signatory_D' => 'required|string|max:255',
        ]);

        // Create a new signatory using validated data
        $updated = SignatoriesModel::where('signatory_code', $signatory_code)->update($validatedData);

        //debug
        if ($updated) {
            return response()->json(['message' => 'Signatory updated successfully'], 200);
        } else {
            return response()->json(['message' => 'Signatory not found or update failed'], 404);
        }
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function get_all_signatories_list()
    {

        $data = SignatoriesModel::all();

        return response()->json(['signatories' => $data]);
    }
}
