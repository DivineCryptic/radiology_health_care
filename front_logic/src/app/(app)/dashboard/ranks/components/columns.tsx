import { Button } from "@/components/ui/button";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { TransformRankData } from "@/schema/ranks";
import { deleteRankAction } from "@/server_actions/actions/ranks";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<TransformRankData>[] = [
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
  { accessorKey: "name", header: "Name" },
  // {
  //   accessorKey: "id",
  //   header: () => (
  //     <div className="flex justify-center invisible md:visible">
  //       <h1>Id</h1>
  //     </div>
  //   ),
  //   cell: (info) => {
  //     return <div className="flex justify-center invisible md:visible">{info.row.original.name}</div>;
  //   },
  // },
  // {
  //   accessorKey: "empServiceName",
  //   header: "Rank Service",
  // },
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
      const basepath=Pathname({prop:"ranks"});

      const rank = row.original;
      return (
        <div className="flex gap-2 justify-center">
          <EditButton prop={{id:rank.id}} basePath={basepath}/>
          <Button
            onClick={() => deleteRankAction(rank.id)}
            variant={"destructive"}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
