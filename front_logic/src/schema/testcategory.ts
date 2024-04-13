import {z} from "zod";

// {
//     "testName": "Usg",
//     "equipmentId": 4,
//     "parentTestCategoryId": 4
//   }
const TestCategoryData = z.object({
   id: z.number(),
   testName : z.string(),
   equipmentId: z.number(),
   
   parentTestCategoryId: z.number(),
});

export const formData = z.object({
    testName : z.string(),
    equipmentId: z.string(),
    parentTestCategoryId: z.string(),
})

export const insertTestCategoryParams = TestCategoryData.omit({ id: true });

export type TestCategoryData = z.infer<typeof TestCategoryData>;

export type TestCategoryform = z.infer<typeof formData>

export type InsertTestCategoryParams = z.infer<typeof insertTestCategoryParams>