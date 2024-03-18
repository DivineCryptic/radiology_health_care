import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  RankId, 
  NewRankParams,
  UpdateRankParams, 
  updateRankSchema,
  insertRankSchema, 
  ranks,
  rankIdSchema 
} from "@/lib/db/schema/ranks";
import { getUserAuth } from "@/lib/auth/utils";

export const createRank = async (rank: NewRankParams) => {
  const { session } = await getUserAuth();
  const newRank = insertRankSchema.parse({ ...rank, userId: session?.user.id! });
  try {
    await db.insert(ranks).values(newRank)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRank = async (id: RankId, rank: UpdateRankParams) => {
  const { session } = await getUserAuth();
  const { id: rankId } = rankIdSchema.parse({ id });
  const newRank = updateRankSchema.parse({ ...rank, userId: session?.user.id! });
  try {
    await db
     .update(ranks)
     .set(newRank)
     .where(and(eq(ranks.id, rankId!), eq(ranks.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRank = async (id: RankId) => {
  const { session } = await getUserAuth();
  const { id: rankId } = rankIdSchema.parse({ id });
  try {
    await db.delete(ranks).where(and(eq(ranks.id, rankId!), eq(ranks.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

