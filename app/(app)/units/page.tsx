import { Suspense } from "react";

import Loading from "@/app/loading";
import UnitList from "@/components/units/UnitList";
import { getUnits } from "@/lib/api/units/queries";
import { getServices } from "@/lib/api/services/queries";
import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

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
  await checkAuth();

  const { units } = await getUnits();
  const { services } = await getServices();
  return (
    <Suspense fallback={<Loading />}>
      <UnitList units={units} services={services} />
    </Suspense>
  );
};
