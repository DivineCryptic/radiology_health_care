import { sql } from "drizzle-orm";
import { varchar, boolean, timestamp, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { services } from "./services"
import { ranks } from "./ranks"
import { units } from "./units"
import { type getEmployees } from "@/lib/api/employees/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const employees = mysqlTable('employees', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  healthInformationService: varchar("health_information_service", { length: 256 }).notNull(),
  serviceId: varchar("service_id", { length: 256 }).references(() => services.id, { onDelete: "cascade" }).notNull(),
  rankId: varchar("rank_id", { length: 256 }).references(() => ranks.id, { onDelete: "cascade" }).notNull(),
  unitId: varchar("unit_id", { length: 256 }).references(() => units.id, { onDelete: "cascade" }).notNull(),
  name: varchar("name", { length: 256 }),
  serviceNo: varchar("service_no", { length: 256 }).notNull(),
  technician: boolean("technician").notNull(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),

});


// Schema for employees - used to validate API requests
const baseSchema = createSelectSchema(employees).omit(timestamps)

export const insertEmployeeSchema = createInsertSchema(employees).omit(timestamps);
export const insertEmployeeParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1),
  rankId: z.coerce.string().min(1),
  unitId: z.coerce.string().min(1),
  technician: z.coerce.boolean()
}).omit({ 
  id: true,
  userId: true
});

export const updateEmployeeSchema = baseSchema;
export const updateEmployeeParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1),
  rankId: z.coerce.string().min(1),
  unitId: z.coerce.string().min(1),
  technician: z.coerce.boolean()
}).omit({ 
  userId: true
});
export const employeeIdSchema = baseSchema.pick({ id: true });

// Types for employees - used to type API request params and within Components
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = z.infer<typeof insertEmployeeSchema>;
export type NewEmployeeParams = z.infer<typeof insertEmployeeParams>;
export type UpdateEmployeeParams = z.infer<typeof updateEmployeeParams>;
export type EmployeeId = z.infer<typeof employeeIdSchema>["id"];
    
// this type infers the return from getEmployees() - meaning it will include any joins
export type CompleteEmployee = Awaited<ReturnType<typeof getEmployees>>["employees"][number];

