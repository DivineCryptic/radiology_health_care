"use client";

import DropDown from "@/modules/shared/DropDown";
import { Pathname } from "@/modules/shared/Pathname";
import { TransformEmployeeData } from "@/schema/employees";
import { deleteEmployeeAction } from "@/server_actions/actions/employee";
import { ColumnDef } from "@tanstack/react-table";

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
        <div className="flex flex-col items-center">
          {/* <Button variant={"link"} asChild>
            <Link href={basePath + "/" + employee.id}>Edit</Link>
          </Button> */}
          <DropDown name={{id:employee.id}} deletefunc={deleteEmployeeAction} basepath={basepath}/>
          {/* <EditButton prop={{id:employee.id}} basePath={basepath}/>
          <Button
            onClick={() => deleteEmployeeAction(employee.id)}
            variant={"destructive"}
          >
            Delete
          </Button> */}
        </div>
      );
    },
  },
];
