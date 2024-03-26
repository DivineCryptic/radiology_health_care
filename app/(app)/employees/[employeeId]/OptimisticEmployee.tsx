"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/employees/useOptimisticEmployees";
import { type Employee } from "@/lib/db/schema/employees";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { type Service, type ServiceId } from "@/lib/db/schema/services";
import { type Rank, type RankId } from "@/lib/db/schema/ranks";
import { type Unit, type UnitId } from "@/lib/db/schema/units";

export default function OptimisticEmployee({ 
  employee,
  services,
  serviceId,
  ranks,
  rankId,
  units,
  unitId 
}: { 
  employee: Employee; 
  
  services: Service[];
  serviceId?: ServiceId
  ranks: Rank[];
  rankId?: RankId
  units: Unit[];
  unitId?: UnitId
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Employee) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticEmployee, setOptimisticEmployee] = useOptimistic(employee);
  const updateEmployee: TAddOptimistic = (input) =>
    setOptimisticEmployee({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <EmployeeForm
          employee={optimisticEmployee}
          services={services}
        serviceId={serviceId}
        ranks={ranks}
        rankId={rankId}
        units={units}
        unitId={unitId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateEmployee}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticEmployee.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticEmployee.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticEmployee, null, 2)}
      </pre>
    </div>
  );
}
