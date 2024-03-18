import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ServiceId, serviceIdSchema, services } from "@/lib/db/schema/services";
import { ranks, type CompleteRank } from "@/lib/db/schema/ranks";

export const getServices = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(services).where(eq(services.userId, session?.user.id!));
  const s = rows
  return { services: s };
};

export const getServiceById = async (id: ServiceId) => {
  const { session } = await getUserAuth();
  const { id: serviceId } = serviceIdSchema.parse({ id });
  const [row] = await db.select().from(services).where(and(eq(services.id, serviceId), eq(services.userId, session?.user.id!)));
  if (row === undefined) return {};
  const s = row;
  return { service: s };
};

export const getServiceByIdWithRanks = async (id: ServiceId) => {
  const { session } = await getUserAuth();
  const { id: serviceId } = serviceIdSchema.parse({ id });
  const rows = await db.select({ service: services, rank: ranks }).from(services).where(and(eq(services.id, serviceId), eq(services.userId, session?.user.id!))).leftJoin(ranks, eq(services.id, ranks.serviceId));
  if (rows.length === 0) return {};
  const s = rows[0].service;
  const sr = rows.filter((r) => r.rank !== null).map((r) => r.rank) as CompleteRank[];

  return { service: s, ranks: sr };
};

