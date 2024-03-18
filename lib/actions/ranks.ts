"use server";

import { revalidatePath } from "next/cache";
import {
  createRank,
  deleteRank,
  updateRank,
} from "@/lib/api/ranks/mutations";
import {
  RankId,
  NewRankParams,
  UpdateRankParams,
  rankIdSchema,
  insertRankParams,
  updateRankParams,
} from "@/lib/db/schema/ranks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRanks = () => revalidatePath("/ranks");

export const createRankAction = async (input: NewRankParams) => {
  try {
    const payload = insertRankParams.parse(input);
    await createRank(payload);
    revalidateRanks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRankAction = async (input: UpdateRankParams) => {
  try {
    const payload = updateRankParams.parse(input);
    await updateRank(payload.id, payload);
    revalidateRanks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRankAction = async (input: RankId) => {
  try {
    const payload = rankIdSchema.parse({ id: input });
    await deleteRank(payload.id);
    revalidateRanks();
  } catch (e) {
    return handleErrors(e);
  }
};