import {
    AgencyShareDelete,
    AgencyShareStore,
    AgencyShareUpdate,
} from "@/Pages/Payroll/Admin/GovernmentSharesPage/AgencyShareCRUD";
import { DataTable } from "@/Components/DataTable";
import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import PaginationTable from "@/Components/Pagination";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import { agencyTypes } from "@/types/payrollPagesTypes";
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
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

const GovernmentSharesPage = () => {
    const data = (usePage().props.data as agencyTypes[]) || [];
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
                    id: "agency_share_code",
                    desc: false,
                },
            ],
        },
    });

    return (
        <AuthenticatedLayout
            pageTitle="Government Shares"
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
                            dialogClassName="max-w-[1000px] min-h-[450px]"
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="Add Salary Grade "
                                >
                                    <Plus size={20} />
                                    <Label>Add Government Share</Label>
                                </Button>
                            }
                            title="New Government Share"
                            description=""
                        >
                            <AgencyShareStore
                                compensationTypes={
                                    usePage().props
                                        .compensationTypes as Array<string>
                                }
                                openDialog={() => setOpenDialog(!openDialog)}
                            />
                        </DialogMenu>
                    </div>
                </div>
                <DataTable
                    {...{
                        table,
                        rowStyle: "odd:bg-white even:bg-transparent ",
                    }}
                />

                <PaginationTable table={table}></PaginationTable>
            </div>
        </AuthenticatedLayout>
    );
};

export default GovernmentSharesPage;

const columns: ColumnDef<agencyTypes>[] = [
    { accessorKey: "agency_share_code", header: "ID" },
    { accessorKey: "name", header: "NAME OF AGENCY SHARE" },
    { accessorKey: "shorthand", header: "SHORTHAND" },
    {
        accessorKey: "fixed_amount",
        header: "AMOUNT",
        cell: ({ row }) => {
            const number = Number(row.getValue("fixed_amount"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "is_mandatory",
        header: "MANDATORY",
        cell: ({ row }) => {
            return row.getValue("is_mandatory") == true ? "Yes" : "No";
        },
    },
    {
        accessorKey: "remittance_percent",
        header: "REMITTANCE %",
        cell: ({ row }) => {
            return row.getValue("remittance_percent") != 0
                ? row.getValue("remittance_percent") + "%"
                : "N/A";
        },
    },
    {
        accessorKey: "ceiling_amount",
        header: "CEILING AMOUNT",
        cell: ({ row }) => {
            const number = Number(row.getValue("ceiling_amount"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
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
                    dialogtitle: cn(
                        "Edit Appointment ",
                        rowData.name
                    ),
                    dialogContent: (
                        <AgencyShareUpdate
                            compensationTypes={
                                usePage().props
                                    .compensationTypes as Array<string>
                            }
                            setOpenDialog={setOpenDialog}
                            RowData={rowData}
                        ></AgencyShareUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete Agency Share:  ",
                        rowData.name,
                        "?"
                    ),
                    dialogContent: (
                        <AgencyShareDelete
                            rowId={rowData.agency_share_code}
                            setOpenDialog={setOpenDialog}
                        ></AgencyShareDelete>
                    ),
                    style: "text-red-600",
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[1000px] min-h-[450px]"
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
