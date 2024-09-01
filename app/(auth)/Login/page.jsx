"use client";
import { loginFunc } from "@/app/store/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { success, error, loading, token } = useSelector((state) => state.user);
  const [alert, setAlert] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setAlert("All fields are required!");
      return;
    } else {
      setAlert("");
      const loginPromise = dispatch(loginFunc({ username, password })).unwrap();

      toast.promise(
        loginPromise,
        {
          loading: "Loading...",
          success: "You logged in successfully!",
          error: "Login failed!",
        },
        {
          position: "top-right",
        }
      );
    }
  };

  useEffect(() => {
    if (success && token) {
      router.replace("/Inventory");
    }
  }, [success, router, token]);

  return (
    <div>
      <Toaster />
      <div className="my-16 flex justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-400">Login</h1>
      </div>
      <div className="container mx-auto my-16">
        <div className="grid grid-cols-1 gap-y-3  md:px-5 md:gap-x-7 md:grid-cols-2 ">
          <div>
            <img src="./login.svg" width={500} height={500} alt="" />
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <p className="text-center text-lg font-medium">
                Sign in to your account
              </p>

              {alert && (
                <div className="bg-red-100 text-red-700 p-3 rounded">
                  {alert}
                </div>
              )}
              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="username" className="sr-only">
                  Email
                </label>

                <div className="relative">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>

              <p className="text-center text-sm text-gray-500">
                No account?
                <Link className="underline" href="/register">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
