import * as z from "zod";

//Authentication

const signInSchema = z.object({
  username: z.string(),
  password: z.string().min(3),
});

const signUpSchema = z.object({
    username: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(25),
    confirmPassword: z.string(),
  }).refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

export { signInSchema };
export { signUpSchema };