import { Suspense } from "react";

import Loading from "@/app/loading";
import RankList from "@/components/ranks/RankList";
import { getRanks } from "@/lib/api/ranks/queries";
import { getServices } from "@/lib/api/services/queries";
import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function RanksPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Ranks</h1>
        </div>
        <Ranks />
      </div>
    </main>
  );
}

const Ranks = async () => {
  await checkAuth();

  const { ranks } = await getRanks();
  const { services } = await getServices();
  return (
    <Suspense fallback={<Loading />}>
      <RankList ranks={ranks} services={services} />
    </Suspense>
  );
};
