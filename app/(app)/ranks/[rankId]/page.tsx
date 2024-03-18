import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getRankById } from "@/lib/api/ranks/queries";
import { getServices } from "@/lib/api/services/queries";import OptimisticRank from "@/app/(app)/ranks/[rankId]/OptimisticRank";
import { checkAuth } from "@/lib/auth/utils";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function RankPage({
  params,
}: {
  params: { rankId: string };
}) {

  return (
    <main className="overflow-auto">
      <Rank id={params.rankId} />
    </main>
  );
}

const Rank = async ({ id }: { id: string }) => {
  await checkAuth();

  const { rank } = await getRankById(id);
  const { services } = await getServices();

  if (!rank) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="ranks" />
        <OptimisticRank rank={rank} services={services} />
      </div>
    </Suspense>
  );
};
