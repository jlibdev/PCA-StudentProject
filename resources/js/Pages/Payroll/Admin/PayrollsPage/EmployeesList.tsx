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
import IncludeExcludeBox from "@/Components/IncludeExcludeBox";

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

function BoxSelection({ base }: { base: any }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            <section className="border border-slate-300 rounded-sm p-2">
                <section className="flex flex-col items-center">
                    <Label>Applied Compensations</Label>
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
                                            key={item.compensation_code}
                                            onDoubleClick={() =>
                                                (base = base.filter(
                                                    (itembase) =>
                                                        itembase != item
                                                ))
                                            }
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
                    <Label>Compensations</Label>
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
                                        <CommandItem>{item.name}</CommandItem>
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
    const [baseItems, setBaseItems] = useState<Array<string>>([]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
    const [selectedName, setSelectedName] = useState<String>("");
    const [selectedEmployee, setSelectedEmployee] = useState<
        number | undefined
    >(undefined);
    const [value, setValue] = useState<string>("");
    const [employeeslist, setemployeeslist] = useState<
        Array<EmployeesListTypes>
    >([]);

    const [compensationList, setCompensationList] = useState<Array<any>>([]);

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
        var full_name =
            data.original.first_name + " " + data.original.last_name;
        setSelectedName(full_name);
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
                                Selected: {selectedName}
                            </Label>

                            <section className=" w-full h-[500px] grid grid-rows-2 p-2 gap-5">
                                <div>
                                    <Tabs
                                        defaultValue="compensations"
                                        className="w-full"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="compensations">
                                                Compensations
                                            </TabsTrigger>
                                            <TabsTrigger value="agencyshare">
                                                Agency Share
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="compensations">
                                            <BoxSelection
                                                base={compensationList}
                                            ></BoxSelection>
                                        </TabsContent>
                                        <TabsContent value="agencyshare">
                                            <BoxSelection
                                                base={compensationList}
                                            ></BoxSelection>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                                <div>
                                    <Tabs
                                        defaultValue="deductions"
                                        className="w-full"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="deductions">
                                                Deductions
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="deductions">
                                            <IncludeExcludeBox
                                                baseItems={baseItems}
                                                selectedItems={selectedItems}
                                                setBaseItems={setBaseItems}
                                                setSelectedItems={
                                                    setSelectedItems
                                                }
                                                selectedItemsName="Payroll Deductions"
                                                baseItemsName="Deductions"
                                                className="h-[200px] w-full"
                                            />
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
