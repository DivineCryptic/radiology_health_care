"use server";

import { revalidatePath } from "next/cache";
import {
  createService,
  deleteService,
  updateService,
} from "@/lib/api/services/mutations";
import {
  ServiceId,
  NewServiceParams,
  UpdateServiceParams,
  serviceIdSchema,
  insertServiceParams,
  updateServiceParams,
} from "@/lib/db/schema/services";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateServices = () => revalidatePath("/services");

export const createServiceAction = async (input: NewServiceParams) => {
  try {
    const payload = insertServiceParams.parse(input);
    await createService(payload);
    revalidateServices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateServiceAction = async (input: UpdateServiceParams) => {
  try {
    const payload = updateServiceParams.parse(input);
    await updateService(payload.id, payload);
    revalidateServices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteServiceAction = async (input: ServiceId) => {
  try {
    const payload = serviceIdSchema.parse({ id: input });
    await deleteService(payload.id);
    revalidateServices();
  } catch (e) {
    return handleErrors(e);
  }
};