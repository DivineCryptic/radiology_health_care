import axios from "axios";
import { cookies } from "next/headers";

export const getPatients = async () => {
  const PatientsUrl = process.env.BACKEND_URL + "/api/patient-infos";
  const userAuthToken = cookies().get("authToken")?.value;
  const bearerToken = `Bearer ${userAuthToken}`;

  const response = await axios.get(PatientsUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const Patients = response.data;
  return Patients;
};
