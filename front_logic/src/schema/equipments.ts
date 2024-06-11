import { z } from "zod";

const equipmentsData = z.object({
  id: z.number(),
  name: z.string(),
  roomId: z.number(),
});

export const formData = z.object({
  name: z.string(),
  roomId: z.string(),
});

const insertEquipParams = equipmentsData.omit({ id: true });
export type InsertEquipmentsParams = z.infer<typeof insertEquipParams>;
export type EquipmentsData = z.infer<typeof equipmentsData>;
export type Equipmentsform = z.infer<typeof formData>;
