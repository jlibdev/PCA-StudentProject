<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Events\AfterSheet;

class Payrollentries implements FromCollection, WithHeadings, ShouldAutoSize, WithMapping, WithEvents
{
    protected $data;

    /**
     * Fetch the data for the export.
     *
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $this->data = DB::select("
            SELECT
                TO_CHAR(start_date, 'FMMonth') || ' ' || EXTRACT(YEAR FROM start_date) AS month_year,
                employees.last_name || ', ' || employees.first_name || ' ' || employees.middle_name || ' ' || COALESCE(employees.name_extension, '') AS full_name,
                payroll_entries.*
            FROM
                payroll_sheets
            JOIN
                payroll_entries ON payroll_sheets.payroll_sheet_code = payroll_entries.payroll_sheet_code
            JOIN
                employees ON payroll_entries.employee_code = employees.employee_code;
        ");

        // Remove unnecessary columns from each item
        foreach ($this->data as $item) {
            unset(
                $item->payroll_entry_code,
                $item->employee_code,
                $item->payroll_sheet_code,
                $item->created_at,
                $item->updated_at,
                $item->current_position
            );
        }

        return collect($this->data);
    }

    /**
     * Add headings to the Excel sheet.
     *
     * @return array
     */
    public function headings(): array
    {
        // Exclude specific columns from the headings
        $exclude = ['payroll_entry_code', 'employee_code', 'payroll_sheet_code', 'current_position', 'created_at', 'updated_at'];

        // Add custom headings for derived columns
        $newHeads = ['period', 'name'];

        // Fetch all column names from the table and exclude unwanted columns
        $columns = array_diff(Schema::getColumnListing('payroll_entries'), $exclude);

        // Merge custom headings with remaining columns
        return array_merge($newHeads, $columns);
    }

    /**
     * Map each row of data before exporting.
     *
     * @param mixed $row
     * @return array
     */
    public function map($row): array
    {
        // Convert the row object to an array
        return (array) $row;
    }

    /**
     * Event to add a totals row after the sheet is created.
     *
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $worksheet = $event->sheet->getDelegate();

                // Calculate totals for numeric columns
                $columns = array_keys((array) $this->data[0]); // Get all column keys
                $lastRow = count($this->data) + 1; // Data rows + header row
                $totalsRow = $lastRow + 1; // Totals row index

                foreach ($columns as $index => $column) {
                    if (!in_array($column, ['month_year', 'full_name'])) {
                        $cell = chr(65 + $index) . $totalsRow; // Convert index to column letter
                        $worksheet->setCellValue($cell, "=SUM(" . chr(65 + $index) . "2:" . chr(65 + $index) . $lastRow . ")");
                    }
                }

                // Add "Totals" label in the first column
                $worksheet->setCellValue('A' . $totalsRow, 'Totals');
                $worksheet->mergeCells("A$totalsRow:B$totalsRow"); // Merge first two columns
                $worksheet->getStyle("A$totalsRow")->getFont()->setBold(true);
            },
        ];
    }
}