"use client";

import { useState } from "react";
import Modal from "../../../../../modules/shared/Modal";
import { TestCategoryData } from "@/schema/testcategory";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import TestCategoryForm from "./TestCategoryForm";

export type TOpenModal = (testCategories?: TestCategoryData) => void;

export default function TestCategoryList({
  testCategories,
  token
}: {
  token?: string;
  testCategories: TestCategoryData[];
}) {
  const [open, setOpen] = useState(false);
  const [activeTestCategory, setActiveTestCategory] =
    useState<TestCategoryData | null>(null);
  const openModal = (testCategories?: TestCategoryData) => {
    setOpen(true);
   testCategories ? setActiveTestCategory(testCategories) : setActiveTestCategory(null);
  };



  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          activeTestCategory ? "Edit Tests" : "Create Tests"
        }
      >
        <TestCategoryForm authtoken={token} />
      </Modal>
      <div className="absolute right-0 top-0">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      <DataTable columns={columns} data={testCategories} openModal={() => openModal()}/>
    </div>
  );
}
