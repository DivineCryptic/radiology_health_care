import { cookies } from "next/headers";
import axios from "axios";




const getRanksCounts = async () => {
  const ranksUrl = process.env.BACKEND_URL + "/api/ranks/count";
  const userAuthToken = cookies().get("authToken")?.value;
  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(ranksUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const RanksCount = response.data
  return RanksCount;
}


export const getRanks = async () => {

  const RanksCount = await getRanksCounts()
  const ranksUrl = process.env.BACKEND_URL + `/api/ranks?page=0&size=${RanksCount}`;
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