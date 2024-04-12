import { z } from "zod";

const serviceData = z.object({
  id :z.number(),
  name: z.string(),
});

export const formData = z.object({
  name: z.string(),
});

const insertServiceParams = serviceData.omit({id: true});


// export type ServiceData = 

export type ServiceData = z.infer<typeof serviceData>;
export type ServiceForm = z.infer<typeof formData>;
export type InsertServiceParams = z.infer<typeof insertServiceParams>;

