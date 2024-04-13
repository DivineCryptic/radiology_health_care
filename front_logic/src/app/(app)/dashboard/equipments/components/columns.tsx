"use client";

import { Button } from "@/components/ui/button";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { EquipmentsData } from "@/schema/equipments";
import { deleteEquipmentAction } from "@/server_actions/actions/equipments";
import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<EquipmentsData>[] = [
  // (alias) type EquipmentsData = {
  //     id: number;
  //     name: string;
  //     roomId: number;
  // }
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
    accessorKey : "name",
    header: () => (
      <div className="flex justify-center">
        <h1>Name</h1>
      </div>
    ),
    cell: (info) => {
      return <div className="flex justify-center">{info.row.original.name}</div>;
    },
  },
  {
    //need to be change
    accessorKey: "roomId",
    header: () => (
      <div className="flex justify-center">
        <h1>Room Id</h1>
      </div>
    ),
    cell: (info) => {
      return <div className="flex justify-center">{info.row.original.roomId}</div>;
    },
  }
  ,
  {
    accessorKey: "actions",
    header: () => (
      <div className="flex justify-center ">
        <h1>Actions</h1>
      </div>
    ),
    cell: ({ row }) => {
      // const pathname = usePathname();
      // const basePath = pathname.includes("equipments")
      //   ? pathname
      //   : pathname + "/patient-tests/";
        const basepath=Pathname({prop:"equipments"});

        const equipment = row.original;

        return (
            <div className="flex flex-row justify-center">
                <EditButton prop={{id:equipment.id}} basePath={basepath}/>
                <Button 
                    onClick={() => deleteEquipmentAction(equipment.id)}
                    variant={"destructive"}
                >
                    Delete
                </Button>
            </div>
        )
    },
  },
];
