
import axios from "axios";

export const getRanksByServiceId = async (serviceId:number, authToken?:string) => {
  const ranksUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/ranks?empServiceId.equals=" + serviceId;
  const userAuthToken = authToken
  

  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(ranksUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Ranks = response.data
  return Ranks;
};


export const getUnitsByServiceId = async(serviceId:number, authToken?:string) => {
  const unitsUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/units?empServiceId.equals=" + serviceId;
  const userAuthToken = authToken

  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(unitsUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Units = response.data
  return Units;
}