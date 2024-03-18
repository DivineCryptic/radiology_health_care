"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Service, CompleteService } from "@/lib/db/schema/services";
import Modal from "@/components/shared/Modal";

import { useOptimisticServices } from "@/app/(app)/services/useOptimisticServices";
import { Button } from "@/components/ui/button";
import ServiceForm from "./ServiceForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (service?: Service) => void;

export default function ServiceList({
  services,
   
}: {
  services: CompleteService[];
   
}) {
  const { optimisticServices, addOptimisticService } = useOptimisticServices(
    services,
     
  );
  const [open, setOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const openModal = (service?: Service) => {
    setOpen(true);
    service ? setActiveService(service) : setActiveService(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeService ? "Edit Service" : "Create Service"}
      >
        <ServiceForm
          service={activeService}
          addOptimistic={addOptimisticService}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticServices.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticServices.map((service) => (
            <Service
              service={service}
              key={service.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Service = ({
  service,
  openModal,
}: {
  service: CompleteService;
  openModal: TOpenModal;
}) => {
  const optimistic = service.id === "optimistic";
  const deleting = service.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("services")
    ? pathname
    : pathname + "/services/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{service.name}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + service.id }>
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
        No services
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new service.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Services </Button>
      </div>
    </div>
  );
};
