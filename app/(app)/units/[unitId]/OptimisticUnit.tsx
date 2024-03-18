"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/units/useOptimisticUnits";
import { type Unit } from "@/lib/db/schema/units";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import UnitForm from "@/components/units/UnitForm";
import { type Service, type ServiceId } from "@/lib/db/schema/services";

export default function OptimisticUnit({ 
  unit,
  services,
  serviceId 
}: { 
  unit: Unit; 
  
  services: Service[];
  serviceId?: ServiceId
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Unit) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticUnit, setOptimisticUnit] = useOptimistic(unit);
  const updateUnit: TAddOptimistic = (input) =>
    setOptimisticUnit({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <UnitForm
          unit={optimisticUnit}
          services={services}
        serviceId={serviceId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateUnit}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticUnit.serviceId}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticUnit.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticUnit, null, 2)}
      </pre>
    </div>
  );
}
