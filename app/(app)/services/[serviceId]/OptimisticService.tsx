"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/services/useOptimisticServices";
import { type Service } from "@/lib/db/schema/services";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import ServiceForm from "@/components/services/ServiceForm";


export default function OptimisticService({ 
  service,
   
}: { 
  service: Service; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Service) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticService, setOptimisticService] = useOptimistic(service);
  const updateService: TAddOptimistic = (input) =>
    setOptimisticService({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <ServiceForm
          service={optimisticService}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateService}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticService.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticService.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticService, null, 2)}
      </pre>
    </div>
  );
}
