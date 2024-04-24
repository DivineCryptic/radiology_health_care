"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { getChildTestCategories } from "@/server_actions/(get-requests)/client/clientside";
import { TestCategoryData } from "@/schema/testcategory";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  //   const [getData, setGetData] = useState<boolean>(false);
  //   const [gotChildrenCategory, setGotChildrenCategory] = useState<
  //   TestCategoryData[]
  // >([]);

  // useEffect(() => {
  //   if (getData === true) {

  //     const fetchCategories = async () => {
  //       const categories = await getChildTestCategories(authtoken);
  //       setGotChildrenCategory(categories);
  //     };
  //     fetchCategories();
  //   }
  // });
  // const formattedOptions :any = gotChildrenCategory.map((category) => ({
  //   label: category.testName,
  //   value: category.id,
  // }));

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Make this into a filter for date  */}
        <Input
          type="date"
          placeholder="Filter Date..."
          value={
            (table.getColumn("startTime")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("startTime")?.setFilterValue(event.target.value);
            localStorage.setItem("selectedDate", event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <div>
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          </div>
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {/* {
          table.getColumn("testCategory") && (
            <DataTableFacetedFilter
              column={table.getColumn("testCategory")}
              title="Category"
              options={formattedOptions}
            />
          )
        } */}
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
      <DataTableViewOptions table={table} />
    </div>
  );
}
