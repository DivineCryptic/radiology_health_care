"use server";

import {
  insertPatientTestsParams,
  UpdatePatientTestsPriority,
  UpdatePatientTestStartTime,
  UpdatePatientTestStatus,
} from "@/schema/patient-tests";
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

export const createPatientTestsAction = async (
  patientTests: insertPatientTestsParams
) => {
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

export const patchPatientTestsStatusAction = async (
  patientTestStatus: UpdatePatientTestStatus
) => {
  try {
    const response = await axios.patch(
      PatientTestsUrl + "/" + patientTestStatus.id,
      patientTestStatus,
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    if (response.status === 200) {
      revalidatePatientTests();
      return console.log("Patient Tests status updated successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};

export const patchPatientTestPriorityAction = async (
  patientTestPriority: UpdatePatientTestsPriority
) => {
  try {
    const response = await axios.patch(
      PatientTestsUrl + "/" + patientTestPriority.id,
      patientTestPriority,
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    if (response.status === 200) {
      revalidatePatientTests();
      return console.log("Patient Tests priority updated successfully");
    }
  } catch (e) {
    return handleErrors(e);
  }
};

export const patchPatientTestsStartTime = async (
  patientTestStartTime: UpdatePatientTestStartTime
) => {
  try {
    const response = await axios.patch(
      PatientTestsUrl + "/" + patientTestStartTime.id,
      patientTestStartTime,
      {
        headers: {
          Authorization: bearerToken,
        },
      }
    );
    // if (response.status === 200) {
    //   revalidatePatientTests();
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve("success");
    //     }, 5000); // Delay of 5 seconds …
    // }

    if (response.status === 200) {
      revalidatePatientTests();

      return 'success'
    }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     if (response.status === 200) {
    //       // revalidateTestCategory();
    //       revalidatePatientTests();
    //       return "success";
    //     } else {
    //       return "error";
    //     }
    //   }, 5000); // Delay of 5 seconds
    // });
  } catch (e) {
    return handleErrors(e);
  }
};
