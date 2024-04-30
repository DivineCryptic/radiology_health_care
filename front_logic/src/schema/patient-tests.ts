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
  endTime : z.date()
 
})

const PatientTestsDataForm = z.object({
  id: z.number(),
  priority: z.string(),
  status: z.string(),
  clinicalNote: z.string(),
  spclInstruction: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.date(),
 
});

export const formData = z.object({
  priority: z.string(),
  status: z.string(),
  clinicalNote: z.string(),
  spclInstruction: z.string(),
  patientInfoId: z.string(),
  testCategoriesId: z.string(),
  startTime: z.string(),
 
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
}

export const TransformedPatientTests = z.object({
  id: z.number(),
  priority: z.string().nullable(),
  status: z.string().nullable(),
  clinicalNote: z.string().nullable(),
  spclInstruction: z.string().nullable(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.string(),
  endTime : z.string(),
  patientName: z.string(),
  testName: z.string(),
});
const insertPatientTestsParams = PatientTestsDataForm.omit({ id: true });

const updatePatientTestStatus = z.object({
  id : z.number(),
  status: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.string(),
})

const updatePatientTestsPriority = z.object({
  id : z.number(),
  priority: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.string() 
})

const updatePatientTestStartTime = z.object({
  id : z.number(),
  startTime: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
})

export type UpdatePatientTestStartTime = z.infer<typeof updatePatientTestStartTime>


export type UpdatePatientTestsPriority = z.infer<typeof updatePatientTestsPriority>
export type UpdatePatientTestStatus = z.infer<typeof updatePatientTestStatus>;
export type insertPatientTestsParams = z.infer<typeof insertPatientTestsParams>;

export type PatientTestsform = z.infer<typeof formData>;
export type PatientTestsData = z.infer<typeof PatientTestsData>;
export type PatientTestsDataForm = z.infer<typeof PatientTestsDataForm>;


