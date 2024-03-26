"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Rank, CompleteRank } from "@/lib/db/schema/ranks";
import Modal from "@/components/shared/Modal";
import { type Service, type ServiceId } from "@/lib/db/schema/services";
import { useOptimisticRanks } from "@/app/(app)/ranks/useOptimisticRanks";
import { Button } from "@/components/ui/button";
import RankForm from "./RankForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (rank?: Rank) => void;

export default function RankList({
  ranks,
  services,
  serviceId 
}: {
  ranks: CompleteRank[];
  services: Service[];
  serviceId?: ServiceId 
}) {
  const { optimisticRanks, addOptimisticRank } = useOptimisticRanks(
    ranks,
    services 
  );
  const [open, setOpen] = useState(false);
  const [activeRank, setActiveRank] = useState<Rank | null>(null);
  const openModal = (rank?: Rank) => {
    setOpen(true);
    rank ? setActiveRank(rank) : setActiveRank(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeRank ? "Edit Rank" : "Create Rank"}
      >
        <RankForm
          rank={activeRank}
          addOptimistic={addOptimisticRank}
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
      {optimisticRanks.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticRanks.map((rank) => (
            <Rank
              rank={rank}
              key={rank.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Rank = ({
  rank,
  openModal,
}: {
  rank: CompleteRank;
  openModal: TOpenModal;
}) => {
  const optimistic = rank.id === "optimistic";
  const deleting = rank.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("ranks")
    ? pathname
    : pathname + "/ranks/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{rank.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + rank.id }>
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
        No ranks
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new rank.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Ranks </Button>
      </div>
    </div>
  );
};
