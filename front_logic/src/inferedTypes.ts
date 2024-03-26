import * as z from "zod";
import { signInSchema, signUpSchema } from "./formSchemas";

export type signInForm = z.infer<typeof signInSchema>;
export type signUpForm = z.infer<typeof signUpSchema>;