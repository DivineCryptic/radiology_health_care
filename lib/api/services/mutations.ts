import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ServiceId, 
  NewServiceParams,
  UpdateServiceParams, 
  updateServiceSchema,
  insertServiceSchema, 
  services,
  serviceIdSchema 
} from "@/lib/db/schema/services";
import { getUserAuth } from "@/lib/auth/utils";

export const createService = async (service: NewServiceParams) => {
  const { session } = await getUserAuth();
  const newService = insertServiceSchema.parse({ ...service, userId: session?.user.id! });
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
  const { session } = await getUserAuth();
  const { id: serviceId } = serviceIdSchema.parse({ id });
  const newService = updateServiceSchema.parse({ ...service, userId: session?.user.id! });
  try {
    await db
     .update(services)
     .set(newService)
     .where(and(eq(services.id, serviceId!), eq(services.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteService = async (id: ServiceId) => {
  const { session } = await getUserAuth();
  const { id: serviceId } = serviceIdSchema.parse({ id });
  try {
    await db.delete(services).where(and(eq(services.id, serviceId!), eq(services.userId, session?.user.id!)))
    return {success: true}
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

