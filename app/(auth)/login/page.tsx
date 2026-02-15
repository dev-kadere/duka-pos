"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { useAuthStore } from "@/store/auth.store";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user = useAuth();
  console.log(user.user);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (!value) {
      setEmailError("Email is required");
    } else if (!validateEmail(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setPasswordError("Password is required");
    } else if (!validatePassword(value)) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const isDisabled =
    !email || !password || emailError !== "" || passwordError !== "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-row w-full h-screen ">
      <div className="w-1/2 p-8 h-full flex flex-col justify-center items-center">
        <div className="space-y-2">
          <h1 className=" text-center text-3xl font-bold">Sign In</h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-4 mt-5 w-full flex flex-col justify-center items-center"
        >
          <Button
            type="button"
            variant="outline"
            className=" rounded-2xl border p-5 w-14 h-14"
            onClick={handleGoogleSignIn}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              width={50}
              height={50}
              className="text-gray-400"
            >
              <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
            </svg>
          </Button>

          <p className="text-xl ">
            {" "}
            or use your email and password to s ign in.
          </p>
          <Input
            type="email"
            placeholder="Email"
            aria-placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="mt-4 h-12"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}

          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          {error && <p className="text-red-500">{error}</p>}

          <p className="text-blue-300 hover:underline cursor-pointer">
            Forgot Your Password?
          </p>
          <Button
            type="submit"
            disabled={isDisabled}
            className={`bg-blue-600 px-12 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Signing In..." : "Sign In"}
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
