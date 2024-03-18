import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  UnitId, 
  NewUnitParams,
  UpdateUnitParams, 
  updateUnitSchema,
  insertUnitSchema, 
  units,
  unitIdSchema 
} from "@/lib/db/schema/units";

export const createUnit = async (unit: NewUnitParams) => {
  const newUnit = insertUnitSchema.parse(unit);
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
  const { id: unitId } = unitIdSchema.parse({ id });
  const newUnit = updateUnitSchema.parse(unit);
  try {
    await db
     .update(units)
     .set(newUnit)
     .where(eq(units.id, unitId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUnit = async (id: UnitId) => {
  const { id: unitId } = unitIdSchema.parse({ id });
  try {
    await db.delete(units).where(eq(units.id, unitId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

