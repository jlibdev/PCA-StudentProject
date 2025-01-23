<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PayrollEntry extends Model
{
	protected $table = 'payroll_entries';
	protected $primaryKey = 'payroll_entry_code';

    protected $fillable = [
		'employee_code',
		'payroll_sheet_code'
	];

	public function payrollSheet() {
		return $this->belongsTo(PayrollSheet::class);
	}

	public function employee() {
		return $this->belongsTo(Employee::class);
	}
}
