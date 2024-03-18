import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EmployeeId, employeeIdSchema, employees } from "@/lib/db/schema/employees";
import { services } from "@/lib/db/schema/services";
import { ranks } from "@/lib/db/schema/ranks";
import { units } from "@/lib/db/schema/units";

export const getEmployees = async () => {
  const rows = await db.select({ employee: employees, service: services, rank: ranks, unit: units }).from(employees).leftJoin(services, eq(employees.serviceId, services.id)).leftJoin(ranks, eq(employees.rankId, ranks.id)).leftJoin(units, eq(employees.unitId, units.id));
  const e = rows .map((r) => ({ ...r.employee, service: r.service, rank: r.rank, unit: r.unit})); 
  return { employees: e };
};

export const getEmployeeById = async (id: EmployeeId) => {
  const { id: employeeId } = employeeIdSchema.parse({ id });
  const [row] = await db.select({ employee: employees, service: services, rank: ranks, unit: units }).from(employees).where(eq(employees.id, employeeId)).leftJoin(services, eq(employees.serviceId, services.id)).leftJoin(ranks, eq(employees.rankId, ranks.id)).leftJoin(units, eq(employees.unitId, units.id));
  if (row === undefined) return {};
  const e =  { ...row.employee, service: row.service, rank: row.rank, unit: row.unit } ;
  return { employee: e };
};


