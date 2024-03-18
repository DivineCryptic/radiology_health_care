import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getServiceByIdWithRanks } from "@/lib/api/services/queries";
import OptimisticService from "./OptimisticService";
import { checkAuth } from "@/lib/auth/utils";
import RankList from "@/components/ranks/RankList";

import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function ServicePage({
  params,
}: {
  params: { serviceId: string };
}) {

  return (
    <main className="overflow-auto">
      <Service id={params.serviceId} />
    </main>
  );
}

const Service = async ({ id }: { id: string }) => {
  await checkAuth();

  const { service, ranks } = await getServiceByIdWithRanks(id);
  

  if (!service) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="services" />
        <OptimisticService service={service}  />
      </div>
      <div className="relative mt-8 mx-4">
        <h3 className="text-xl font-medium mb-4">{service.name}&apos;s Ranks</h3>
        <RankList
          services={[]}
          serviceId={service.id}
          ranks={ranks}
        />
      </div>
    </Suspense>
  );
};
