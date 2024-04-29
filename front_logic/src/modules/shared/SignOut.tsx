"use client"
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/server_actions/(auth)/removeCookies";

 
const SignOut = () => {
    const router = useRouter()
    const form = useForm()
    const onSubmit = async () => {
        localStorage.clear();
        await deleteCookie()
        router.refresh()
    }
    
    
 
return (
    <div>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Button type="submit">Sign Out</Button>
        </form>
    </div>
);
};

export default SignOut;
