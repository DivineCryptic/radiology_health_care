"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ServiceData } from "@/schema/services";
import RankForm from "./RankForm";
import { RankData, TransformRankData } from "@/schema/ranks";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Modal from "@/modules/shared/Modal";

export type TOpenModal = (rank?: RankData) => void;
export default function RankList({
  ranks,
  services,
  serviceId,
}: {
  ranks: TransformRankData[];
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
      <DataTable 
        columns={columns}
        data={ranks}
        openModal={() => openModal()}
      />

   
    </div>
  );
}