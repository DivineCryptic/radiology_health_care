"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const PatientTestsUrl = process.env.BACKEND_URL + "/api/patient-test-timings";
const userAuthToken = cookies().get("authToken")?.value;
const bearerToken = `Bearer ${userAuthToken}`;

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePatientTests = () => revalidatePath("/patient-tests");

export const createPatientTestsAction = async (patientTests: any) => {
  try {
    const response = await axios.post(PatientTestsUrl, patientTests, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (response.status === 201) {
      revalidatePatientTests();
      return console.log("Patient Tests added successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePatientTestsAction = async (id: number) => {
  try {
    const response = await axios.delete(PatientTestsUrl + "/" + id, {
      headers: {
        Authorization: bearerToken,
      },
    });
    if (response.status === 204) {
      revalidatePatientTests();
      return console.log("Patient Tests deleted successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};
