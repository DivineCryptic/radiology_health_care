import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type UnitId, unitIdSchema, units } from "@/lib/db/schema/units";
import { services } from "@/lib/db/schema/services";

export const getUnits = async () => {
  const rows = await db.select({ unit: units, service: services }).from(units).leftJoin(services, eq(units.serviceId, services.id));
  const u = rows .map((r) => ({ ...r.unit, service: r.service})); 
  return { units: u };
};

export const getUnitById = async (id: UnitId) => {
  const { id: unitId } = unitIdSchema.parse({ id });
  const [row] = await db.select({ unit: units, service: services }).from(units).where(eq(units.id, unitId)).leftJoin(services, eq(units.serviceId, services.id));
  if (row === undefined) return {};
  const u =  { ...row.unit, service: row.service } ;
  return { unit: u };
};


