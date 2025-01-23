

// SSL types
export interface sslProfileTypes {
    grade: number;
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
    step7: number;
    step8: number;
}

export interface payrollIndexTypes {
    payroll_sheet_code?: number;
    fund_cluster: string;
    start_date : string;
    end_date: string;
    date_posted: string;
    date_paid : string;
    payroll_name : string;
    payroll_type : string;
    compensations: number;
    deductions : number;
    net_pay_amount_due: number;
}

export interface dropDownDialogsTypes {
    tag: string;
    name: string;
    dialogtitle: string;
    dialogContent?: React.ReactElement
    style?: string;
}


export interface appointmentTypes {
    appointment_code: number;
    type: string;
    basic_pay_type: string;
    tax_type: string;
    has_mandatory_deduction: boolean;
};

export interface agencyTypes {
    agency_share_code?: number;
    agency_share_name: string;
    shorthand: string;
    amount: number;
    is_mandatory: boolean;
    remittance_percent: number;
    ceiling_amount: number;
    compensation_links: Array<string>;
};

export interface deductionTypes {
    deduction_code?: number;
    deduction_name: string;
    shorthand: string;
    amount: number;
    is_mandatory: boolean;
    remittance_percent: number;
    ceiling_amount: number;
};

export interface compensationTypes {
    compensation_code?: number;
    name: string;
    shorthand: string;
    fixed_amount: number;
    is_taxable: boolean;
    is_fixed: boolean;
};

export interface employeeTypes {
    employee_code: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    name_entension: string;
    station_name : string;
    appointment_type: string;
    position_title: string;
    grade: number;
    step : number;
    salary: number;
}

export interface employeesListTypes {
    first_name: string;
    last_name: string;
    
}

