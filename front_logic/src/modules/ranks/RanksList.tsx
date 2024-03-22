"use client";
import { useState } from "react";
import { CompleteRank, empService, Rank } from "@/appSchemas/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Modal from "../shared/Modal";
// import { useOptimisticRanks } from "@/app/(app)/ranks/useOptimisticRanks";
import { Button } from "@/components/ui/button";
// import RankForm from "./RankForm";
import { PlusIcon } from "lucide-react";

export default function RanksList({
  ranks,
  services,
 
}: {
  ranks: CompleteRank;
  services: empService;

}) {
  const [open, setOpen] = useState(false);
  const [activeRank, setActiveRank] = useState<Rank | null>(null);
  const openModal = (rank?: Rank) => {
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
                <h1>hello</h1>
            </div>
        </Modal>
    </div>
  )
}
