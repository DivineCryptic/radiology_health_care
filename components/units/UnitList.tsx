"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Unit, CompleteUnit } from "@/lib/db/schema/units";
import Modal from "@/components/shared/Modal";
import { type Service, type ServiceId } from "@/lib/db/schema/services";
import { useOptimisticUnits } from "@/app/(app)/units/useOptimisticUnits";
import { Button } from "@/components/ui/button";
import UnitForm from "./UnitForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (unit?: Unit) => void;

export default function UnitList({
  units,
  services,
  serviceId 
}: {
  units: CompleteUnit[];
  services: Service[];
  serviceId?: ServiceId 
}) {
  const { optimisticUnits, addOptimisticUnit } = useOptimisticUnits(
    units,
    services 
  );
  const [open, setOpen] = useState(false);
  const [activeUnit, setActiveUnit] = useState<Unit | null>(null);
  const openModal = (unit?: Unit) => {
    setOpen(true);
    unit ? setActiveUnit(unit) : setActiveUnit(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeUnit ? "Edit Unit" : "Create Unit"}
      >
        <UnitForm
          unit={activeUnit}
          addOptimistic={addOptimisticUnit}
          openModal={openModal}
          closeModal={closeModal}
          services={services}
        serviceId={serviceId}
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticUnits.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticUnits.map((unit) => (
            <Unit
              unit={unit}
              key={unit.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Unit = ({
  unit,
  openModal,
}: {
  unit: CompleteUnit;
  openModal: TOpenModal;
}) => {
  const optimistic = unit.id === "optimistic";
  const deleting = unit.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("units")
    ? pathname
    : pathname + "/units/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{unit.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + unit.id }>
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
        No units
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new unit.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Units </Button>
      </div>
    </div>
  );
};
