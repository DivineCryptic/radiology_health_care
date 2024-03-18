import { getRankById, getRanks } from "@/lib/api/ranks/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  rankIdSchema,
  insertRankParams,
  updateRankParams,
} from "@/lib/db/schema/ranks";
import { createRank, deleteRank, updateRank } from "@/lib/api/ranks/mutations";

export const ranksRouter = router({
  getRanks: publicProcedure.query(async () => {
    return getRanks();
  }),
  getRankById: publicProcedure.input(rankIdSchema).query(async ({ input }) => {
    return getRankById(input.id);
  }),
  createRank: publicProcedure
    .input(insertRankParams)
    .mutation(async ({ input }) => {
      return createRank(input);
    }),
  updateRank: publicProcedure
    .input(updateRankParams)
    .mutation(async ({ input }) => {
      return updateRank(input.id, input);
    }),
  deleteRank: publicProcedure
    .input(rankIdSchema)
    .mutation(async ({ input }) => {
      return deleteRank(input.id);
    }),
});
