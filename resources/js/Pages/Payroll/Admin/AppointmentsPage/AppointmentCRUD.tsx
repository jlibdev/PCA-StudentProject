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
    compensationTypes: Array<string>;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        appointment_type: "",
        has_mandatory_deduction: false,
        basic_pay_type: "",
        tax_type: "",
    });

    const changeTaxType = (value: string) => {
        data.tax_type = value;
    };
    const changeBasicPayType = (value: string) => {
        data.basic_pay_type = value;
    };
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
                                Appointment Type {data.appointment_type} has
                                been added!
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "appointment_type",
                    "has_mandatory_deduction",
                    "basic_pay_type",
                    "tax_type"
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
        <div>
            <form onSubmit={submit} className="gap-4 flex flex-col">
                <div>
                    <Label
                        htmlFor="appointment_type"
                        className={errors.appointment_type && "text-red-600"}
                    >
                        Appointment Type Name
                    </Label>
                    <Input
                        min={0}
                        id="appointment_type"
                        type="text"
                        name="appointment_type"
                        value={data.appointment_type}
                        onChange={(e) =>
                            setData(
                                "appointment_type",
                                e.target.value.toLocaleUpperCase()
                            )
                        }
                    />
                    <InputError
                        message={errors.appointment_type}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="basic_pay_type"
                        className={errors.basic_pay_type && "text-red-600"}
                    >
                        Basic Pay Type
                    </Label>
                    <Select onValueChange={changeBasicPayType}>
                        <SelectTrigger>
                            <SelectValue placeholder="SELECT BASIC PAY TYPE" />
                        </SelectTrigger>
                        <SelectContent>
                            {compensationTypes.map((type) => (
                                <SelectItem value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError
                        message={errors.basic_pay_type}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="tax_type"
                        className={errors.tax_type && "text-red-600"}
                    >
                        Tax Type
                    </Label>

                    <Select onValueChange={changeTaxType}>
                        <SelectTrigger>
                            <SelectValue placeholder="SELECT TAX TYPE" />
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
                    <InputError message={errors.tax_type} className="mt-2" />
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
        appointment_type: RowData.appointment_type,
        has_mandatory_deduction: RowData.has_mandatory_deduction,
        basic_pay_type: RowData.basic_pay_type,
        tax_type: RowData.tax_type,
    });

    const changeTaxType = (value: string) => {
        data.tax_type = value;
    };
    const changeBasicPayType = (value: string) => {
        data.basic_pay_type = value;
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
                        className={errors.basic_pay_type && "text-red-600"}
                    >
                        Basic Pay Type
                    </Label>
                    <Select onValueChange={changeBasicPayType}>
                        <SelectTrigger>
                            <SelectValue placeholder={data.basic_pay_type} />
                        </SelectTrigger>
                        <SelectContent>
                            {compensationTypes.map((type) => (
                                <SelectItem value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError
                        message={errors.basic_pay_type}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="tax_type"
                        className={errors.tax_type && "text-red-600"}
                    >
                        Tax Type
                    </Label>

                    <Select onValueChange={changeTaxType}>
                        <SelectTrigger>
                            <SelectValue placeholder={data.tax_type} />
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
                    <InputError message={errors.tax_type} className="mt-2" />
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
