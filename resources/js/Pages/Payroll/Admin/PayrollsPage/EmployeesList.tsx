import { EmployeeListComboBox } from "@/Components/ComboBox";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { createContext, useContext, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import axios from "axios";
import { Trash } from "lucide-react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/Components/ui/command";
import { Skeleton } from "@/Components/ui/skeleton";

interface EmployeesListTypes {
    appointment_code: number;
    device_bio_id: string;
    employee_code: number;
    employee_number: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    name_extenstion: string | null;
    position_code: number;
    salary_step: number;
    salary_type: string;
    station_code: number;
}
interface EmployeeListContextTypes {
    employeeslist: EmployeesListTypes[];
    setemployeeslist: React.Dispatch<
        React.SetStateAction<EmployeesListTypes[]>
    >;
}

interface TableContextTypes {
    data: EmployeesListTypes[];
    setData: React.Dispatch<React.SetStateAction<EmployeesListTypes[]>>;
}

const TableContext = createContext<TableContextTypes>({} as TableContextTypes);

const EmployeeListContext = createContext<EmployeeListContextTypes>(
    {} as EmployeeListContextTypes
);

function BoxSelection({
    base,
    setBase,
    applied,
    setApplied,
    baseTitle,
    appliedTitle,
}: {
    base: any;
    setBase: any;
    applied: any;
    setApplied: any;
    baseTitle: string;
    appliedTitle: string;
}) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <section className="border border-slate-300 rounded-sm p-2">
                <section className="flex flex-col items-center">
                    <Label>{appliedTitle}</Label>
                    <section className=" w-full">
                        <Command>
                            <CommandInput
                                placeholder="Type a command or search..."
                                className="border-transparent"
                            />
                            <CommandList className="min-h-28 max-h-28 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-secondaryGreen scrollbar-track-transparent overflow-y-scroll">
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {applied.map((item: any) => (
                                        <CommandItem
                                            className="cursor-pointer"
                                            key={Math.random().toString(36)}
                                            onMouseDown={() => {
                                                setApplied((prev: any) =>
                                                    prev.filter(
                                                        (prevItem: any) =>
                                                            prevItem != item
                                                    )
                                                );
                                                setBase(
                                                    (prev: any) =>
                                                        (prev = [
                                                            ...prev,
                                                            item,
                                                        ].sort((a, b) =>
                                                            a.name.localeCompare(
                                                                b.name
                                                            )
                                                        ))
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </section>
                </section>
            </section>
            <section className="border border-slate-300 rounded-sm p-2">
                <section className="flex flex-col items-center">
                    <Label>{baseTitle}</Label>
                    <section className=" w-full">
                        <Command>
                            <CommandInput
                                placeholder="Type a command or search..."
                                className="border-transparent"
                            />
                            <CommandList className="min-h-28 max-h-28 scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-secondaryGreen scrollbar-track-transparent overflow-y-scroll">
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {base.map((item: any) => (
                                        <CommandItem
                                            className="cursor-pointer"
                                            key={Math.random().toString(36)}
                                            onMouseDown={() => {
                                                setBase((prev: any) =>
                                                    prev.filter(
                                                        (prevItem: any) =>
                                                            prevItem != item
                                                    )
                                                );
                                                setApplied(
                                                    (prev: any) =>
                                                        (prev = [
                                                            ...prev,
                                                            item,
                                                        ].sort((a, b) =>
                                                            a.name.localeCompare(
                                                                b.name
                                                            )
                                                        ))
                                                );
                                            }}
                                        >
                                            {item.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </section>
                </section>
            </section>
        </div>
    );
}

const EmployeesList = () => {
    const [data, setData] = useState<Array<EmployeesListTypes>>([]);
    const [loading, setLoading] = useState(true);
    const [selectedName, setSelectedName] = useState<any>(null);
    const [selectedEmployee, setSelectedEmployee] = useState<
        number | undefined
    >(undefined);
    const [value, setValue] = useState<string>("");
    const [employeeslist, setemployeeslist] = useState<
        Array<EmployeesListTypes>
    >([]);

    const [compensationList, setCompensationList] = useState<Array<any>>([]);

    const [appliedCompensation, setAppliedCompensation] = useState<Array<any>>(
        []
    );

    const [agencyShareTypes, setAgencyShareTypes] = useState<Array<any>>([]);

    const [appliedAgencyShareTypes, setAppliedAgencyShareTypes] = useState<
        Array<any>
    >([]);

    const [deductionTypes, setDeductionTypes] = useState<Array<any>>([]);

    const [appliedDeductionTypes, setAppliedDeductionTypes] = useState<
        Array<any>
    >([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("admin.get_all_deduction_types")
                );
                setDeductionTypes(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("admin.get_all_agency_types")
                );
                setAgencyShareTypes(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("admin.get_all_compensations")
                );
                setCompensationList(response.data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("admin.get_employee_data")
                );
                setemployeeslist(
                    response.data.data.sort(
                        (a: EmployeesListTypes, b: EmployeesListTypes) =>
                            a.first_name.localeCompare(b.first_name)
                    )
                );
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    function handleRowSelect(data: any) {
        setSelectedName(data.original);
    }

    const handleAddButton = async () => {
        setLoading(true); // Start loading
        try {
            const response = await axios.get(
                route("admin.get_employee", selectedEmployee)
            );
            setData((prevData) => [...prevData, response.data.data]); // Append new data
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false); // Stop loading
            setValue("");
            setemployeeslist((prevList) =>
                prevList.filter(
                    (item: EmployeesListTypes) =>
                        item.employee_code !== selectedEmployee
                )
            );
            setSelectedEmployee(undefined);
        }
    };

    return (
        <TableContext.Provider value={{ data, setData }}>
            <EmployeeListContext.Provider
                value={{ employeeslist, setemployeeslist }}
            >
                <div className="flex">
                    <section className="w-full grid grid-cols-2 gap-5 ">
                        <div className="h-full">
                            <section className="flex justify-start my-2 gap-3 ">
                                <EmployeeListComboBox
                                    value={value}
                                    setValue={setValue}
                                    dataset={employeeslist}
                                    setSelectedEmployee={setSelectedEmployee}
                                />
                                <Button
                                    type="button"
                                    onClick={handleAddButton}
                                    disabled={
                                        selectedEmployee != undefined
                                            ? false
                                            : true
                                    }
                                >
                                    Add Employee
                                </Button>
                            </section>
                            <ScrollArea className="h-[500px] border rounded-[10px]">
                                <DataTable
                                    onMouseEnter={handleRowSelect}
                                    table={table}
                                    rowStyle="bg-white"
                                ></DataTable>
                            </ScrollArea>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label className="text-xl my-2">
                                {cn(
                                    "Selected: ",
                                    selectedName &&
                                        selectedName.first_name +
                                            " " +
                                            selectedName.last_name
                                )}
                            </Label>

                            <section className=" w-full h-[500px] grid grid-rows-2 p-2 gap-5">
                                <div>
                                    <Tabs
                                        defaultValue="compensations"
                                        className=" w-full h-full"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="compensations">
                                                Compensations
                                            </TabsTrigger>
                                            <TabsTrigger value="agencyshare">
                                                Agency Share
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent
                                            value="compensations"
                                            className="w-full h-[calc(100%-20%)]"
                                        >
                                            {!selectedName ? (
                                                <div className=" w-full h-full grid grid-cols-2 gap-3">
                                                    <Skeleton className="w-full h-full"></Skeleton>
                                                    <Skeleton className="w-full h-full"></Skeleton>
                                                </div>
                                            ) : (
                                                <>
                                                    <BoxSelection
                                                        base={compensationList}
                                                        setBase={
                                                            setCompensationList
                                                        }
                                                        applied={
                                                            appliedCompensation
                                                        }
                                                        setApplied={
                                                            setAppliedCompensation
                                                        }
                                                        baseTitle="Compensations"
                                                        appliedTitle="Applied Compensations"
                                                    />
                                                </>
                                            )}
                                        </TabsContent>
                                        <TabsContent
                                            value="agencyshare"
                                            className="w-full h-[calc(100%-20%)]"
                                        >
                                            {!selectedName ? (
                                                <div className=" w-full h-full grid grid-cols-2 gap-3">
                                                    <Skeleton className="w-full h-full"></Skeleton>
                                                    <Skeleton className="w-full h-full"></Skeleton>
                                                </div>
                                            ) : (
                                                <>
                                                    <BoxSelection
                                                        base={agencyShareTypes}
                                                        setBase={
                                                            setAgencyShareTypes
                                                        }
                                                        applied={
                                                            appliedAgencyShareTypes
                                                        }
                                                        setApplied={
                                                            setAppliedAgencyShareTypes
                                                        }
                                                        baseTitle="Agency Shares"
                                                        appliedTitle="Applied Agency Shares"
                                                    />
                                                </>
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <div>
                                    <Tabs
                                        defaultValue="deductions"
                                        className=" w-full h-full"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="deductions">
                                                Deductions
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent
                                            value="deductions"
                                            className="w-full h-[calc(100%-20%)]"
                                        >
                                            {!selectedName ? (
                                                <div className=" w-full h-full grid grid-cols-2 gap-3">
                                                    <Skeleton className="w-full h-full"></Skeleton>
                                                    <Skeleton className="w-full h-full"></Skeleton>
                                                </div>
                                            ) : (
                                                <>
                                                    <BoxSelection
                                                        base={deductionTypes}
                                                        setBase={
                                                            setDeductionTypes
                                                        }
                                                        applied={
                                                            appliedDeductionTypes
                                                        }
                                                        setApplied={
                                                            setAppliedDeductionTypes
                                                        }
                                                        baseTitle="Deductions"
                                                        appliedTitle="Applied Deductions"
                                                    />
                                                </>
                                            )}
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </section>
                        </div>
                    </section>
                </div>
            </EmployeeListContext.Provider>
        </TableContext.Provider>
    );
};

export default EmployeesList;

const columns: ColumnDef<EmployeesListTypes>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <p className="cursor-pointer">
                    {cn(row.original.first_name, row.original.last_name)}
                </p>
            );
        },
    },
    {
        accessorKey: "compensations",
        header: "Compensations",
        cell: ({ row }) => {
            const number = Number(row.getValue("compensations"));
            return (
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className="p-0">
                            <p>₱ {number.toLocaleString("en-US")} </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col">
                                <span>Basic Pay : P3,000.00</span>
                                <span>PERA : P2,000.00</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        },
    },
    {
        accessorKey: "deductions",
        header: "Deductions",
        cell: ({ row }) => {
            const number = Number(row.getValue("compensations"));
            return (
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className="p-0">
                            <p>₱ {number.toLocaleString("en-US")} </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col">
                                <span>GSIS_PREMIUM : P3,000.00</span>
                                <span>PEKE : P2,000.00</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        },
    },
    {
        // prevList.filter(
        //     (item: EmployeesListTypes) =>
        //         item.employee_code !== selectedEmployee
        // )
        id: "actions",
        cell: ({ row }) => {
            const { employeeslist, setemployeeslist } =
                useContext(EmployeeListContext);
            const { data, setData } = useContext(TableContext);
            function handleDelete() {
                setemployeeslist(
                    (prevList: any) =>
                        (prevList = [...prevList, row.original].sort((a, b) =>
                            a.first_name.localeCompare(b.first_name)
                        ))
                );
                setData((prevList: any) =>
                    prevList.filter(
                        (item: EmployeesListTypes) => item !== row.original
                    )
                );
            }
            return (
                <div className="justify-end flex items-center pr-5">
                    <Trash
                        color="red"
                        className="hover:cursor-pointer hover:scale-110 active:scale-95"
                        onClick={handleDelete}
                    ></Trash>
                </div>
            );
        },
    },
];
