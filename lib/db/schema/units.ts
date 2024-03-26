import { varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { services } from "./services"
import { type getUnits } from "@/lib/api/units/queries";

import { nanoid } from "@/lib/utils";


export const units = mysqlTable('units', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  serviceId: varchar("service_id", { length: 256 }).references(() => services.id, { onDelete: "cascade" }).notNull()
});


// Schema for units - used to validate API requests
const baseSchema = createSelectSchema(units)

export const insertUnitSchema = createInsertSchema(units);
export const insertUnitParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateUnitSchema = baseSchema;
export const updateUnitParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1)
})
export const unitIdSchema = baseSchema.pick({ id: true });

// Types for units - used to type API request params and within Components
export type Unit = typeof units.$inferSelect;
export type NewUnit = z.infer<typeof insertUnitSchema>;
export type NewUnitParams = z.infer<typeof insertUnitParams>;
export type UpdateUnitParams = z.infer<typeof updateUnitParams>;
export type UnitId = z.infer<typeof unitIdSchema>["id"];
    
// this type infers the return from getUnits() - meaning it will include any joins
export type CompleteUnit = Awaited<ReturnType<typeof getUnits>>["units"][number];

