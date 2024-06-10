"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "@/modules/shared/Modal";
import { testCategoryData } from "@/schema/testcategory";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import React, { useState } from "react";
import TemplateAdd from "../../../../../components/TemplateAdd";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}
export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [openReportTemplateEditor, setOpenReportTemplateEditor] =
    useState(false);

  const testRow = testCategoryData.parse(row.original);

  const templateditEligibility = testRow.parentTestCategoryId;
  const templateReportTobefilled = testRow.patientReport;

  const nullConvert = templateReportTobefilled === null ? "" : templateReportTobefilled
  // const parentIdAndReportYettobeFilled = templateeditEligibility || templateReportTobefilled

  return (
    <>
      {/* set a modal for editting the patient test report */}
      <Modal
        open={openReportTemplateEditor}
        setOpen={setOpenReportTemplateEditor}
        title={templateReportTobefilled ? "Edit" : "Add"}
      >
        <TemplateAdd id={testRow.id} reportTemplate={nullConvert} />
      </Modal>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=openReschedule]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="hover:cursor-pointer flex justify-center"
            disabled={!templateditEligibility}
            onClick={() => setOpenReportTemplateEditor(true)}
          >
            {templateditEligibility ? (
              templateReportTobefilled ? (
                <div onClick={() => setOpenReportTemplateEditor(true)}>
                  Yes (Edit)
                </div>
              ) : (
                <div onClick={() => setOpenReportTemplateEditor(true)}>
                  Yes (Add)
                </div>
              )
            ) : (
              <div className="">No Parent ID so it cannot be filled</div>
            )}
          </DropdownMenuItem>
          {/* <Button disabled={!templateditEligibility} onClick={() => setOpenReportTemplateEditor(true)}>
            {templateditEligibility
              ? templateReportTobefilled
                ? "Edit"
                : "Add"
              : "No Parent ID so it cannot be filled"}
          </Button> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
