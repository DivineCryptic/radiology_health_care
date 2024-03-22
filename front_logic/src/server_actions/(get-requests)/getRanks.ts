import { cookies } from "next/headers";
import axios from "axios";

export const getRanks = async () => {
  const ranksUrl = process.env.BACKEND_URL + "/api/ranks";
  const userAuthToken = cookies().get("authToken")?.value;

  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(ranksUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Ranks = response.data
  return Ranks;
};