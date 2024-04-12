"use client";

import { useState } from "react";
import Modal from "../../../../../modules/shared/Modal";
import { TestCategoryData } from "@/schema/testcategory";
import { Button } from "@/components/ui/button";

export type TOpenModal = (testCategories: TestCategoryData) => void;

export default function TestCategoryList({
  testCategories,
}: {
  testCategories: TestCategoryData[];
}) {
  const [open, setOpen] = useState(false);
  const [activeTestCategory, setActiveTestCategory] =
    useState<TestCategoryData | null>(null);
  const openModal = (testCategories?: TestCategoryData) => {
    setOpen(true);
   testCategories ? setActiveTestCategory(testCategories) : setActiveTestCategory(null);
  };

  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          activeTestCategory ? "Edit Tests" : "Create Tests"
        }
      >
        hello
        {/* <TestCategoryForm /> */}
      </Modal>
      <div className="absolute right-0 top-0">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
    </div>
  );
}
