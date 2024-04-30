import {z} from "zod";

const EquipmentsMappingData = z.object({
    id: z.number(),
    dateTime: z.string(),
    equipmentId: z.number(),
    employeeId: z.number(),
})

export const formData = z.object({
    dateTime: z.string(),
    equipmentId: z.string(),
    employeeId: z.string(),
})

export const insertEquipmentMappingsParams = EquipmentsMappingData.omit({ id: true });

export type EquipmentsMappingData = z.infer<typeof EquipmentsMappingData>
export type InsertEquipmentMappingsParams = z.infer<typeof insertEquipmentMappingsParams>

export type EquipmentsMappingform = z.infer<typeof formData>

// {

//     "dateTime": "2024-04-03T09:40:34.487Z",
//     "equipmentId": 4,
//     "employeeId": 1
   
//   }