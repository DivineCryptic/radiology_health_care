import axios from "axios";
import {cookies} from "next/headers"

export const getPatientTests = async() => {
    const patientTestsUrl = process.env.BACKEND_URL + "/api/patient-test-timings";
    const userAuthToken = cookies().get("authToken")?.value;

    const bearerToken = `Bearer ${userAuthToken}`;
    const response = await axios.get(patientTestsUrl, {
        headers: {
            Authorization: bearerToken,
        }
    })
    const PatientTests = response.data
    return PatientTests
    
}