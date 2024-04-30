"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TransformedPatientTests } from "@/schema/patient-tests";
import { priorities, statuses } from "../data/data";
import { Pathname } from "@/modules/shared/Pathname";
import {
  deletePatientTestsAction,
  patchPatientTestPriorityAction,
  patchPatientTestsStatusAction,
} from "@/server_actions/actions/patient-tests";
import { format } from "date-fns";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const patientTest = TransformedPatientTests.parse(row.original);

  return (
    <DropdownMenu>
      {/* This is the part of the table that show the additional dropdowns when clicked on the three dots */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log(patientTest.startTime);
            const date = format(
              new Date(patientTest.startTime),
              "yyyy-MM-dd'T'HH:mm"
            );
            console.log(date + ":00.000Z");
          }}
        >
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Select Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={patientTest.status ?? ""}>
              {statuses.map((status) => (
                <DropdownMenuRadioItem
                  onClick={async () => {
                    const date = format(
                      new Date(patientTest.startTime),
                      "yyyy-MM-dd'T'HH:mm"
                    );
                    const statuspayload = {
                      id: patientTest.id,
                      status: status.value,
                      patientInfoId: patientTest.patientInfoId,
                      testCategoriesId: patientTest.testCategoriesId,
                      startTime: date + ":00.000Z",
                    };
                    patchPatientTestsStatusAction(statuspayload);
                  }}
                  key={status.value}
                  value={status.value}
                >
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Select Priority</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={patientTest.priority ?? ""}>
              {priorities.map((priority) => (
                <DropdownMenuRadioItem
                  onClick={async () => {
                    const date = format(
                      new Date(patientTest.startTime),
                      "yyyy-MM-dd'T'HH:mm"
                    );

                    const prioritypayload = {
                      id: patientTest.id,
                      priority: priority.value,
                      patientInfoId: patientTest.patientInfoId,
                      testCategoriesId: patientTest.testCategoriesId,
                      startTime: date + ":00.000Z",
                    };

                    patchPatientTestPriorityAction(prioritypayload);
                  }}
                  key={priority.value}
                  value={priority.value}
                >
                  {priority.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => deletePatientTestsAction(patientTest.id)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
