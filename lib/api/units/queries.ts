import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type UnitId, unitIdSchema, units } from "@/lib/db/schema/units";
import { services } from "@/lib/db/schema/services";

export const getUnits = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ unit: units, service: services }).from(units).leftJoin(services, eq(units.serviceId, services.id)).where(eq(units.userId, session?.user.id!));
  const u = rows .map((r) => ({ ...r.unit, service: r.service})); 
  return { units: u };
};

export const getUnitById = async (id: UnitId) => {
  const { session } = await getUserAuth();
  const { id: unitId } = unitIdSchema.parse({ id });
  const [row] = await db.select({ unit: units, service: services }).from(units).where(and(eq(units.id, unitId), eq(units.userId, session?.user.id!))).leftJoin(services, eq(units.serviceId, services.id));
  if (row === undefined) return {};
  const u =  { ...row.unit, service: row.service } ;
  return { unit: u };
};


