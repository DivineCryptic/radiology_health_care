import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  UnitId, 
  NewUnitParams,
  UpdateUnitParams, 
  updateUnitSchema,
  insertUnitSchema, 
  units,
  unitIdSchema 
} from "@/lib/db/schema/units";
import { getUserAuth } from "@/lib/auth/utils";

export const createUnit = async (unit: NewUnitParams) => {
  const { session } = await getUserAuth();
  const newUnit = insertUnitSchema.parse({ ...unit, userId: session?.user.id! });
  try {
    await db.insert(units).values(newUnit)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUnit = async (id: UnitId, unit: UpdateUnitParams) => {
  const { session } = await getUserAuth();
  const { id: unitId } = unitIdSchema.parse({ id });
  const newUnit = updateUnitSchema.parse({ ...unit, userId: session?.user.id! });
  try {
    await db
     .update(units)
     .set(newUnit)
     .where(and(eq(units.id, unitId!), eq(units.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUnit = async (id: UnitId) => {
  const { session } = await getUserAuth();
  const { id: unitId } = unitIdSchema.parse({ id });
  try {
    await db.delete(units).where(and(eq(units.id, unitId!), eq(units.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

