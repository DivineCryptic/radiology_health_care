"use client";

import { Button } from "@/components/ui/button";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { ServiceData } from "@/schema/services";
import { deleteServiceAction } from "@/server_actions/actions/services";
import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<ServiceData>[] = [
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
    accessorKey: "id",
    header: () => (
      <div className="flex md:w-32 justify-center invisible md:visible">
        <h1>Id</h1>
      </div>
    ),
    cell: (info) => {
      return <div className="flex md:w-32 justify-center space-x-4 invisible md:visible">{info.row.original.id}</div>;
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
      // const basePath = pathname.includes("services")
      //   ? pathname
      //   : pathname + "/services/";
      const basepath=Pathname({prop:"services"});

      const service = row.original;
      return (
        <div className="flex gap-2 justify-center">
          {/* <Button variant={"link"} asChild>
            <Link href={basePath + "/" + service.id}>Edit</Link>
          </Button> */}
          <EditButton prop={{id:service.id}} basePath={basepath}/>
          <Button
            onClick={() => deleteServiceAction(service.id)}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
