import Loading from '@/app/loading';
import RanksList from '@/modules/ranks/RanksList';
import { getRanks } from '@/server_actions/(get-requests)/getRanks';
import { getServices } from '@/server_actions/(get-requests)/getServices';
import React from 'react'
import { Suspense } from "react";


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
  console.log(ranks)
  // const { services } = await getServices();
  return (
    <Suspense fallback={<Loading />}>

      {/* getting the data for the services and ranks for and displaying it in the form a table for the ranks */}
      {/* <RankList ranks={ranks} services={services} /> */}
      <h1>Services and Ranks</h1>
      <RanksList ranks={ranks} services={services} />
     
    </Suspense>
  );
};
