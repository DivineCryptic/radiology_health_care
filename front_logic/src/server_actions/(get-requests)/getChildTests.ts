import axios from "axios";
import { cookies } from "next/headers";

export const getChildTestCategories = async () => {
  const getChildTestCategoriesUrl =
    process.env.BACKEND_URL +
    "/api/test-categories?parentTestCategoryId.specified=true";

  const userAuthToken = cookies().get("authToken")?.value;
  const bearerToken = `Bearer ${userAuthToken}`;
  const response = await axios.get(getChildTestCategoriesUrl, {
    headers: {
      Authorization: bearerToken,
    },
  });
  const ChildTestCategories = response.data;
  return ChildTestCategories;
};
