import { DatePicker } from "@/Components/DatePicker";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useContext } from "react";
import { PayrollFormDataContext } from "./PayrollsPage";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

const PayrollProperties = () => {
    const { data, setData } = useContext(PayrollFormDataContext);
    return (
        <div className="w-full">
            <section className="w-full grid grid-cols-4 gap-5">
                <section>
                    <Label>Fund Cluster</Label>
                    <Select
                        defaultValue={data.fundCluster}
                        onValueChange={(val) => setData("fundCluster", val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Fund Cluster..."></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="REGULAR AGENCY FUND">
                                REGULARL AGENCY FUND
                            </SelectItem>
                            <SelectItem value="FOREIGN ASSISTED PROJECTS">
                                FOREIGN ASSISTED PROJECTS
                            </SelectItem>
                            <SelectItem value="SPECIAL ACCOUNT - LOCALLY FUNDED / DOMESTIC GRANTS FUND">
                                SPECIAL ACCOUNT - LOCALLY FUNDED / DOMESTIC
                                GRANTS FUND
                            </SelectItem>
                            <SelectItem value="SPECIAL ACCOUNT - FOREIGN ASSISTED / FOREIGN GRANTS FUND">
                                SPECIAL ACCOUNT - FOREIGN ASSISTED / FOREIGN
                                GRANTS FUND
                            </SelectItem>
                            <SelectItem value="INTERNALLY  GENERATED FUNDS">
                                INTERNALLY GENERATED FUNDS
                            </SelectItem>
                            <SelectItem value="BUSINESS GENERATED FUNDS">
                                BUSINESS GENERATED FUNDS
                            </SelectItem>
                            <SelectItem value="TRUST RECEIPTS">
                                TRUST RECEIPTS
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </section>
                <section>
                    <Label>Payroll Type</Label>
                    <Select
                        defaultValue={data.type}
                        onValueChange={(val) => setData("type", val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Type..."></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="REGULAR">GENERAL</SelectItem>
                            <SelectItem value="SEPARATE">SEPARATE</SelectItem>
                            <SelectItem value="HONORARIUM">
                                HONORARIUM
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </section>
                <section>
                    <Label> Payroll Name</Label>
                    <Input
                        onChange={(e) => setData("payrollName", e.target.value)}
                    ></Input>
                </section>
                <section>
                    <Label> Payroll Format</Label>
                    <Select
                        defaultValue={data.payrollFormat}
                        onValueChange={(val) => setData("payrollFormat", val)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Type..."></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="REGULAR">
                                REGULAR EMPLOYEES
                            </SelectItem>
                            <SelectItem value="SEPARATE">
                                FLEXI EMPLOYEES
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </section>

                <section>
                    <Label>Starting Date</Label>
                    <DatePicker
                        dateTag="startingDate"
                        date={data.startingDate}
                        setDate={setData}
                    ></DatePicker>
                </section>
                <section>
                    <Label> Ending Date</Label>
                    <DatePicker
                        dateTag="endingDate"
                        date={data.endingDate}
                        setDate={setData}
                    ></DatePicker>
                </section>
                <section className="flex flex-col gap-2">
                    <section className="flex items-center gap-2">
                        <Checkbox
                            checked={data.isdatePosted}
                            onCheckedChange={(e) => setData("isdatePosted", e)}
                        />
                        <Label>Date Posted</Label>
                    </section>
                    <DatePicker
                        dateTag="datePosted"
                        date={data.datePosted}
                        setDate={setData}
                    ></DatePicker>
                </section>
                <section className="flex flex-col gap-2">
                    <section className="flex items-center gap-2">
                        <Checkbox
                            checked={data.isdatePaid}
                            onCheckedChange={(e) => setData("isdatePaid", e)}
                        />
                        <Label>Date Paid</Label>
                    </section>
                    <DatePicker
                        dateTag="datePaid"
                        date={data.datePaid}
                        setDate={setData}
                    ></DatePicker>
                </section>
                <section className="flex items-center gap-2">
                    <Checkbox
                        checked={data.includeMandatory}
                        onCheckedChange={(e) => setData("includeMandatory", e)}
                    />
                    <Label>Include Mandatory and Other Deductions</Label>
                </section>
            </section>
        </div>
    );
};

export default PayrollProperties;
