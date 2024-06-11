"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/modules/shared/data-table-header-columnn";
import DropDown from "@/modules/shared/DropDown";
import { EditButton } from "@/modules/shared/EditButton";
import { Pathname } from "@/modules/shared/Pathname";
import { PatientTestsData, PatientTestsParams } from "@/schema/patient-tests";
import { deletePatientTestsAction } from "@/server_actions/actions/patient-tests";
import { ColumnDef } from "@tanstack/react-table";
import { priorities, statuses } from "../data/data";
import { DataTableRowActions } from "./data-table-row-actions";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

export const columns: ColumnDef<PatientTestsParams>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID " />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "Index",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Index" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.index + 1}</div>,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "patientName",
    //this will be later replaced with the name or will remain the same
    header: "Patient Name",
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      );
      if (!priority) {
        return null;
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
    cell: ({ row }) => {
      const value:string = row.getValue("startTime");
      const valueDate = new Date(value);
      const formattedDate = valueDate.toLocaleString('en', {day: '2-digit',month:"short", hour: '2-digit', minute: '2-digit', hour12: true })
      if (!value) {
        return null;
      }
      return (
        <div>
          <span>{formattedDate}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "recommendedDoctor",
    header: "Recommended Doctor",
    cell: ({ row }) => {
      const value:string = row.getValue("recommendedDoctor");
      if (!value) {
        return null;
      }
      return (
        <div>
          <span>{value}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "endTime",
    header: "End Time",
    cell: ({ row }) => {
      const value:string = row.getValue("endTime");
      const valueDate = new Date(value);
      const formattedDate = valueDate.toLocaleString('en', { hour: '2-digit', minute: '2-digit', hour12: true })
    if (!value) {
        return null;
      }
      return (
        <div> 
          <span>{formattedDate} </span>
        </div>
      )
    }
  },
  // {
  //   accessorKey: "spclInstruction",
  //   header: "Special Instruction",
  // },
  // {
  //   accessorKey: "clinicalNote",
  //   header: "Clinical Note",
  // },

  {
    accessorKey: "testName",
    //this will be later replaced with the name
    header: "Test Name ",
  },
  {
    accessorKey: "actions",
    header: () => (
      <div className="flex justify-center ">
        <h1>Actions</h1>
      </div>
    ),
    cell: ({ row }) => <DataTableRowActions row={row}/>
  },
];
