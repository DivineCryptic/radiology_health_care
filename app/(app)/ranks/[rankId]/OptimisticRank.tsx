"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/ranks/useOptimisticRanks";
import { type Rank } from "@/lib/db/schema/ranks";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import RankForm from "@/components/ranks/RankForm";
import { type Service, type ServiceId } from "@/lib/db/schema/services";

export default function OptimisticRank({ 
  rank,
  services,
  serviceId 
}: { 
  rank: Rank; 
  
  services: Service[];
  serviceId?: ServiceId
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Rank) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticRank, setOptimisticRank] = useOptimistic(rank);
  const updateRank: TAddOptimistic = (input) =>
    setOptimisticRank({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <RankForm
          rank={optimisticRank}
          services={services}
        serviceId={serviceId}
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateRank}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticRank.name}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticRank.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticRank, null, 2)}
      </pre>
    </div>
  );
}
