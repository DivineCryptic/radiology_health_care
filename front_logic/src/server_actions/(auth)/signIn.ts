"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { cookieLogin } from "./cookieLogin";
import { signInForm } from "@/inferedTypes";



export const SignedInUser = async (values: signInForm) => {
  const authenticateUrl = process.env.BACKEND_URL + "/api/authenticate";
  try {
    const response = await axios.post(authenticateUrl, {
      username: values.username,
      password: values.password,
    });
    await cookieLogin(response.data);

    const userAuthToken = cookies().get("authToken")?.value;
    return userAuthToken;
  } catch (error) {
    // Handle axios errors here
    console.error("An error occurred:", error);
    // You can add custom error handling logic here
  }
const response = await axios.post(authenticateUrl, {
  username: values.username,
  password: values.password,
});


}

