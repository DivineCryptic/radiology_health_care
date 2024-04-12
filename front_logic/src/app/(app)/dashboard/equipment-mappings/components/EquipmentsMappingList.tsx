"use client";

import { useState } from "react";
import Modal from "../../../../../modules/shared/Modal";

import { Button } from "@/components/ui/button";
import { PatientTestsData } from "@/schema/patient-tests";
import { EquipmentsMappingData } from "@/schema/equipmentmapping";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import EquipmentsMappingForm from "./EquipmentsMappingForm";

export type TOpenModal = (equipmentMapping?: EquipmentsMappingData) => void;

export default function EquipmentsMappingList({
  equipmentsMapping,
}: {
  equipmentsMapping: EquipmentsMappingData[];
}) {
  const [open, setOpen] = useState(false);
  const [activeEquipmentMapping, setActiveEquipmentMapping] =
    useState<EquipmentsMappingData | null>(null);
  const openModal = (equipmentsMapping?: EquipmentsMappingData) => {
    setOpen(true);
    equipmentsMapping
      ? setActiveEquipmentMapping(equipmentsMapping)
      : setActiveEquipmentMapping(null);
  };
  const closeModal = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={
          activeEquipmentMapping ? "Edit Equipments Map" : "Create Equipments Map"
        }
      >
        <EquipmentsMappingForm  />
      </Modal>
      <div className="absolute right-0 top-0">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      <DataTable columns={columns} data={equipmentsMapping} openModal={openModal}/>
    </div>
  );
}
