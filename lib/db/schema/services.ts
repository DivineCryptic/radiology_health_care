import { varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getServices } from "@/lib/api/services/queries";

import { nanoid } from "@/lib/utils";


export const services = mysqlTable('services', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull()
});


// Schema for services - used to validate API requests
const baseSchema = createSelectSchema(services)

export const insertServiceSchema = createInsertSchema(services);
export const insertServiceParams = baseSchema.extend({}).omit({ 
  id: true
});

export const updateServiceSchema = baseSchema;
export const updateServiceParams = baseSchema.extend({})
export const serviceIdSchema = baseSchema.pick({ id: true });

// Types for services - used to type API request params and within Components
export type Service = typeof services.$inferSelect;
export type NewService = z.infer<typeof insertServiceSchema>;
export type NewServiceParams = z.infer<typeof insertServiceParams>;
export type UpdateServiceParams = z.infer<typeof updateServiceParams>;
export type ServiceId = z.infer<typeof serviceIdSchema>["id"];
    
// this type infers the return from getServices() - meaning it will include any joins
export type CompleteService = Awaited<ReturnType<typeof getServices>>["services"][number];

