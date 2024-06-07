"use client"
import { Button } from "@/components/ui/button";
import DropDown from "@/modules/shared/DropDown";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { TransformRankData } from "@/schema/ranks";
import { deleteRankAction } from "@/server_actions/actions/ranks";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<TransformRankData>[] = [

  {
    accessorKey: "id",
    header: () => (
      <div className="flex justify-center invisible md:visible">
        <h1>Id</h1>
      </div>
    ),
    cell: (info) => {
      return (
        <div className="flex justify-center invisible md:visible">
          {info.row.original.id}
        </div>
      );
    },
  },
  { accessorKey: "name", header: "Name" },
  {accessorKey:"shortName",header:"Short Name"},
  {accessorKey:"division",header:"Division",
  filterFn: (row, id, value) => {
    return value.includes(row.getValue(id))
  },
  },
  
  {
    accessorKey: "empServiceName",
    header: "Rank Service",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
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
      // const basePath = pathname.includes("ranks")
      //   ? pathname
      //   : pathname + "/ranks/";
      const basepath = Pathname({ prop: "ranks" });

      const rank = row.original;
      return (
        <div className="flex flex-col items-center">
          <DropDown
            name={{ id: rank.id }}
            deletefunc={deleteRankAction}
            basepath={basepath}
          />
        
        </div>
      );
    },
  },
];
