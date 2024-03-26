
import { type Service, type CompleteService } from "@/lib/db/schema/services";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Service>) => void;

export const useOptimisticServices = (
  services: CompleteService[],
  
) => {
  const [optimisticServices, addOptimisticService] = useOptimistic(
    services,
    (
      currentState: CompleteService[],
      action: OptimisticAction<Service>,
    ): CompleteService[] => {
      const { data } = action;

      

      const optimisticService = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticService]
            : [...currentState, optimisticService];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticService } : item,
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

  return { addOptimisticService, optimisticServices };
};
