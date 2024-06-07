import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RoomData } from "@/schema/rooms";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOpenModal } from "./RoomList";
import { DataTablePagination } from "@/modules/shared/data-table-pagination";



interface DataTableProps<TData,TValues>{
    columns:ColumnDef<TData,TValues>[];
    data:TData[];
    openModal:(room?:RoomData)=>void;

}

export function DataTable<TData,TValues>({
    columns,
    data,
    openModal
}:DataTableProps<TData,TValues>){
    const table=useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
    })

    return(
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup)=>(
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header)=>{
                                    return(
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder?null:flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length?(
                            table.getRowModel().rows.map((row)=>(
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                {row.getVisibleCells().map((cell)=>(
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                                </TableRow>
                            ))
                        ):(
                            <TableRow>
                                <TableCell colSpan={columns.length}className="h-24 text-center">
                                    <EmptyState openModal={openModal}/>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <div className="py-4 px-2">
                    <DataTablePagination table={table}/>
                </div>
            </div>
        </div>
    )
}

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
    return (
      <div className="text-center">
        <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
          No Rooms
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by creating a new room.
        </p>
        <div className="mt-6">
          <Button onClick={() => openModal()}>
            <PlusIcon className="h-4" /> New Room{" "}
          </Button>
        </div>
      </div>
    );
  };
  