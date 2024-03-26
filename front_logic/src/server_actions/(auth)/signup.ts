"use server";
import { signUpForm } from "@/inferedTypes";
import axios from "axios";

export const SignupUser = async (values: signUpForm) => {
  const signupUrl = process.env.BACKEND_URL + "/api/register";
  try {
    const response = await axios.post(signupUrl, {
      login: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
    });
    if (response.status === 201) {
      console.log("Succesfully registered");
    }
  } catch (error) {
    console.error(error);
  }
};
