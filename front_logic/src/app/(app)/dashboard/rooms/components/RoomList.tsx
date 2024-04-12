"use client";
import { useState } from "react";

// import { useOptimisticRooms } from "@/app/(app)/Rooms/useOptimisticRooms";
import { Button } from "@/components/ui/button";
// import RoomForm from "./RoomForm";
import { PlusIcon } from "lucide-react";
import { RoomData } from "@/schema/rooms";

import { deleteRoomAction } from "@/server_actions/actions/rooms";
import { Roomform } from "./RoomForm";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Modal from "@/modules/shared/Modal";

export type TOpenModal = (room?: RoomData) => void;
export default function RoomList({ rooms }: { rooms: RoomData[] }) {
  const [open, setOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<RoomData | null>(null);
  const openModal = (room?: RoomData) => {
    setOpen(true);
    room && setActiveRoom(room);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeRoom ? "Edit Room" : "Add Room"}
      >
        <div>
          <Roomform
            room={activeRoom}
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
      <DataTable columns={columns} data={rooms} openModal={() => openModal()} />
    </div>
  );
}
