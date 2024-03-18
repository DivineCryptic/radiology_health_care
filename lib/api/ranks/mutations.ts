import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  RankId, 
  NewRankParams,
  UpdateRankParams, 
  updateRankSchema,
  insertRankSchema, 
  ranks,
  rankIdSchema 
} from "@/lib/db/schema/ranks";

export const createRank = async (rank: NewRankParams) => {
  const newRank = insertRankSchema.parse(rank);
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
  const { id: rankId } = rankIdSchema.parse({ id });
  const newRank = updateRankSchema.parse(rank);
  try {
    await db
     .update(ranks)
     .set(newRank)
     .where(eq(ranks.id, rankId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRank = async (id: RankId) => {
  const { id: rankId } = rankIdSchema.parse({ id });
  try {
    await db.delete(ranks).where(eq(ranks.id, rankId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

