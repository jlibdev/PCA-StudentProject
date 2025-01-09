import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import { Button } from "../../../../Components/ui/button";
import ConfirmCancelButton from "../../../../Components/ConfirmCancelButton";
import CompensationStoreDialog from "./CompensationStoreDialog";

export function CompensationStore({ openDialog }: { openDialog: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "NAME",
        shorthand: "SHORT",
        is_taxable: false,
        is_fixed: false,
        fixed_amount: 2000,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("store.compensations"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Compensation Type {data.name} has been added!
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "name",
                    "shorthand",
                    "fixed_amount",
                    "is_taxable",
                    "is_fixed"
                );
                openDialog(false);
            },
            onError: () => {
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <CompensationStoreDialog
                data={data}
                errors={errors}
                setData={setData}
            ></CompensationStoreDialog>
            <ConfirmCancelButton
                processing={processing}
                setOpenDialog={openDialog}
            />
        </form>
    );
}

export function CompensationUpdate({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: "joshua",
        shorthand: "FOK",
        is_taxable: false,
        is_fixed: false,
        fixed_amount: 2000,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (!data.is_fixed) {
            data.fixed_amount = 0;
        }

        put(route("update.compensations", 10), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Successfully Edited {data.name}
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "name",
                    "shorthand",
                    "fixed_amount",
                    "is_taxable",
                    "is_fixed"
                );
                setOpenDialog(false);
            },
            onError: () => {
                console.log(errors);
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };
    return (
        <form onSubmit={submit}>
            <CompensationStoreDialog
                data={data}
                errors={errors}
                setData={setData}
            ></CompensationStoreDialog>
            <ConfirmCancelButton
                processing={processing}
                setOpenDialog={setOpenDialog}
            />
        </form>
    );
}

export function CompensationDelete({
    rowId,
    setOpenDialog,
}: {
    rowId: number | undefined;
    setOpenDialog: any;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("delete.compensations", rowId), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Compensation has been succesfully deleted.
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                setOpenDialog(false);
            },
            onError: () => {
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };
    return (
        <>
            <form onSubmit={submit}>
                <div className="flex gap-3 w-full justify-end">
                    <Button
                        type="button"
                        onClick={() => setOpenDialog(false)}
                        variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="destructive">
                        Confirm
                    </Button>
                </div>
            </form>
        </>
    );
}
