"use client";

import { useState } from "react";
import Modal from "../../../../modules/shared/Modal";

import { Button } from "@/components/ui/button";
import { PatientTestsData, TransformPatientTestsData,  } from "@/schema/patient-tests";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import PatientTestsForm from "./PatientTestsForm";
import ButtonModal from "../../../../modules/shared/ButtonModal";
import { TestCategoryData } from "@/schema/testcategory";
import { PatientData } from "@/schema/patients";

export type TOpenModal = (patientTests?: PatientTestsData) => void;

export default function PatientTestsList({
  patientTests,
  tests,
  patients,
}: {
  patientTests: TransformPatientTestsData[];
  tests: TestCategoryData[];
  patients: PatientData[];

}) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <div className="">
  
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          "Add Patient Tests"
        }
        className="sm:max-w-[425px] min-w-[1200px] min-h-[500px] "
      
      >
        <PatientTestsForm patients={patients} tests={tests}  />
      </Modal>
      <div className="flex justify-between pb-5 -mt-10">
        <div></div>
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>

      
      <DataTable
        columns={columns}
        data={patientTests}
        openModal={() => openModal()}
      />
    </div>
  );
}
