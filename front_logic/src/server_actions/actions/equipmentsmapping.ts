"use server";

import { InsertEquipmentMappingsParams } from "@/schema/equipmentmapping";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const equipmentsMappingUrl =
  process.env.BACKEND_URL + "/api/technician-equipment-mappings";

const userAuthToken = cookies().get("authToken")?.value;
const bearerToken = `Bearer ${userAuthToken}`;

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEquipmentMapping = () => {
  revalidatePath("/technician-equipment-mappings");
};

export const createEquipmentMappingAction = async (
  equipmentMapping: InsertEquipmentMappingsParams
) => {
  try {
    const response = await axios.post(equipmentsMappingUrl, equipmentMapping, {
      headers: {
        Authorization: bearerToken,
      },
    });

    if (response.status === 201) {
      revalidateEquipmentMapping();

      return console.log("Equipment Mapping added successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEquipmentMappingAction = async (id: number) => {
  try {
    const response = await axios.delete(equipmentsMappingUrl + "/" + id, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (response.status === 204) {
      revalidateEquipmentMapping();
      return console.log("Equipment Mapping deleted successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};
