import { z } from "zod";

export const unitData = z.object({
  id: z.number(),
  name: z.string(),
  empServiceId: z.number(),
});

export const formData = z.object({
  name: z.string(),
  empServiceId: z.string(),
});

const insertUnitParams = unitData.omit({ id: true });

export type InsertUnitParams = z.infer<typeof insertUnitParams>;

export type Unitform = z.infer<typeof formData>;
export type UnitData = z.infer<typeof unitData>;

export type TransformUnitData={
  id:number;
  name:string;
  empServiceId?:number;
  empServiceName:string;
};