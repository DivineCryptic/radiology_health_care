import { type Service } from "@/lib/db/schema/services";
import { type Rank } from "@/lib/db/schema/ranks";
import { type Unit } from "@/lib/db/schema/units";
import { type Employee, type CompleteEmployee } from "@/lib/db/schema/employees";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Employee>) => void;

export const useOptimisticEmployees = (
  employees: CompleteEmployee[],
  services: Service[],
  ranks: Rank[],
  units: Unit[]
) => {
  const [optimisticEmployees, addOptimisticEmployee] = useOptimistic(
    employees,
    (
      currentState: CompleteEmployee[],
      action: OptimisticAction<Employee>,
    ): CompleteEmployee[] => {
      const { data } = action;

      const optimisticService = services.find(
        (service) => service.id === data.serviceId,
      )!;

      const optimisticRank = ranks.find(
        (rank) => rank.id === data.rankId,
      )!;

      const optimisticUnit = units.find(
        (unit) => unit.id === data.unitId,
      )!;

      const optimisticEmployee = {
        ...data,
        service: optimisticService,
       rank: optimisticRank,
       unit: optimisticUnit,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticEmployee]
            : [...currentState, optimisticEmployee];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticEmployee } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticEmployee, optimisticEmployees };
};
