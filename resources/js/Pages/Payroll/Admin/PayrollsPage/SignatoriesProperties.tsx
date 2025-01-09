import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PayrollFormDataContext } from "./PayrollsPage";

const SignatoriesProperty = () => {
    const { data, setData } = useContext(PayrollFormDataContext);

    const [signatories, setSignatories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("admin.get_signatories")
                );
                setSignatories(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="grid grid-cols-3 items-center justify-center m-5">
                <Separator orientation="horizontal"></Separator>
                <Label className="flex justify-center">Signatories</Label>
                <Separator orientation="horizontal"></Separator>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <section className="flex flex-col gap-3">
                    <Label>Payroll Template</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select signatory template"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Sig1">Sig1</SelectItem>
                            <SelectItem value="Sig2">Sig2</SelectItem>
                            <SelectItem value="Sig3">Sig3</SelectItem>
                        </SelectContent>
                    </Select>
                </section>
                <section className="flex flex-col gap-3">
                    <Label>Payslip Template</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select signatory template"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Sig1">Sig1</SelectItem>
                            <SelectItem value="Sig2">Sig2</SelectItem>
                            <SelectItem value="Sig3">Sig3</SelectItem>
                        </SelectContent>
                    </Select>
                </section>

                <section className="grid grid-cols-2">
                    <section className="flex flex-col gap-3 m-2">
                        <Label>Prepared by</Label>
                        <Input></Input>
                        <Separator></Separator>
                        <Label className="flex justify-center">Position</Label>
                    </section>
                    <section className="flex flex-col gap-3 m-2">
                        <Label>Recommending Approval</Label>
                        <Input></Input>
                        <Separator></Separator>
                        <Label className="flex justify-center">Position</Label>
                    </section>
                    <section className="flex flex-col gap-3 m-2">
                        <Label>Certified by</Label>
                        <Input></Input>
                        <Separator></Separator>
                        <Label className="flex justify-center">Position</Label>
                    </section>
                    <section className="flex flex-col gap-3 m-2">
                        <Label>Approved by</Label>
                        <Input></Input>
                        <Separator></Separator>
                        <Label className="flex justify-center">Position</Label>
                    </section>
                </section>

                <section className="grid grid-cols-2">
                    <section className="flex flex-col gap-3 m-2 col-span-2">
                        <Label>Prepared by</Label>
                        <Input></Input>
                        <Separator></Separator>
                        <Label className="flex justify-center">Position</Label>
                    </section>
                </section>
            </div>
        </div>
    );
};

export default SignatoriesProperty;
