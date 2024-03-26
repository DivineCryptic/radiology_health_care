import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type RankId, rankIdSchema, ranks } from "@/lib/db/schema/ranks";
import { services } from "@/lib/db/schema/services";

export const getRanks = async () => {
  const rows = await db.select({ rank: ranks, service: services }).from(ranks).leftJoin(services, eq(ranks.serviceId, services.id));
  const r = rows .map((r) => ({ ...r.rank, service: r.service})); 
  return { ranks: r };
};

export const getRankById = async (id: RankId) => {
  const { id: rankId } = rankIdSchema.parse({ id });
  const [row] = await db.select({ rank: ranks, service: services }).from(ranks).where(eq(ranks.id, rankId)).leftJoin(services, eq(ranks.serviceId, services.id));
  if (row === undefined) return {};
  const r =  { ...row.rank, service: row.service } ;
  return { rank: r };
};


