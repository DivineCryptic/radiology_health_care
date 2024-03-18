import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getUnitById } from "@/lib/api/units/queries";
import { getServices } from "@/lib/api/services/queries";import OptimisticUnit from "./OptimisticUnit";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function UnitPage({
  params,
}: {
  params: { unitId: string };
}) {

  return (
    <main className="overflow-auto">
      <Unit id={params.unitId} />
    </main>
  );
}

const Unit = async ({ id }: { id: string }) => {
  await checkAuth();

  const { unit } = await getUnitById(id);
  const { services } = await getServices();

  if (!unit) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="units" />
        <OptimisticUnit unit={unit} services={services} />
      </div>
    </Suspense>
  );
};
