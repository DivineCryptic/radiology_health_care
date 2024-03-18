import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getEmployeeById } from "@/lib/api/employees/queries";
import { getServices } from "@/lib/api/services/queries";
import { getRanks } from "@/lib/api/ranks/queries";
import { getUnits } from "@/lib/api/units/queries";import OptimisticEmployee from "./OptimisticEmployee";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function EmployeePage({
  params,
}: {
  params: { employeeId: string };
}) {

  return (
    <main className="overflow-auto">
      <Employee id={params.employeeId} />
    </main>
  );
}

const Employee = async ({ id }: { id: string }) => {
  
  const { employee } = await getEmployeeById(id);
  const { services } = await getServices();
  const { ranks } = await getRanks();
  const { units } = await getUnits();

  if (!employee) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="employees" />
        <OptimisticEmployee employee={employee} services={services} ranks={ranks} units={units} />
      </div>
    </Suspense>
  );
};
