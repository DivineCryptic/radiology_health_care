import axios from "axios";
import { cookies } from "next/headers";

export const GetPatientReportTemplate = async () => {
    const userAuthToken = cookies().get("authToken")?.value;
    const bearerToken = `Bearer ${userAuthToken}`;
    const templateUrl = process.env.BACKEND_URL + "/api/" ;
    const response = await axios.get(templateUrl, {
        headers: {
            Authorization: bearerToken,
        },
    });
    const template = response.data;
    return template;
}