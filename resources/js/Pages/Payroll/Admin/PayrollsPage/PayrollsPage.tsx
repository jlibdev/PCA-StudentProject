import { DataTable } from "@/Components/DataTable";
import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import DialogMenu from "@/Components/Dialog";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import {
    dropDownDialogsTypes,
    payrollIndexTypes,
} from "@/types/payrollPagesTypes";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    RowData,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { PayrollsIndexStore } from "./PayrollIndexCrud";

const PayrollsPage = () => {
    const [data, setData] = useState<Array<payrollIndexTypes>>([
        {
            payroll_sheet_code: 10001,
            fund_cluster: "General Fund",
            start_date: "2024-12-01",
            end_date: "2024-12-15",
            date_posted: "2024-12-10",
            date_paid: "2024-12-15",
            payroll_name: "December Payroll - First Half",
            payroll_type: "Regular",
            compensations: 250000.0,
            deductions: 50000.0,
            net_pay_amount_due: 200000.0,
        },
        {
            payroll_sheet_code: 10002,
            fund_cluster: "Special Projects",
            start_date: "2024-12-01",
            end_date: "2024-12-15",
            date_posted: "2024-12-11",
            date_paid: "2024-12-16",
            payroll_name: "Project X Payroll",
            payroll_type: "Contract Service",
            compensations: 150000.0,
            deductions: 30000.0,
            net_pay_amount_due: 120000.0,
        },
        {
            payroll_sheet_code: 10003,
            fund_cluster: "Development Fund",
            start_date: "2024-11-16",
            end_date: "2024-11-30",
            date_posted: "2024-12-01",
            date_paid: "2024-12-05",
            payroll_name: "November Payroll - Second Half",
            payroll_type: "Regular",
            compensations: 300000.0,
            deductions: 75000.0,
            net_pay_amount_due: 225000.0,
        },
        {
            payroll_sheet_code: 10004,
            fund_cluster: "Grant Fund",
            start_date: "2024-12-01",
            end_date: "2024-12-10",
            date_posted: "2024-12-11",
            date_paid: "2024-12-12",
            payroll_name: "Grant Payroll",
            payroll_type: "External",
            compensations: 100000.0,
            deductions: 20000.0,
            net_pay_amount_due: 80000.0,
        },
        {
            payroll_sheet_code: 10005,
            fund_cluster: "General Fund",
            start_date: "2024-12-16",
            end_date: "2024-12-31",
            date_posted: "2025-01-02",
            date_paid: "2025-01-05",
            payroll_name: "December Payroll - Second Half",
            payroll_type: "Regular",
            compensations: 275000.0,
            deductions: 60000.0,
            net_pay_amount_due: 215000.0,
        },
    ]);

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter,
        },
        initialState: {
            sorting: [
                {
                    id: "payroll_sheet_code",
                    desc: false,
                },
            ],
        },
    });

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    function handleMouseEnter(data: any) {
        console.log(data.original);
    }

    return (
        <AuthenticatedLayout
            pageTitle="Payrolls Index"
            navigationType="payrollAdmin"
        >
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <Input
                        placeholder="Search...."
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        type="search"
                        className="w-1/4 rounded-pca"
                    ></Input>
                    <div className="w-full grid grid-cols-6 gap-3">
                        <DialogMenu
                            open={openDialog}
                            dialogClassName="max-w-[calc(100%-5%)] h-[calc(100%-20%)]"
                            openDialog={() => setOpenDialog(!openDialog)}
                            title="New Payroll Index"
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="New Payroll Index"
                                >
                                    <Plus size={20} />
                                    <Label>New Payroll Index</Label>
                                </Button>
                            }
                        >
                            <PayrollsIndexStore
                                openDialog={() => setOpenDialog(!openDialog)}
                            />
                        </DialogMenu>
                    </div>
                </div>
                <DataTable
                    {...{
                        table,
                        rowStyle: "odd:bg-white even:bg-transparent",
                        onMouseEnter: handleMouseEnter,
                    }}
                ></DataTable>
            </div>
        </AuthenticatedLayout>
    );
};

export default PayrollsPage;

const columns: ColumnDef<payrollIndexTypes>[] = [
    { accessorKey: "payroll_sheet_code", header: "Ref. Code" },
    { accessorKey: "fund_cluster", header: "Fund Cluster" },
    { accessorKey: "payroll_name", header: "Payroll Name" },
    { accessorKey: "payroll_type", header: "Payroll Type" },
    { accessorKey: "start_date", header: "Start Date" },
    { accessorKey: "end_date", header: "End Date" },
    {
        accessorKey: "compensations",
        header: "Compensations",
        cell: ({ row }) => {
            const number = Number(row.getValue("compensations"));
            return <p>₱ {number.toLocaleString("en-US")} </p>;
        },
    },
    {
        accessorKey: "deductions",
        header: "Deductions",
        cell: ({ row }) => {
            const number = Number(row.getValue("deductions"));
            return <p>₱ {number.toLocaleString("en-US")} </p>;
        },
    },
    { accessorKey: "date_posted", header: "Date Posted" },
    { accessorKey: "date_paid", header: "Date Paid" },
    {
        accessorKey: "net_pay_amount_due",
        header: "Net Pay",
        cell: ({ row }) => {
            const number = Number(row.getValue("net_pay_amount_due"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        id: "action",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs: dropDownDialogsTypes[] = [
                {
                    tag: "1",
                    name: "Edit Properties",
                    dialogtitle: cn(
                        "Edting Properties of ",
                        rowData.payroll_name
                    ),
                    dialogContent: (
                        <PayrollsIndexStore openDialog={setOpenDialog} />
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete Salary Grade",
                        rowData.payroll_name,
                        "?"
                    ),
                    style: "text-red-600",
                },
            ];
            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[calc(100%-5%)] h-[calc(100%-20%)]"
                        dialogs={dialogs}
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        trigger={
                            <>
                                <section>
                                    <MoreHorizontal className="h-4 w-4" />
                                </section>
                            </>
                        }
                    ></DropdownDialog>
                </div>
            );
        },
    },
];
