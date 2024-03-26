"use client";
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Modal from "../shared/Modal";
// import { useOptimisticservices } from "@/app/(app)/services/useOptimisticservices";
import { Button } from "@/components/ui/button";
// import serviceForm from "./serviceForm";
import { PlusIcon } from "lucide-react";
import { ServiceData } from "@/schema/services";
import ServiceForm from "./ServiceForm";
import { deleteServiceAction } from "@/server_actions/actions/services";



type TOpenModal = (service?: ServiceData) => void;
export default function ServiceList({
  services,

}: {

  services: ServiceData[];
  
}) {
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
          <ServiceForm service={activeService} closeModal={closeModal} openModal={openModal} />
        </div>
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {services.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {services.map((service) => (
            <Service service={service} key={service.id} openModal={openModal} />
          ))}
        </ul>
      )}
    </div>
  );
}



//Displaying Individual service Component
const Service = ({
  service,
  openModal,
}: {
  service: ServiceData;
  openModal: TOpenModal;
}) => {


  const pathname = usePathname();
  const basePath = pathname.includes("services") ? pathname : pathname + "/services/";

  return (
    <li
      className={cn(
        "flex justify-between my-2"
      )}
    >
      <div className="w-full">
        <div>{service.name}</div>
      </div>
      <div className="flex gap-2 mr-5">
      <Button variant={"link"} asChild>
        <Link href={basePath + "/" + service.id}>Edit</Link>
      </Button>
      <Button onClick={()=> deleteServiceAction(service.id)} variant={"destructive"}>
        Delete
      </Button>

      </div>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No services
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new service.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New services{" "}
        </Button>
      </div>
    </div>
  );
};
