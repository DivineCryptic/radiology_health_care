import Loading from "@/app/loading";

import { getEquipmentMappings } from "@/server_actions/(get-requests)/getEquipmentMappings";
import { Suspense } from "react";
import EquipmentsMappingList from "./components/EquipmentsMappingList";
import { getEquipments } from "@/server_actions/(get-requests)/getEquiments";
import { getEmployees } from "@/server_actions/(get-requests)/getEmployees";

export default async function ServicesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">
            Technician Equipment Mappings
          </h1>
        </div>
        <TeachnicianEquipmentMappings />
      </div>
    </main>
  );
}

const TeachnicianEquipmentMappings = async () => {
  const equipmentMapping = await getEquipmentMappings();

  const equipments = await getEquipments();
  const employees = await getEmployees();

  console.log(equipmentMapping);
  return (
    <Suspense fallback={<Loading />}>
      {/* getting the data and displaying for the technician Equipment Mappings */}

      <EquipmentsMappingList equipmentsMapping={equipmentMapping} equipments={equipments} employees={employees}/>
    </Suspense>
  );
};
