import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import { FormEventHandler } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Switch } from "@/Components/ui/switch";
import { Button } from "@/Components/ui/button";
import ConfirmCancelButton from "@/Components/ConfirmCancelButton";

export function AppointmentStore({
    openDialog,
    compensationTypes,
}: {
    openDialog: any;
    compensationTypes: any;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        type: "",
        compensation_name: "",
        has_mandatory_deduction: false,
    });

    console.log(data);

    const changeBasicPayType = (value: string) => {
        data.type = value;
    };

    // console.log(compensationTypes);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("store.appointment"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Appointment Type {data.type} has been added!
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(); // Clears all form fields
                openDialog(false); // Close the dialog
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
                    { duration: 2000 }
                );
            },
        });
    };

    return (
        <div>
            <form onSubmit={submit} className="gap-4 flex flex-col">
                <div>
                    <Label
                        htmlFor="type"
                        className={errors.type && "text-red-600"}>
                        Appointment Type Name
                    </Label>
                    <Input
                        min={0}
                        id="type"
                        type="text"
                        name="type"
                        value={data.type}
                        onChange={(e) =>
                            setData(
                                "type",
                                e.target.value.toLocaleUpperCase()
                            )
                        }
                    />
                    <InputError
                        message={errors.type}
                        className="mt-2"
                    />
                </div>

                {/* second div */}

        <div>
            <Label
                htmlFor="compensation_code"
                className={errors.compensation_name && "text-red-600"}
                >
                    Compensation Code
                </Label>
                <Select
                    id="compensation_name"
                    // value={data.compensation_code || ""}
                    // onValueChange={(value) => setData("compensation_code", value)}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select a compensation type" />  {/* Placeholder visible when no value is selected */}
                </SelectTrigger>
                <SelectContent>
            {
                compensationTypes.map(compensation_name => {
                    return (  // Add return here
                        <SelectItem onMouseDown={()=> setData("compensation_name" , compensation_name)} key={compensation_name} value={compensation_name}>
                            {compensation_name}
                        </SelectItem>
                    );
                })
            }
        </SelectContent>
    </Select>
    <InputError message={errors.compensation_name} className="mt-2" />

    </div>


                <div className="flex items-center gap-3">
                    <Label htmlFor="has_mandatory_deduction">
                        Mandatory Deduction
                    </Label>
                    <Switch
                        id="has_mandatory_deduction"
                        onCheckedChange={() => {
                            data.has_mandatory_deduction =
                                !data.has_mandatory_deduction;
                        }}
                    />
                </div>
                <ConfirmCancelButton
                    processing={processing}
                    setOpenDialog={openDialog}
                ></ConfirmCancelButton>
            </form>
        </div>
    );
}

export function AppointmentUpdate({
    compensationTypes,
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
    compensationTypes: Array<string>;
}) {
    const { data, put, processing, errors } = useForm({
        type: RowData.type,
        compensation_code: RowData.compensation_code,
        has_mandatory_deduction: RowData.has_mandatory_deduction,
    });

    const changeTaxType = (value: string) => {
        data.type = value;
    };
    const changeBasicPayType = (value: string) => {
        data.type = value;
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("update.appointment", RowData), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Appointment has been succesfully edited.
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
                            <span className="text-base">Error</span>
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
        <div>
            <form onSubmit={submit} className="gap-4 flex flex-col">
                <div>
                    <Label
                        htmlFor="basic_pay_type"
                        className={errors.type && "text-red-600"}
                    >
                        Basic Pay Type
                    </Label>
                    <Select onValueChange={changeBasicPayType}>
                        <SelectTrigger>
                            <SelectValue placeholder={data.type} />
                        </SelectTrigger>
                        <SelectContent>
                            {compensationTypes.map((type) => (
                                <SelectItem value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.type} className="mt-2" />
                </div>

                <div>
                    <Label
                        htmlFor="tax_type"
                        className={errors.type && "text-red-600"}
                    >
                        Tax Type
                    </Label>

                    <Select onValueChange={changeTaxType}>
                        <SelectTrigger>
                            <SelectValue placeholder={data.type} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="WITHHOLDING TAX 1">
                                WITHHOLDING TAX 1
                            </SelectItem>
                            <SelectItem value="WITHHOLDING TAX 2">
                                WITHHOLDING TAX 2
                            </SelectItem>
                            <SelectItem value="BASIC SALARY-REGULAR">
                                WITHHOLDING TAX 3
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <InputError message={errors.type} className="mt-2" />
                </div>

                <div className="flex items-center gap-3">
                    <Label htmlFor="has_mandatory_deduction">
                        Mandatory Deduction
                    </Label>
                    <Switch
                        defaultChecked={data.has_mandatory_deduction}
                        id="has_mandatory_deduction"
                        onCheckedChange={() => {
                            data.has_mandatory_deduction =
                                !data.has_mandatory_deduction;
                        }}
                    />
                </div>
                <div className="flex gap-3 justify-end pl-5">
                    <Button
                        className="mt-5 w-full max-w-32"
                        type="button"
                        onClick={() => setOpenDialog(false)}
                        variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="mt-5 w-full max-w-32"
                        disabled={processing}
                        type="submit"
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </div>
    );
}

export function AppointmentDelete({
    rowId,
    setOpenDialog,
}: {
    rowId: number;
    setOpenDialog: any;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("delete.appointment", rowId), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Succes</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Appointment has been succesfully deleted.
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
