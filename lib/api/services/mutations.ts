import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  ServiceId, 
  NewServiceParams,
  UpdateServiceParams, 
  updateServiceSchema,
  insertServiceSchema, 
  services,
  serviceIdSchema 
} from "@/lib/db/schema/services";

export const createService = async (service: NewServiceParams) => {
  const newService = insertServiceSchema.parse(service);
  try {
    await db.insert(services).values(newService)
    return { success: true }
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateService = async (id: ServiceId, service: UpdateServiceParams) => {
  const { id: serviceId } = serviceIdSchema.parse({ id });
  const newService = updateServiceSchema.parse(service);
  try {
    await db
     .update(services)
     .set(newService)
     .where(eq(services.id, serviceId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteService = async (id: ServiceId) => {
  const { id: serviceId } = serviceIdSchema.parse({ id });
  try {
    await db.delete(services).where(eq(services.id, serviceId!))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

