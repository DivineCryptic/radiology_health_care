"use client";

import { Button } from "@/components/ui/button";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { RoomData } from "@/schema/rooms";
import { deleteRoomAction } from "@/server_actions/actions/rooms";
import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<RoomData>[] = [
  {
    accessorKey: "Index",
    header: () => (
      <div className="flex justify-center">
        <h1>Index</h1>
      </div>
    ),
    cell: (info) => (
      <div className="flex justify-center">{info.row.index + 1}</div>
    ),
  },
  { accessorKey: "roomNo", header: () => (
    <div className="flex justify-center">
      <h1>Room No.</h1>
    </div>
  ),
cell:(info)=>(
  <div className="flex justify-center">{info.row.original.roomNo}</div>
) },
  {
    accessorKey: "id",
    header: () => (
      <div className="flex justify-center ">
        <h1>Id</h1>
      </div>
    ),
    cell: (info) => (
      <div className="flex justify-center">{info.row.original.id}</div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => {
      return (
        <div className="flex justify-center">
          <h1>Actions</h1>
        </div>
      );
    },
    cell: ({ row }) => {
      // const pathname = usePathname();
      // const basePath = pathname.includes("rooms")
      //   ? pathname
      //   : pathname + "/rooms/";
      const basepath=Pathname({prop:"rooms"});
      const room = row.original;
      return (
        <div className="flex gap-2 justify-center">
          {/* <Button variant={"link"} asChild>
            <Link href={basePath + "/" + room.id}>Edit</Link>
          </Button> */}
          <EditButton prop={{id:room.id}} basePath={basepath}/>
          <Button
            onClick={() => deleteRoomAction(room.id)}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];


