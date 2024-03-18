import { type Service } from "@/lib/db/schema/services";
import { type Unit, type CompleteUnit } from "@/lib/db/schema/units";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Unit>) => void;

export const useOptimisticUnits = (
  units: CompleteUnit[],
  services: Service[]
) => {
  const [optimisticUnits, addOptimisticUnit] = useOptimistic(
    units,
    (
      currentState: CompleteUnit[],
      action: OptimisticAction<Unit>,
    ): CompleteUnit[] => {
      const { data } = action;

      const optimisticService = services.find(
        (service) => service.id === data.serviceId,
      )!;

      const optimisticUnit = {
        ...data,
        service: optimisticService,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticUnit]
            : [...currentState, optimisticUnit];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticUnit } : item,
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

  return { addOptimisticUnit, optimisticUnits };
};
