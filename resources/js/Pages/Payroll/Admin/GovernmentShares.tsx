import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import DialogMenu from "@/Components/Dialog";
import { AdminLinks } from "@/lib/payrollData";
import {
    AgencyShareStore,
    AgencyShareUpdate,
    AgencyShareDelete,
} from "@/Components/CrudComponents/AgencyShareCRUD";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import DropdownDialog from "@/Components/DropdownDialog";
import { cn } from "@/lib/utils";

type agencyTypes = {
    agency_share_code: number;
    agency_share_name: string;
    shorthand: number;
    amount: number;
    is_mandatory: boolean;
    remittance_percent: string;
    ceiling_amount: number;
};

const columns: ColumnDef<agencyTypes>[] = [
    { accessorKey: "agency_share_code", header: "ID" },
    { accessorKey: "agency_share_name", header: "NAME OF AGENCY SHARE" },
    { accessorKey: "shorthand", header: "SHORTHAND" },
    { accessorKey: "amount", header: "AMOUNT" },
    { accessorKey: "is_mandatory", header: "MANDATORY" },
    { accessorKey: "remittance_percent", header: "REMITTANCE %" },
    { accessorKey: "ceiling_amount", header: "CEILING AMOUNT" },
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
                        rowData.agency_share_name
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
                        rowData.agency_share_name,
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
                        dialogClassName="max-w-[1000px] min-h-[400px]"
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

export default function GovernmentShare() {
    const pageData = (usePage().props.data as agencyTypes[]) || [];
    const data: agencyTypes[] = pageData;
    const [globalFilter, setGlobalFilter] = useState<any>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 12,
            },
        },

        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    const [openDialog, setOpenDialog] = useState(false);

    return (
        <AuthenticatedLayoutAdmin title="Government Shares " links={AdminLinks}>
            <BodyContentLayout headerName={"Government Shares"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-pca"
                    />

                    <div>
                        <DialogMenu
                            dialogClassName="max-w-[1000px] min-h-[400px]"
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-pca pl-3 pr-3">
                                    <Plus className="mr-2 h-6 w-auto" />
                                    New Government Share Profile
                                </section>
                            }
                            title="New Government Share Profile"
                        >
                            <AgencyShareStore
                                compensationTypes={
                                    usePage().props
                                        .compensationTypes as Array<string>
                                }
                                openDialog={() => setOpenDialog(!openDialog)}
                            ></AgencyShareStore>
                        </DialogMenu>
                    </div>
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    ></DataTable>
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}
