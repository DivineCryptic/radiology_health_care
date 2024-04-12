import { cookies } from "next/headers";
import axios from "axios";

export const getTestCategories=async()=>{

    const getTestCategoriesUrl=process.env.BACKEND_URL+"/api/test-categories";
    const userAuthToken=cookies().get("authToken")?.value;
    const bearerToken=`Bearer ${userAuthToken}`;

    
        const response=await axios.get(
            getTestCategoriesUrl,
            {
                headers:{
                Authorization:bearerToken,
            }
        },
        );

        const TestCategories=response.data;

        return TestCategories;
    
}