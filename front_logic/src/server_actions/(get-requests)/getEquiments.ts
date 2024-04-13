import { cookies } from "next/headers";
import axios from "axios";

const equipmentsUrl = process.env.BACKEND_URL + "/api/equipment";

export const getEquipments = async () => {
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
