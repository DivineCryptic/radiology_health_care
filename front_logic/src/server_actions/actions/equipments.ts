"use server";

import { InsertEquipmentsParams } from "@/schema/equipments";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const equipmentsUrl = process.env.BACKEND_URL + "/api/equipment";
const userAuthToken = cookies().get("authToken")?.value;
const bearerToken = `Bearer ${userAuthToken}`;

const handleErrors = (e: unknown) => {
  const errMsg = " Error, Please Try again .";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEquipments = () => revalidatePath("/equipments");

export const createEquipmentAction = async (
  equipment: InsertEquipmentsParams
) => {
  try {
    const response = await axios.post(equipmentsUrl, equipment, {
      headers: {
        Authorization: bearerToken,
      },
    });

    if (response.status === 201) {
      revalidateEquipments();
  
      return console.log("Equipment added successfully");
    }
    console.log(response.data);
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEquipmentAction = async (id: number) => {
  try {
    const response = await axios.delete(equipmentsUrl + "/" + id, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (response.status === 204) {
      revalidateEquipments();
      return console.log("Equipment deleted successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};
