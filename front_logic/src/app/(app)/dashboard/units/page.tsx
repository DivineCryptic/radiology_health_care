import Loading from "@/app/loading";
import { ServiceData } from "@/schema/services";
import { TransformUnitData, UnitData } from "@/schema/units";
import { getServices } from "@/server_actions/(get-requests)/getServices";
import { getUnits } from "@/server_actions/(get-requests)/getUnits";
import React from "react";
import { Suspense } from "react";
import UnitList from "./components/UnitList";

export default async function UnitsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Units</h1>
        </div>
        <Units />
      </div>
    </main>
  );
}

const Units = async () => {
  const units = await getUnits();
  const services = await getServices();
  const serviceMap = new Map<number, string>(
    services.map((service: ServiceData) => [service.id, service.name])
  );

  const transformUnit = (
    unit: UnitData,
    serviceMap: Map<number, string>
  ): TransformUnitData => {
    const transformedUnit: TransformUnitData = {
      ...unit,
      empServiceName: serviceMap.get(unit.empServiceId) || "",
    };
    delete transformedUnit.empServiceId;

    return transformedUnit;
  };

  const transformedUnits: TransformUnitData[] = units.map((unit: UnitData) =>
    transformUnit(unit, serviceMap)
  );

  return (
    <Suspense fallback={<Loading />}>
      <UnitList units={transformedUnits} services={services} />
    </Suspense>
  );
};
