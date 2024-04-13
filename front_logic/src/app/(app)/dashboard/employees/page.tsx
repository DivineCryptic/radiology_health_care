import Loading from "@/app/loading";

import { getEmployees } from "@/server_actions/(get-requests)/getEmployees";

import { getRanks } from "@/server_actions/(get-requests)/getRanks";
import { getServices } from "@/server_actions/(get-requests)/getServices";
import { getUnits } from "@/server_actions/(get-requests)/getUnits";
import React, { Suspense } from "react";
import EmployeeList from "./components/EmployeeList";

import { ServiceData } from "@/schema/services";
import { RankData } from "@/schema/ranks";
import { UnitData } from "@/schema/units";
import { EmployeeData, TransformEmployeeData } from "@/schema/employees";

import { userAuthToken } from "@/server_actions/utils/getcookies";

const EmployeesPage = () => {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Employees</h1>
        </div>
        <Employees />
      </div>
    </main>
  );
};

export default EmployeesPage;

const Employees = async () => {
  const employees = await getEmployees();
  const services = await getServices();
  const ranks = await getRanks();
  const units = await getUnits();

  const serviceMap = new Map<number, string>(
    services.map((service: ServiceData) => [service.id, service.name])
  );

  const rankMap = new Map<number, string>(
    ranks.map((rank: RankData) => [rank.id, rank.name])
  );

  const unitMap = new Map<number, string>(
    units.map((unit: UnitData) => [unit.id, unit.name])
  );

  const transformEmployee = (
    employee: EmployeeData,
    serviceMap: Map<number, string>,
    rankMap: Map<number, string>,
    unitMap: Map<number, string>
  ): TransformEmployeeData => {
    // ... Rest of the function logic remains the same ...

    const transformedEmployee: TransformEmployeeData = {
      ...employee,
      empServiceName: serviceMap.get(employee.empServiceId) || "",
      rankName: rankMap.get(employee.rankId) || "",
      unitName: unitMap.get(employee.unitId) || "",
    };
    delete transformedEmployee.empServiceId;
    delete transformedEmployee.rankId;
    delete transformedEmployee.unitId;

    return transformedEmployee;
  };

  const transformedEmployees: TransformEmployeeData[] = employees.map(
    (employee: EmployeeData) =>
      transformEmployee(employee, serviceMap, rankMap, unitMap)
  );

  console.log(transformedEmployees);
  return (
    <Suspense fallback={<Loading />}>
      {/* getting the Transformed data for the services and ranks for and displaying it in the form a table for the ranks */}
      <EmployeeList
        token={userAuthToken }
        employees={transformedEmployees}
        services={services}
        ranks={ranks}
        units={units}
      />
    </Suspense>
  );
};
