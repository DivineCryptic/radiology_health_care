import axios from "axios";
import { cookies } from "next/headers";

export const getParentTests = async() => {
    const getParentTestCategoriesUrl = process.env.BACKEND_URL + "/api/test-categories?parentTestCategoryId.specified=false";
    
    const userAuthToken = cookies().get("authToken")?.value;
    const bearerToken = `Bearer ${userAuthToken}`;
    const response = await axios.get(getParentTestCategoriesUrl, {
      headers: {
        Authorization: bearerToken
      }
    })
    const ParentTestCategories = response.data 
    return ParentTestCategories
  }
  
  