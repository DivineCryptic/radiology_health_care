"use server";

import { revalidatePath } from "next/cache";
import {
  createUnit,
  deleteUnit,
  updateUnit,
} from "@/lib/api/units/mutations";
import {
  UnitId,
  NewUnitParams,
  UpdateUnitParams,
  unitIdSchema,
  insertUnitParams,
  updateUnitParams,
} from "@/lib/db/schema/units";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUnits = () => revalidatePath("/units");

export const createUnitAction = async (input: NewUnitParams) => {
  try {
    const payload = insertUnitParams.parse(input);
    await createUnit(payload);
    revalidateUnits();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUnitAction = async (input: UpdateUnitParams) => {
  try {
    const payload = updateUnitParams.parse(input);
    await updateUnit(payload.id, payload);
    revalidateUnits();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUnitAction = async (input: UnitId) => {
  try {
    const payload = unitIdSchema.parse({ id: input });
    await deleteUnit(payload.id);
    revalidateUnits();
  } catch (e) {
    return handleErrors(e);
  }
};