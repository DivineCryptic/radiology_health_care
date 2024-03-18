import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ServiceId, serviceIdSchema, services } from "@/lib/db/schema/services";
import { ranks, type CompleteRank } from "@/lib/db/schema/ranks";
import { units, type CompleteUnit } from "@/lib/db/schema/units";

export const getServices = async () => {
  const rows = await db.select().from(services);
  const s = rows
  return { services: s };
};

export const getServiceById = async (id: ServiceId) => {
  const { id: serviceId } = serviceIdSchema.parse({ id });
  const [row] = await db.select().from(services).where(eq(services.id, serviceId));
  if (row === undefined) return {};
  const s = row;
  return { service: s };
};

export const getServiceByIdWithRanksAndUnits = async (id: ServiceId) => {
  const { id: serviceId } = serviceIdSchema.parse({ id });
  const rows = await db.select({ service: services, rank: ranks, unit: units }).from(services).where(eq(services.id, serviceId)).leftJoin(ranks, eq(services.id, ranks.serviceId)).leftJoin(units, eq(services.id, units.serviceId));
  if (rows.length === 0) return {};
  const s = rows[0].service;
  const sr = rows.filter((r) => r.rank !== null).map((r) => r.rank) as CompleteRank[];
  const su = rows.filter((r) => r.unit !== null).map((u) => u.unit) as CompleteUnit[];

  return { service: s, ranks: sr, units: su };
};

