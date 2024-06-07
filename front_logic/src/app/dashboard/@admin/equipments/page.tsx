import { getEquipments } from '@/server_actions/(get-requests)/getEquiments';
import React from 'react'
import EquipmentsList from './components/EquipmentsList';
import { getRooms } from '@/server_actions/(get-requests)/getRooms';

export default async function EquipPage () {
  return (
    <main>
    <div className="relative">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl my-2">Equipment</h1>
          </div>
          <Equipment/>
        </div>
    </main>
  );
}

const Equipment=async()=>{
    const equipments=await getEquipments();
    const rooms = await getRooms();
    
    console.log(equipments);

    return(
      <div>
        <EquipmentsList equipments={equipments} rooms={rooms} />
      </div>

    )
}

