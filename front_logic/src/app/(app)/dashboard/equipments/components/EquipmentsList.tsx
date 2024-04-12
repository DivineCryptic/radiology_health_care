"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/modules/shared/Modal";
import { EquipmentsData } from "@/schema/equipments";
import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import EquipmentsForm from "./EquipmentsForm";
import { RoomData } from "@/schema/rooms";

export type TOpenModal = (equipmentsData?: EquipmentsData) => void;

export default function EquipmentsList({
  equipments,
  rooms
}: {
  equipments: EquipmentsData[];
  rooms: RoomData[]
}) {
  const [open, setOpen] = useState(false);
  const [activeEquipments, setActiveEquipments] =
    useState<EquipmentsData | null>(null);

  const openModal = (equipments?: EquipmentsData) => {
    setOpen(true);
    equipments ? setActiveEquipments(equipments) : setActiveEquipments(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeEquipments ? "Edit Equipments" : "Create Equipments"}
      >
        <EquipmentsForm rooms={rooms}/>
      </Modal>

      <div className="absolute right-0 top-0">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={equipments}
        openModal={() => openModal()}
      />
    </div>
  );
}
