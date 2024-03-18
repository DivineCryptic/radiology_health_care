import { varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { services } from "./services"
import { type getRanks } from "@/lib/api/ranks/queries";

import { nanoid } from "@/lib/utils";


export const ranks = mysqlTable('ranks', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  name: varchar("name", { length: 256 }).notNull(),
  serviceId: varchar("service_id", { length: 256 }).references(() => services.id, { onDelete: "cascade" }).notNull(),
  userId: varchar("user_id", { length: 256 }).notNull()
});


// Schema for ranks - used to validate API requests
const baseSchema = createSelectSchema(ranks)

export const insertRankSchema = createInsertSchema(ranks);
export const insertRankParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1)
}).omit({ 
  id: true,
  userId: true
});

export const updateRankSchema = baseSchema;
export const updateRankParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1)
}).omit({ 
  userId: true
});
export const rankIdSchema = baseSchema.pick({ id: true });

// Types for ranks - used to type API request params and within Components
export type Rank = typeof ranks.$inferSelect;
export type NewRank = z.infer<typeof insertRankSchema>;
export type NewRankParams = z.infer<typeof insertRankParams>;
export type UpdateRankParams = z.infer<typeof updateRankParams>;
export type RankId = z.infer<typeof rankIdSchema>["id"];
    
// this type infers the return from getRanks() - meaning it will include any joins
export type CompleteRank = Awaited<ReturnType<typeof getRanks>>["ranks"][number];

