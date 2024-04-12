"use client";

import { useState } from "react";
import Modal from "../../../../../modules/shared/Modal";

import { Button } from "@/components/ui/button";
import { EmployeeData, TransformEmployeeData } from "@/schema/employees";
import { ServiceData } from "@/schema/services";
import EmployeeForm from "./EmployeeForm";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export type TOpenModal = (employee?: EmployeeData) => void;

export default function EmployeeList({
  token,
  employees,
  services,

}: {
  token?: string;
  employees: TransformEmployeeData[];
  services: ServiceData[];
 
}) {
  const [open, setOpen] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState<EmployeeData | null>(
    null
  );
  const openModal = (employee?: EmployeeData) => {
    setOpen(true);
    employee ? setActiveEmployee(employee) : setActiveEmployee(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeEmployee ? "Edit Employee" : "Create Employee"}
      >
        <EmployeeForm
          authtoken={token}
          employee={activeEmployee}
          services={services}         
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={employees}
        openModal={() => openModal()}
      />
    </div>
  );
}
