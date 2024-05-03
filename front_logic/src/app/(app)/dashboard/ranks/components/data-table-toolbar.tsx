import { ColumnFiltersState, Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { divisions, rankservices } from "../data/data";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";
import NameFilter from "./name-filter";


interface DataTableToolbarProps<TData> {
    table: Table<TData>;
   
  }
  
  export function DataTableToolbar<TData>({
    table,
   
  }:DataTableToolbarProps<TData>){
    const isFiltered = table.getState().columnFilters.length > 0;

    return(
        <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
        <div className="max-w-sm">
        <NameFilter table={table}/>
        </div>

        {table.getColumn("empServiceName") && (
            <DataTableFacetedFilter
              column={table.getColumn("empServiceName")}
              title="Rank Services"
              options={rankservices}
            />
        
        )}

      {table.getColumn("division") && (
            <DataTableFacetedFilter
              column={table.getColumn("division")}
              title="Division"
              options={divisions}
            />
        
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        </div>
        </div>
    )
  }