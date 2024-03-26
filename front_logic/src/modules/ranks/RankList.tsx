"use client";
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Modal from "../shared/Modal";
// import { useOptimisticRanks } from "@/app/(app)/ranks/useOptimisticRanks";
import { Button } from "@/components/ui/button";
// import RankForm from "./RankForm";
import { PlusIcon } from "lucide-react";

import { ServiceData } from "@/schema/services";
import RankForm from "./RankForm";
import { RankData } from "@/schema/ranks";
import { deleteRankAction } from "@/server_actions/actions/ranks";

type TOpenModal = (rank?: RankData) => void;
export default function RankList({
  ranks,
  services,
  serviceId,
}: {
  ranks: RankData[];
  services: ServiceData[];
  serviceId?: number;
}) {
  const [open, setOpen] = useState(false);
  const [activeRank, setActiveRank] = useState<RankData | null>(null);
  const openModal = (rank?: RankData) => {
    setOpen(true);
    rank && setActiveRank(rank);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeRank ? "Edit Rank" : "Add Rank"}
      >
        <div>
          <RankForm
            rank={activeRank}
            closeModal={closeModal}
            openModal={openModal}
            services={services}
            serviceId={serviceId}
          />
        </div>
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {ranks.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {ranks.map((rank) => (
            <Rank rank={rank} key={rank.id} openModal={openModal} />
          ))}
        </ul>
      )}
    </div>
  );
}

//Displaying Individual Rank Component
const Rank = ({
  rank,
  openModal,
}: {
  rank: RankData;
  openModal: TOpenModal;
}) => {
  const pathname = usePathname();
  const basePath = pathname.includes("ranks") ? pathname : pathname + "/ranks/";

  return (
    <li className={cn("flex justify-between my-2")}>
      <div className="w-full">
        <div>{rank.name}</div>
      </div>
      <div className="flex gap-2 mr-5">
        <Button variant={"link"} asChild>
          <Link href={basePath + "/" + rank.id}>Edit</Link>
        </Button>
        <Button onClick={()=> deleteRankAction(rank.id)} variant={"destructive"}>Delete</Button>
      </div>
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
          <PlusIcon className="h-4" /> New Ranks{" "}
        </Button>
      </div>
    </div>
  );
};
