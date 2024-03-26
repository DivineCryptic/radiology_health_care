"use client";
import React from "react";
import { FcPlus } from "react-icons/fc";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignIn from "./SignIn";
import SignUp from "./signUp";


const AuthPage = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-20">
        <FcPlus className="text-6xl m-5" />
        <Tabs defaultValue="signin" className="w-[500px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card>
              <CardContent className="">
                <SignIn/>
              </CardContent>
              <CardFooter />
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardContent className="">
                <SignUp/>
              </CardContent>
              <CardFooter />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default AuthPage;
