import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { appointmentTypes } from "@/types/payrollPagesTypes";
import { usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import DialogMenu from "@/Components/Dialog";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { DataTable } from "@/Components/DataTable";
import PaginationTable from "@/Components/Pagination";
import {
    AppointmentDelete,
    // AppointmentDelete,
    AppointmentStore,
    AppointmentUpdate,
} from "./AppointmentCRUD";

const AppointmentsPage = () => {
    const data = (usePage().props.data as appointmentTypes[]) || [];
    const compensationTypes = usePage().props.compensationTypes;

    // console.log(compensationTypes);

    const [openDialog, setOpenDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 12,
            },
            sorting: [
                {
                    id: "appointment_code",
                    desc: false,
                },
            ],
        },
    });
    return (
        <AuthenticatedLayout
            pageTitle="Appointments"
            navigationType="payrollAdmin"
        >
            <div className="h-full flex flex-col">
                <div className="mb-5 flex flex-row gap-5">
                    <Input
                        type="search"
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        className="w-1/4 rounded-pca"
                        placeholder="Search...."
                    />
                    <div className="grid grid-cols-1 gap-5 w-1/4">
                        <DialogMenu
                            dialogClassName=" max-w-[1000px]"
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="New Appointment Profile"
                                >
                                    <Plus size={20} />
                                    <Label>Add Appointment Profile</Label>
                                </Button>
                            }
                            title="New Appointment"
                            description=""
                        >
                            <AppointmentStore
                                compensationTypes={
                                    compensationTypes
                                }
                                openDialog={() => setOpenDialog(!openDialog)}
                            />
                        </DialogMenu>
                    </div>
                </div>
                <DataTable
                    {...{
                        table,
                        rowStyle: "odd:bg-white even:bg-transparent",
                    }}
                />

                <PaginationTable table={table}></PaginationTable>
            </div>
        </AuthenticatedLayout>
    );
};

export default AppointmentsPage;

const columns: ColumnDef<appointmentTypes>[] = [
    { accessorKey: "appointment_code", header: "ID", enableSorting: true },
    { accessorKey: "type", header: "TYPE" },
    { accessorKey: "compensation_name", header: "BASIC PAY TYPE" },
    {
        accessorKey: "has_mandatory_deduction",
        header: "MANDATORY DEDUCTION",
        cell: ({ row }) => {
            return row.getValue("has_mandatory_deduction") == true
                ? "Yes"
                : "No";
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn("Edit Appointment ", rowData.type),
                    dialogContent: (
                        <AppointmentUpdate
                            compensationTypes={
                                usePage().props
                                    .compensationTypes as Array<string>
                            }
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></AppointmentUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete ",
                        rowData.type,
                        "?"
                    ),
                    dialogContent: (
                        <AppointmentDelete
                            rowId={rowData.appointment_code}
                            setOpenDialog={setOpenDialog}
                        ></AppointmentDelete>
                    ),
                    style: "text-red-600",
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName=" max-w-[1000px]"
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        dialogs={dialogs}
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
