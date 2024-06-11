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

export const getIndividualPatientTests = async(patientId:number) => {
    const individualPatientTestsUrl = process.env.BACKEND_URL + `/api/patient-test-timings/${patientId}`;
    const userAuthToken = cookies().get("authToken")?.value;
    const bearerToken = `Bearer ${userAuthToken}`;
    const response = await axios.get(individualPatientTestsUrl, {
        headers: {
            Authorization: bearerToken,
        }
    })
    const PatientTests = response.data
    return PatientTests
}

export const getIndividualTestId = async(testId:number | null) => {
    const individualChildTestReportTemplateUrl = process.env.BACKEND_URL + `/api/test-categories/${testId}`;
    const userAuthToken = cookies().get("authToken")?.value;
    const bearerToken = `Bearer ${userAuthToken}`;
    const response = await axios.get(individualChildTestReportTemplateUrl, {
        headers: {
            Authorization: bearerToken,
        }
    })
    const ReportTemplate = response.data
    return ReportTemplate
}