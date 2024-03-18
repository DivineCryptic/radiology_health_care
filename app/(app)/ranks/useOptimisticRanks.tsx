import { type Service } from "@/lib/db/schema/services";
import { type Rank, type CompleteRank } from "@/lib/db/schema/ranks";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Rank>) => void;

export const useOptimisticRanks = (
  ranks: CompleteRank[],
  services: Service[]
) => {
  const [optimisticRanks, addOptimisticRank] = useOptimistic(
    ranks,
    (
      currentState: CompleteRank[],
      action: OptimisticAction<Rank>,
    ): CompleteRank[] => {
      const { data } = action;

      const optimisticService = services.find(
        (service) => service.id === data.serviceId,
      )!;

      const optimisticRank = {
        ...data,
        service: optimisticService,
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticRank]
            : [...currentState, optimisticRank];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticRank } : item,
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

  return { addOptimisticRank, optimisticRanks };
};
