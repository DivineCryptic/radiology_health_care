"use client";

import { Button } from "@/components/ui/button";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { EquipmentsMappingData } from "@/schema/equipmentmapping";
import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<EquipmentsMappingData>[] = [

    {
        accessorKey: "Index",
        header: () => (
          <div className="flex justify-center">
            <h1>Index</h1>
          </div>
        ),
        cell: (info) => {
          return <div className="flex justify-center">{info.row.index + 1}</div>;
        },
    },
    {
        accessorKey: "dateTime",
        header: () => (
          <div className="flex justify-center">
            <h1>Date Time</h1>
          </div>
        ),
        cell: (info) => {
          return <div className="flex justify-center">{info.row.original.dateTime}</div>;
        },
    },
     {

        accessorKey : "equipmentId",
        header: () => (
          <div className="flex justify-center">
            <h1>Equipment Id</h1>
          </div>
        ),
        cell: (info) => {
          return <div className="flex justify-center">{info.row.original.equipmentId}</div>;
        },
     },
     {
        accessorKey : "employeeId",
        header: () => (
          <div className="flex justify-center">
            <h1>Employee Id</h1>
          </div>
        ),
        cell: (info) => {
          return <div className="flex justify-center">{info.row.original.employeeId}</div>;
        },
     },
     {
        accessorKey: "actions",
        header: () => (
          <div className="flex justify-center">
            <h1>Actions</h1>
          </div>
        ),
        cell: ({ row }) => {
          // const pathname = usePathname();
          // const basePath = pathname.includes("patient-tests")
          //   ? pathname
          //   : pathname + "/patient-tests/";
          const basepath=Pathname({prop:"equipment-mappings"});
          const equipmentMappings=row.original;
    
            return (
                <div className="flex flex-row justify-center">
                    <EditButton prop={{id:equipmentMappings.id}} basePath={basepath}/>
                    <Button 
                        // onClick={() => deletePatientTestsAction(patientTests.id)}
                        variant={"destructive"}
                    >
                        Delete
                    </Button>
                </div>
            )
        },
      },
]