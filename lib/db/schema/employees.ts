import { varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { services } from "./services"
import { ranks } from "./ranks"
import { units } from "./units"
import { type getEmployees } from "@/lib/api/employees/queries";

import { nanoid } from "@/lib/utils";


export const employees = mysqlTable('employees', {
  id: varchar("id", { length: 191 }).primaryKey().$defaultFn(() => nanoid()),
  serviceId: varchar("service_id", { length: 256 }).references(() => services.id, { onDelete: "cascade" }).notNull(),
  rankId: varchar("rank_id", { length: 256 }).references(() => ranks.id, { onDelete: "cascade" }).notNull(),
  unitId: varchar("unit_id", { length: 256 }).references(() => units.id, { onDelete: "cascade" }).notNull()
});


// Schema for employees - used to validate API requests
const baseSchema = createSelectSchema(employees)

export const insertEmployeeSchema = createInsertSchema(employees);
export const insertEmployeeParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1),
  rankId: z.coerce.string().min(1),
  unitId: z.coerce.string().min(1)
}).omit({ 
  id: true
});

export const updateEmployeeSchema = baseSchema;
export const updateEmployeeParams = baseSchema.extend({
  serviceId: z.coerce.string().min(1),
  rankId: z.coerce.string().min(1),
  unitId: z.coerce.string().min(1)
})
export const employeeIdSchema = baseSchema.pick({ id: true });

// Types for employees - used to type API request params and within Components
export type Employee = typeof employees.$inferSelect;
export type NewEmployee = z.infer<typeof insertEmployeeSchema>;
export type NewEmployeeParams = z.infer<typeof insertEmployeeParams>;
export type UpdateEmployeeParams = z.infer<typeof updateEmployeeParams>;
export type EmployeeId = z.infer<typeof employeeIdSchema>["id"];
    
// this type infers the return from getEmployees() - meaning it will include any joins
export type CompleteEmployee = Awaited<ReturnType<typeof getEmployees>>["employees"][number];

