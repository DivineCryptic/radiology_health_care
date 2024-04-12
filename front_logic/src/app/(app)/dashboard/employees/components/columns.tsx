"use client";

import { Button } from "@/components/ui/button";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { EmployeeData, TransformEmployeeData } from "@/schema/employees";
import { deleteEmployeeAction } from "@/server_actions/actions/employee";
import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// type EmployeeData = {
//     id: number;
//     name: string;
//     technician: boolean;
//     his: string;
//     serviceNo: string;
//     empServiceId: number;
//     rankId: number;
//     unitId: number;

export const columns: ColumnDef<TransformEmployeeData>[] = [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "technician",
    header: "Technician"
   
  },
  {
    accessorKey: "id",
    header: () => (
      <div className="flex justify-center">
        <h1>Id</h1>
      </div>
    ),
    cell: (info) => {
      return <div className="flex justify-center">{info.row.original.id}</div>;
    },
  },
  {
    accessorKey: "his",
    header: "Health Information Service",
  },
  {
    accessorKey: "serviceNo",
    header: "Service No.",
  },
  {
    accessorKey: "empServiceName",
    header: "Employee Service",
  },
  {
    accessorKey: "rankName",
    header: "Rank",
  },
  {
    accessorKey: "unitName",
    header: "Unit",
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
      // const basePath = pathname.includes("employees")
      //   ? pathname
      //   : pathname + "/employees/";
      const basepath=Pathname({prop:"employees"});
      const employee = row.original;
      return (
        <div className="flex gap-2 justify-center">
          {/* <Button variant={"link"} asChild>
            <Link href={basePath + "/" + employee.id}>Edit</Link>
          </Button> */}
          <EditButton prop={{id:employee.id}} basePath={basepath}/>
          <Button
            onClick={() => deleteEmployeeAction(employee.id)}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
