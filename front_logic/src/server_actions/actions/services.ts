"use server";
import { InsertServiceParams } from "@/schema/services";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const servicesUrl = process.env.BACKEND_URL + "/api/emp-services";
const userAuthToken = cookies().get("authToken")?.value;
const bearerToken = `Bearer ${userAuthToken}`;


const handleErrors = (e: unknown) => {
    const errMsg = "Error, please try again.";
    if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
    if (e && typeof e === "object" && "error" in e) {
      const errAsStr = e.error as string;
      return errAsStr.length > 0 ? errAsStr : errMsg;
    }
    return errMsg;
  };

const revalidateRanks = () => revalidatePath("/services");
export const createServiceAction = async (values: InsertServiceParams) => {
    try {
      const response = await axios.post(
        servicesUrl,
        {
          name: values.name,
        },
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      if (response.status === 201) {
          revalidateRanks();
        return console.log("Service added successfully");
      }
    } catch (e) {
      return handleErrors(e);
    }
  };

export const deleteServiceAction = async (id: number) => {
    try {
      const response = await axios.delete(
        servicesUrl + "/" + id,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      if (response.status === 204) {
          revalidateRanks();
        return console.log("Service deleted successfully");
      }
    } catch (e) {
      return handleErrors(e);
    }
  }