import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../../../Components/ui/button";
import ConfirmCancelButton from "../../../../Components/ConfirmCancelButton";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../../Components/ui/tabs";
import IncludeExcludeBox from "../../../../Components/IncludeExcludeBox";
import ToastError from "../../../../Components/ToastError";
import GovernmentShareStore from "./GovernmentShareStore";

export function AgencyShareStore({
    openDialog,
    compensationTypes,
}: {
    openDialog: any;
    compensationTypes: Array<string>;
}) {
    const { data, setData, post, processing, errors, reset, setError } =
        useForm({
            name: "power",
            shorthand: "PWR",
            is_mandatory: false,
            compensation_links: ["sfhisdhfisdhf"] as Array<string>,
            fixed_amount: 300,
            remittance_percentage: 0.1,
            ceiling_amount: 10.11,
        });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        data.compensation_links = [...selectedItems];

        if (data.remittance_percentage == 0 && data.ceiling_amount == 0) {
            setError(
                "remittance_percentage",
                "Amount and remittance must not be zero at the same time."
            );
            return;
        }

        post(route("store.governmentshare"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Agency Share {data.name} has been Added
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "name",
                    "shorthand",
                    "is_mandatory",
                    "remittance_percentage",
                    "ceiling_amount",
                    "compensation_links"
                );
                openDialog(false);
            },
            onError: () => {
                console.log(errors);
                toast(<ToastError />, {
                    duration: 2000,
                });
            },
        });
    };

    const [baseItems, setBaseItems] = useState<Array<string>>([
        ...compensationTypes,
    ]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);

    const [selected, setSelected] = useState<string>("");
    return (
        <form onSubmit={submit} className="h-full">
            <Tabs defaultValue="Properties" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="Properties">Properties</TabsTrigger>
                    <TabsTrigger value="Links">Compensation Links</TabsTrigger>
                </TabsList>
                <TabsContent value="Properties">
                    <GovernmentShareStore
                        selected={selected}
                        setSelected={setSelected}
                        errors={errors}
                        data={data}
                        setData={setData}
                    ></GovernmentShareStore>
                </TabsContent>
                <TabsContent value="Links">
                    <IncludeExcludeBox
                        baseItems={baseItems}
                        selectedItems={selectedItems}
                        setBaseItems={setBaseItems}
                        setSelectedItems={setSelectedItems}
                        selectedItemsName="Compensation Links"
                        baseItemsName="Compensation Types"
                        className="h-[230px]"
                    />
                </TabsContent>
            </Tabs>
            <ConfirmCancelButton
                processing={processing}
                setOpenDialog={openDialog}
            />
        </form>
    );
}

// UPDATE FUNCTION

export function AgencyShareUpdate({
    RowData,
    setOpenDialog,
    compensationTypes,
}: {
    RowData: any;
    setOpenDialog: any;
    compensationTypes: Array<string>;
}) {
    const { data, setData, put, processing, errors, reset, setError } = useForm(
        {
            name: "power",
            shorthand: "PWR",
            is_mandatory: false,
            compensation_links: ["wow"] as Array<string>,
            fixed_amount: 300,
            remittance_percentage: 0.1,
            ceiling_amount: 10.11,
        }
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        data.compensation_links = [...selectedItems];

        if (selected == "Fixed") {
            data.remittance_percentage = 0;
            data.ceiling_amount = 0;
        }
        if (selected == "Remittance") {
            data.fixed_amount = 0;
        }

        if (
            data.fixed_amount == 0 &&
            data.remittance_percentage == 0 &&
            data.ceiling_amount == 0
        ) {
            setError(
                "fixed_amount",
                "Amount and remittance must not be zero at the same time."
            );
            setError(
                "remittance_percentage",
                "Amount and remittance must not be zero at the same time."
            );
            return;
        }

        put(route("update.governmentshare", 3), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Successfully Edited {data.agency_share_name}
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "agency_share_name",
                    "shorthand",
                    "amount",
                    "is_mandatory",
                    "remittance_percent",
                    "ceiling_amount",
                    "compensation_links"
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
    if (RowData.compensation_links != null) {
        data.compensation_links = RowData.compensation_links
            .split(",")
            .map((item: string) => item.trim());
    } else data.compensation_links = [];

    const [baseItems, setBaseItems] = useState<Array<string>>([
        ...compensationTypes,
    ]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([
        ...data.compensation_links,
    ]);
    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        if (data.amount > 0) {
            setSelected("Fixed");
        } else if (data.remittance_percent > 0 && data.ceiling_amount > 0) {
            setSelected("Remittance");
        }
    }, []);

    return (
        <form onSubmit={submit} className="h-full">
            <Tabs defaultValue="Properties" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="Properties">Properties</TabsTrigger>
                    <TabsTrigger value="Links">Compensation Links</TabsTrigger>
                </TabsList>
                <TabsContent value="Properties">
                    <GovernmentShareStore
                        selected={selected}
                        setSelected={setSelected}
                        errors={errors}
                        data={data}
                        setData={setData}
                    ></GovernmentShareStore>
                </TabsContent>
                <TabsContent value="Links">
                    <IncludeExcludeBox
                        baseItems={baseItems}
                        selectedItems={selectedItems}
                        setBaseItems={setBaseItems}
                        setSelectedItems={setSelectedItems}
                        selectedItemsName="Compensation Links"
                        baseItemsName="Compensation Types"
                        className="h-[230px]"
                    />
                </TabsContent>
            </Tabs>
            <ConfirmCancelButton
                processing={processing}
                setOpenDialog={setOpenDialog}
            />
        </form>
    );
}

export function AgencyShareDelete({
    rowId,
    setOpenDialog,
}: {
    rowId: number | undefined;
    setOpenDialog: any;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("delete.governmentshare", rowId), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Government Share Profile has been succesfully
                                deleted.
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
