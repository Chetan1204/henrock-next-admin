"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUser, FaLock } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import "../../styles/global.scss";
import "./DoctorsResponsiveStyles.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { apiPost } from "utils/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosResponse } from "axios";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email or Mobile is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const LoginComponent: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Formik Hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
  setLoading(true);
  try {
    console.log("Attempting login with:", values);

    const response = await (apiPost("/auth/login", values)) as AxiosResponse;
    console.log("API Response:", response);

    if (!response?.data?.result) {
      toast.error("Invalid response data");
      throw new Error("Invalid response data");
    }

    if (response?.status === 200) {
      const result = response.data.result;
      if (!result.token) {
        console.log("Missing token in response");
        toast.error("Unexpected response: token missing.");
        return;
      }

      // Save token and user details
      localStorage.setItem("doctorToken", result.token);
      localStorage.setItem("doctorDetails", JSON.stringify(result.user));

      toast.success("Logged in successfully!");
      router.push("/doctors");
    } else {
      toast.error("Unexpected response status: " + response?.status);
    }

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        console.error("Network error - Please try again later!");
        toast.error("Network error - Please try again later.");
        return;
      }

      console.error(
        `API Error: ${error.response.status} - ${error.response.data?.message || "Something went wrong"}`
      );
      toast.error(`Error: ${error.response.data?.message || "Failed to fetch data."}`);
    } else if (error instanceof Error) {
      console.error("Unexpected error:", error.message);
      toast.error("Something went wrong. Please try again.");
    } else {
      console.error("An unknown error occurred:", error);
      toast.error("Unexpected issue. Please refresh the page.");
    }

  } finally {
    setLoading(false);
    console.log("Login process completed.");
  }
}

  });
  


  useEffect(() => {
    const isTokenExpired = (token: string): boolean => {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      } catch (error) {
        console.error("Error decoding token:", error);
        return true;
      }
    };

    const token = localStorage.getItem("doctorToken");
    if (token && !isTokenExpired(token)) {
      router.push("/doctors");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div
        className="w-full md:w-2/3 bg-cover bg-center flex flex-col justify-center text-white p-8 left-sec"
        style={{ backgroundImage: "url(/doctors/banner.png)" }}
      >
        <div className="text-left doctor-login-left-contaianer">
          {/* <Image
            src="/doctors/doctor-login-left-group-img.png"
            width={500}
            height={500}
            alt="Picture of the author"
          /> */}
        <h1 className="text-4xl font-bold mb-4 text-white">
  Manage, Track, Build
</h1>
<p className="text-lg text-white">
  Effortlessly oversee your construction projects with our powerful admin
  dashboard. <br /> Log in now to monitor progress, assign tasks, manage
  resources, and stay on top of deadlines. <br /> Your project's success starts
  here.
</p>

        </div>
      </div>

      <div className="doctor-login-form-parent-wr w-full md:w-1/3 bg-orange-400 flex justify-center items-center relative right-sec">
        <div className="max-w-md w-full">
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 absolute top-1/2 left-1/1 transform -translate-x-2/3 doctor-login-form-wr -translate-y-1/2 bg-gray-50 p-8 br-20 form-wrap">
              <form
                onSubmit={formik.handleSubmit}
                className="space-y-6 rounded-md"
              >
                <div>
                  <Image
                    src="/login/logo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                    className="m-auto login-page-logo-img"
                  />
                  <h1 className="text-black text-3xl font-[800] mt-6">
                    Welcome to Admin Panel Login
                  </h1>
                  <h4 className="text-gray-400 text-md font-light mt-3">
                    Please login to your account
                  </h4>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter Mobile or Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  />
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                  />
                  <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
{/* 
                <div className="text-black"> <Link href="forgot-password">Forgot Password </Link> </div> */}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`font-[700] group relative w-full flex justify-center py-4 px-3 border border-transparent text-md font-medium rounded-md text-white bg-[#1D71B8] duration-300 ease-in-out hover:opacity-70 transitiob-all  ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
      {/* <div className="text-center">
        <Link href="/doctors/forgot-password" className="text-gray-400 text-lg font-light mt-2">
          Forgot Password?
        </Link>
      </div> */}

              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default LoginComponent;
