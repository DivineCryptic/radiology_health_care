import { cookies } from "next/headers";
import axios from "axios";

export const getEquipments = async () => {
  const equipmentsUrl = process.env.BACKEND_URL + "/api/equipment";
  const userAuthToken = cookies().get("authToken")?.value;
  const bearerToken = `Bearer ${userAuthToken}`;

  const response = await axios.get(equipmentsUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });

  const Equipments = response.data;

  return Equipments;
};
