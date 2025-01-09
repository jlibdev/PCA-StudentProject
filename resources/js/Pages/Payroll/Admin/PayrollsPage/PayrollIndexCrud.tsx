import ConfirmCancelButton from "@/Components/ConfirmCancelButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useForm } from "@inertiajs/react";
import PayrollProperties from "./PayrollProperties";
import SignatoriesProperty from "./SignatoriesProperties";
import EmployeesList from "./EmployeesList";
import useDatePicker from "@/hooks/use-datepicker";
import { useContext, useState } from "react";

export const PayrollsIndexStore = ({ openDialog }: { openDialog: any }) => {
    const { data, setData, errors, processing } = useForm({});

    // const { checkbox, setCheckbox } = useCheckbox({
    //     datePosted: false,
    //     datePaid: false,
    //     includeMandatory: false,
    // });

    // const { dates, setDate } = useDatePicker({
    //     startingDate: new Date(),
    //     endingDate: new Date(),
    //     datePosted: new Date(),
    //     datePaid: new Date(),
    // });

    return (
        <form action="">
            <Tabs defaultValue="Properties" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="Properties">Properties</TabsTrigger>
                    <TabsTrigger value="Employees">Employees List</TabsTrigger>
                </TabsList>
                <TabsContent value="Properties">
                    <PayrollProperties />
                    <SignatoriesProperty />
                </TabsContent>
                <TabsContent value="Employees">
                    <EmployeesList></EmployeesList>
                </TabsContent>
            </Tabs>
            <ConfirmCancelButton
                processing={processing}
                setOpenDialog={openDialog}
            ></ConfirmCancelButton>
        </form>
    );
};
