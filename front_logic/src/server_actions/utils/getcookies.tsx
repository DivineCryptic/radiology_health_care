import { cookies } from "next/headers";

const TokenReturn = () => {
    const tokenreturn = cookies().get("authToken")?.value;
    return tokenreturn

}

export const userAuthToken = TokenReturn()