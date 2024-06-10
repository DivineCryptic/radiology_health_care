import {z} from "zod";

// {
//     "testName": "Usg",
//     "equipmentId": 4,
//     "parentTestCategoryId": 4
//   }
export const testCategoryData = z.object({
   id: z.number(),
   testName : z.string(),
   equipmentId: z.number(),
   patientReport : z.string().nullable(),
   parentTestCategoryId: z.number().nullable(),
   testDuration:z.number(),

});

export const formData = z.object({
    testName : z.string(),
    equipmentId: z.string(),
    parentTestCategoryId: z.string(),
    testDuration:z.string(),
})

export const insertTestCategoryParams = testCategoryData.omit({ id: true , patientReport: true});

const updateReportTemplate = z.object({
    id : z.number(),
    patientReport: z.string(),

  
})


export type TestCategoryData = z.infer<typeof testCategoryData>;

export type TestCategoryform = z.infer<typeof formData>

// mutation

export type UpdateReportTemplate = z.infer<typeof updateReportTemplate>
export type InsertTestCategoryParams = z.infer<typeof insertTestCategoryParams>