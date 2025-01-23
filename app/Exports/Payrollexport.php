<?php

namespace App\Exports;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromArray;

class Payrollexport implements FromArray
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function array(): array
    {
        $results = DB::select('SELECT * FROM func_all_payroll_entry()');

        $data = [];
        foreach ($results as $row) {
            $data[] = (array) $row; 
        }
        return $data;
    }
}
