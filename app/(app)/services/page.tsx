import { Suspense } from "react";

import Loading from "@/app/loading";
import ServiceList from "@/components/services/ServiceList";
import { getServices } from "@/lib/api/services/queries";

import { checkAuth } from "@/lib/auth/utils";

export const revalidate = 0;

export default async function ServicesPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Services</h1>
        </div>
        <Services />
      </div>
    </main>
  );
}

const Services = async () => {
  await checkAuth();

  const { services } = await getServices();
  
  return (
    <Suspense fallback={<Loading />}>
      <ServiceList services={services}  />
    </Suspense>
  );
};
