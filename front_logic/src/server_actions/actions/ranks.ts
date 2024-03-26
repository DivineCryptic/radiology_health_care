"use server";
import { InsertRankParams } from "@/schema/ranks";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const ranksUrl = process.env.BACKEND_URL + "/api/ranks";
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

const revalidateRanks = () => revalidatePath("/ranks");

export const createRankAction = async (values: InsertRankParams) => {
  try {
    const response = await axios.post(
      ranksUrl,
      {
        name: values.name,
        empServiceId: values.empServiceId,
      },
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    if (response.status === 201) {
        revalidateRanks();
      return console.log("Ranks added successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};


export const deleteRankAction = async (id: number) => {
  try {
    const response = await axios.delete(
      ranksUrl + "/" + id,
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    if (response.status === 204) {
        revalidateRanks();
      return console.log("Rank deleted successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
}