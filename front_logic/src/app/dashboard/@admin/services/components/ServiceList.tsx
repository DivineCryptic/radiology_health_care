"use client";
import { useState } from "react";



import { Button } from "@/components/ui/button";

import { ServiceData } from "@/schema/services";
import ServiceForm from "./ServiceForm";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import Modal from "@/modules/shared/Modal";

export type TOpenModal = (service?: ServiceData) => void;
export default function ServiceList({ services }: { services: ServiceData[] }) {
  const [open, setOpen] = useState(false);
  const [activeService, setActiveService] = useState<ServiceData | null>(null);
  const openModal = (service?: ServiceData) => {
    setOpen(true);
    service && setActiveService(service);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeService ? "Edit service" : "Add service"}
      >
        <div>
          <ServiceForm
            service={activeService}
            closeModal={closeModal}
            openModal={openModal}
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
        data={services}
        openModal={()=>openModal()}/>
    </div>
  );
}

