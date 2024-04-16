"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/modules/shared/data-table-header-columnn";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { PatientTestsData } from "@/schema/patient-tests";
import { deletePatientTestsAction } from "@/server_actions/actions/patient-tests";
import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<PatientTestsData>[] = [
  {
    accessorKey: "Index",
    header: ({column}) => (
      <DataTableColumnHeader column={column} title="Index"/>
    ),
    cell: ({row}) => <div className="w-[80px]">{row.index + 1}</div>,
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },

    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey : "startTime",
      header: "Start Time"
    }, {
        accessorKey: "endTime",
        header: "End Time"
    },
  // {
  //   accessorKey: "spclInstruction",
  //   header: "Special Instruction",
  // },
  // {
  //   accessorKey: "clinicalNote",
  //   header: "Clinical Note",
  // },
  {
    accessorKey: "patientInfoId",
    //this will be later replaced with the name or will remain the same
    header: "Patient Info Id ",
  },
  {
    accessorKey: "testCategoriesId",
    //this will be later replaced with the name
    header: "Test Categories Id ",
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="flex justify-center ">
        <h1>Actions</h1>
      </div>
    ),
    cell: ({ row }) => {
      // const pathname = usePathname();
      // const basePath = pathname.includes("patient-tests")
      //   ? pathname
      //   : pathname + "/patient-tests/";
        const basepath=Pathname({prop:"patient-tests"});
        const patientTests = row.original;

        return (
            <div>
                {/* <Button variant={"link"} asChild>
                    <Link href={basePath + "/" + patientTests.id}>Edit</Link> 
                </Button> */}
                <EditButton prop={{id:patientTests.id}} basePath={basepath}/>
                <Button 
                    onClick={() => deletePatientTestsAction(patientTests.id)}
                    variant={"destructive"}
                >
                    Delete
                </Button>
            </div>
        )
    },
  },
];
