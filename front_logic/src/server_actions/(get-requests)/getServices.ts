import { cookies } from "next/headers";
import axios from "axios";

export const getServices = async () => {
  const servicesUrl = process.env.BACKEND_URL + "/api/emp-services";
  const userAuthToken = cookies().get("authToken")?.value;

  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(servicesUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Services = response.data
  return Services;
};