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
  testTimings: z.string(),
  priority: z.string(),
  status: z.string(),
  clinicalNote: z.string(),
  spclInstruction: z.string(),
  patientInfoId: z.number(),
  testCategoriesId: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

export const formData = z.object({
  testTimings: z.string(),
  priority: z.string(),
  status: z.string(),
  clinicalNote: z.string(),
  spclInstruction: z.string(),
  patientInfoId: z.string(),
  testCategoriesId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

const insertPatientTestsParams = PatientTestsData.omit({ id: true });

export type PatientTestsform = z.infer<typeof formData>;
export type PatientTestsData = z.infer<typeof PatientTestsData>;
