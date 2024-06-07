import Loading from "@/app/loading";

import { RankData, TransformRankData } from "@/schema/ranks";
import { ServiceData } from "@/schema/services";

import { getRanks } from "@/server_actions/(get-requests)/getRanks";
import { getServices } from "@/server_actions/(get-requests)/getServices";
import React from "react";
import { Suspense } from "react";
import RankList from "./components/RankList";

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
  //getting the data for the ranks and
  const ranks = await getRanks();
  const services = await getServices();
  const serviceMap = new Map<number, string>(
    services.map((service: ServiceData) => [service.id, service.name])
  );

  const transformRank = (
    rank: RankData,
    serviceMap: Map<number, string>
  ): TransformRankData => {
    const transformedRank: TransformRankData = {
      ...rank,
      empServiceName: serviceMap.get(rank.empServiceId) || "",
    };

    delete transformedRank.empServiceId;

    return transformedRank;
  };

  const transformedRanks: TransformRankData[] = ranks.map((rank: RankData) =>
    transformRank(rank, serviceMap)
  );

  return (
    <Suspense fallback={<Loading />}>
      <div>

      </div>

      {/* <RankList ranks={ranks} services={services} /> */}
      
      <RankList ranks={transformedRanks} services={services} />
    </Suspense>
  );
};
