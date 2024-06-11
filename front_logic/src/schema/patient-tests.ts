import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS } from "next/dist/shared/lib/constants";
import { z } from "zod";

// {
//     "id": 0,
//     "priority": "string",
//     "clinicalNote": "string",
//     "spclInstruction": "string",
//     "status": "string",
//     "startTime": "2024-04-12T08:31:31.355Z",
//     "endTime": "2024-04-12T08:31:31.355Z",
//     "patientInfoId": 0,
//     "testCategoriesId": 0,
//     "login": "string",
//     "createdBy": "string",
//     "createdDate": "2024-04-12T08:31:31.355Z",
//     "lastModifiedBy": "string",
//     "lastModifiedDate": "2024-04-12T08:31:31.355Z"
//   }

const PatientTestsData = z.object({
  id: z.number(),
  priority: z.string(),
  status: z.string(),
  clinicalNote: z.string(),
  spclInstruction: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.date(),
  endTime: z.date(),
  recommendedDoctor: z.string(),
  patientReport: z.string().nullable(),
});

const PatientTestsDataForm = z.object({
  id: z.number(),
  priority: z.string(),
  status: z.string(),
  clinicalNote: z.string(),
  spclInstruction: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.date(),
  recommendedDoctor: z.string(),
});

export const formData = z.object({
  priority: z.string(),
  status: z.string(),
  clinicalNote: z.string(),
  spclInstruction: z.string(),
  patientInfoId: z.string(),
  testCategoriesId: z.string(),
  startTime: z.string(),
  recommendedDoctor: z.string(),
});

export type TransformPatientTestsData = {
  id: number;
  priority: string;
  status: string;
  clinicalNote: string;
  spclInstruction: string;
  patientInfoId: number;
  testCategoriesId: number;
  startTime: Date;
  endTime: Date;
  patientName: string;
  testName: string;
  recommendedDoctor: string;
};

export const TransformedPatientTests = z.object({
  id: z.number(),
  priority: z.string().nullable(),
  status: z.string().nullable(),
  clinicalNote: z.string().nullable(),
  spclInstruction: z.string().nullable(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  patientName: z.string(),
  testName: z.string(),
  recommendedDoctor: z.string(),
});
const insertPatientTestsParams = PatientTestsDataForm.omit({
  id: true,
  patientReport: true,
});

const dataTableParams = PatientTestsData.omit({ patientReport: true });

const updatePatientTestStatus = z.object({
  id: z.number(),
  status: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.string(),
});

const updatePatientTestsPriority = z.object({
  id: z.number(),
  priority: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.string(),
});

const updatePatientTestStartTime = z.object({
  id: z.number(),
  startTime: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
});

const addPatientReport = z.object({
  id: z.number(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  patientReport: z.string(),
});


export type PatientTestsParams = z.infer<typeof dataTableParams>;

//mutation , and additions for patient tests for the route patient-test-timings
export type UpdatePatientTestStartTime = z.infer<
  typeof updatePatientTestStartTime
>;
export type UpdatePatientTestsPriority = z.infer<
  typeof updatePatientTestsPriority
>;
export type UpdatePatientTestStatus = z.infer<typeof updatePatientTestStatus>;
export type insertPatientTestsParams = z.infer<typeof insertPatientTestsParams>;
export type AddPatientReport = z.infer<typeof addPatientReport>;

export type PatientTestsform = z.infer<typeof formData>;
export type PatientTestsData = z.infer<typeof PatientTestsData>;
export type PatientTestsDataForm = z.infer<typeof PatientTestsDataForm>;

export interface IndividualPatientPageData {
  //patient info
  patientInfoId: number;
  name: string;
  age: number;
  gender: string;
  mobile: number;
  relation: string;

  //patient test info
  id: number;
  priority: string;
  status: string;
  clinicalNote: string;
  spclInstruction: string;
  startTime: Date;
  endTime: Date;
  recommendedDoctor: string;
  initialPatientReport: null | string;
  patientReport: null | string;

  //Test info
  testCategoriesId: number;
  testName: string;
  parentTestCategoryId: number;
  categoryName: string;
  testDuration: number;

  //Equipment Name
  equipmentId: number;
  equipmentName: string;
}


