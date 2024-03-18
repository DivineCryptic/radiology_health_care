"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Employee, CompleteEmployee } from "@/lib/db/schema/employees";
import Modal from "@/components/shared/Modal";
import { type Service, type ServiceId } from "@/lib/db/schema/services";
import { type Rank, type RankId } from "@/lib/db/schema/ranks";
import { type Unit, type UnitId } from "@/lib/db/schema/units";
import { useOptimisticEmployees } from "@/app/(app)/employees/useOptimisticEmployees";
import { Button } from "@/components/ui/button";
import EmployeeForm from "./EmployeeForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (employee?: Employee) => void;

export default function EmployeeList({
  employees,
  services,
  serviceId,
  ranks,
  rankId,
  units,
  unitId 
}: {
  employees: CompleteEmployee[];
  services: Service[];
  serviceId?: ServiceId;
  ranks: Rank[];
  rankId?: RankId;
  units: Unit[];
  unitId?: UnitId 
}) {
  const { optimisticEmployees, addOptimisticEmployee } = useOptimisticEmployees(
    employees,
    services,
  ranks,
  units 
  );
  const [open, setOpen] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);
  const openModal = (employee?: Employee) => {
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
          employee={activeEmployee}
          addOptimistic={addOptimisticEmployee}
          openModal={openModal}
          closeModal={closeModal}
          services={services}
        serviceId={serviceId}
        ranks={ranks}
        rankId={rankId}
        units={units}
        unitId={unitId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticEmployees.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticEmployees.map((employee) => (
            <Employee
              employee={employee}
              key={employee.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Employee = ({
  employee,
  openModal,
}: {
  employee: CompleteEmployee;
  openModal: TOpenModal;
}) => {
  const optimistic = employee.id === "optimistic";
  const deleting = employee.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("employees")
    ? pathname
    : pathname + "/employees/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{employee.serviceId}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + employee.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No employees
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new employee.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Employees </Button>
      </div>
    </div>
  );
};
