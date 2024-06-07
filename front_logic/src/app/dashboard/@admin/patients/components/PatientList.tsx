"use client";
import { PatientData } from "@/schema/patients";
import { columns } from "./columns";
import { useState } from "react";
import { DataTable } from "./data-table";
import Modal from "@/modules/shared/Modal";
import { Button } from "@/components/ui/button";
import PatientForm from "./PatientForm";
import { EmployeeData } from "@/schema/employees";

export type TOpenModal = (patient?: PatientData) => void;
export default function PatientList({ patients,employees }: { patients: PatientData[], employees: EmployeeData[] }) {
  const [open, setOpen] = useState(false);

  const [activePatient, setActivePatient] = useState<PatientData | null>(null);
  const openModal = (patient?: PatientData) => {
    setOpen(true);
    patient ? setActivePatient(patient) : setActivePatient(null);
  };

  const closeModal = () => setOpen(false);

  return (
    <div>
        <Modal
        open={open}
        setOpen={setOpen}
        title={activePatient ? "Edit Patient" : "Create Patient"}
      >
        <PatientForm employees={employees} patient={activePatient} openModal={openModal} closeModal={closeModal} />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={patients}
        openModal={() => openModal()}
      />
    </div>
  );
}
