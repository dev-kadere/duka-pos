import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const page = () => {
  return (
    <section className="flex flex-row w-full h-screen ">
      <div className="w-1/2 p-8 h-full flex flex-col justify-center items-center">
        <div className="space-y-2">
          <h1 className=" text-center text-3xl font-bold">Sign In</h1>
          <p className="text-xl ">Use your email and password to s ign in.</p>
        </div>
        <form action="" className="space-y-4 mt-5">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <p className="text-blue-300 hover:underline cursor-pointer">
            Forgot Your Password?
          </p>
          <Button type="submit" className="bg-button">
            Sing In
          </Button>
        </form>
      </div>
      <div className=" space-y-5 w-1/2 p-8 bg-blue-600 text-white rounded-l-4xl h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold">Hello, Friend </h1>
        <p>Sign in to continue to your account.</p>
      </div>
    </section>
  );
};

export default page;
