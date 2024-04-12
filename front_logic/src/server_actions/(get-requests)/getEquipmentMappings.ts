import { cookies } from "next/headers";
import axios from "axios";

export const getEquipmentMappings = async () => {
  const equipmentMappingUrl =
    process.env.BACKEND_URL + "/api/technician-equipment-mappings";

  const userAuthToken = cookies().get("authToken")?.value;
  const bearerToken = `Bearer ${userAuthToken}`;

  const response = await axios.get(equipmentMappingUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });

  const EquipmentMappings = response.data;

  return EquipmentMappings;
};
