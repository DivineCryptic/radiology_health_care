"use client";

import { useState } from "react";
import Modal from "../../../../../modules/shared/Modal";

import { Button } from "@/components/ui/button";
import { PatientTestsData } from "@/schema/patient-tests";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import PatientTestsForm from "./PatientTestsForm";

export type TOpenModal = (patientTests?: PatientTestsData) => void;

export default function PatientTestsList({
  patientTests,
}: {
  patientTests: PatientTestsData[];
}) {
  const [open, setOpen] = useState(false);
  const [activePatientTests, setActivePatientTests] =
    useState<PatientTestsData | null>(null);
  const openModal = (patientTests?: PatientTestsData) => {
    setOpen(true);
    patientTests
      ? setActivePatientTests(patientTests)
      : setActivePatientTests(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          activePatientTests ? "Edit Patient Tests" : "Create Patient Tests"
        }
      >
        <PatientTestsForm />
      </Modal>
      <div className="absolute right-0 top-0">
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
