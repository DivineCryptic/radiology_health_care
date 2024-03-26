import { getServiceById, getServices } from "@/lib/api/services/queries";
import { publicProcedure, router } from "@/lib/server/trpc";
import {
  serviceIdSchema,
  insertServiceParams,
  updateServiceParams,
} from "@/lib/db/schema/services";
import { createService, deleteService, updateService } from "@/lib/api/services/mutations";

export const servicesRouter = router({
  getServices: publicProcedure.query(async () => {
    return getServices();
  }),
  getServiceById: publicProcedure.input(serviceIdSchema).query(async ({ input }) => {
    return getServiceById(input.id);
  }),
  createService: publicProcedure
    .input(insertServiceParams)
    .mutation(async ({ input }) => {
      return createService(input);
    }),
  updateService: publicProcedure
    .input(updateServiceParams)
    .mutation(async ({ input }) => {
      return updateService(input.id, input);
    }),
  deleteService: publicProcedure
    .input(serviceIdSchema)
    .mutation(async ({ input }) => {
      return deleteService(input.id);
    }),
});
