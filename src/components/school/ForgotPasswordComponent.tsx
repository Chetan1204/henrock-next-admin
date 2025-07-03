"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaLock, FaEnvelope, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/global.scss";

import "../doctors/DoctorsResponsiveStyles.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";

type ForgotPasswordStep = "email" | "otp" | "reset";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email  is required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),

  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{4}$/, "OTP must be 4 digits"),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const ForgotPasswordComponent: React.FC = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>("email");

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    Password: "",
    confromPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    Password?: string;
    confromPassword?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateStep = async () => {
    try {
      // Validate only current step's field
      await validationSchema.validateAt(currentStep, formData);
      setErrors((prev) => ({ ...prev, [currentStep]: "" }));
      return true;
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [currentStep]: err instanceof Error ? err.message : String(err),
      }));
      return false;
    }
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    try {
      await validationSchema.validateAt(name, formData);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [name]: err instanceof Error ? err.message : String(err),
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (currentStep === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          throw new Error("Please enter a valid email address");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to send OTP");
        }

        setEmail(formData.email);
        setCurrentStep("otp");
      } else if (currentStep === "otp") {
        if (formData.otp.length !== 4) {
          throw new Error("OTP must be 4 digits");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/otp-verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              otp: formData.otp,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Invalid OTP");
        }

        setCurrentStep("reset");
      } else if (currentStep === "reset") {
        if (!formData.confromPassword || !formData.Password) {
          throw new Error("Both password fields are required");
        }
        if (formData.Password.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }
        if (formData.Password !== formData.confromPassword) {
          throw new Error("Passwords do not match");
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/password-change`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: formData.Password,
            }),
          }
        );

        if (!response.ok) {
          toast.error("Password change failed");
        } else {
          toast.success("Password changed successfully");
          router.push("/doctors/login");
        }
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep === "otp") {
      setCurrentStep("email");
    } else if (currentStep === "reset") {
      setCurrentStep("otp");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div
        className="w-full md:w-2/3 bg-cover bg-center flex flex-col justify-center text-white p-8 left-sec"
        style={{ backgroundImage: "url(/doctors/doctor-login-left.png)" }}
      >
        <div className="text-left doctor-login-left-contaianer">
          <Image
            src="/doctors/doctor-login-left-group-img.png"
            width={500}
            height={500}
            alt="Doctor Graphic"
          />
          <h1 className="text-4xl font-bold mb-4 text-white">
            Access, Monitor, Connect
          </h1>
          <p className="text-lg text-white">
            Easily check your child's medical records and stay updated on their
            health. Log in <br /> now to view history, track vaccinations,
            manage appointments, and more.
            <br /> Your child's well-being is just a click away.
          </p>
        </div>
      </div>

      <div className="doctor-login-form-parent-wr w-full md:w-1/3 bg-yellow-500 flex justify-center items-center relative right-sec">
        <div className="max-w-md w-full">
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 absolute top-1/2 left-1/1 transform -translate-x-2/3 doctor-login-form-wr -translate-y-1/2 bg-gray-50 p-8 br-20 form-wrap">
              <form onSubmit={handleSubmit} className="space-y-6 rounded-md">
                <div>
                  <Image
                    src="/login/logo.png"
                    width={100}
                    height={100}
                    alt="Logo"
                    className="m-auto login-page-logo-img"
                  />
                  <h1 className="text-black text-3xl font-[800] mt-6">
                    {currentStep === "email" && "Forgot Password"}
                    {currentStep === "otp" && "Verify OTP"}
                    {currentStep === "reset" && "Reset Password"}
                  </h1>
                  <h4 className="text-gray-400 text-md font-light mt-3">
                    {currentStep === "email" &&
                      "Enter your email to receive OTP"}
                    {currentStep === "otp" &&
                      "Enter the OTP sent to your email"}
                    {currentStep === "reset" && "Enter your new password"}
                  </h4>
                </div>

                

                {currentStep === "email" && (
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                    />
                    <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
                    {errors.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                    
                    {error && (
                      <div className="text-red-500 text-sm mt-1">
                        {error}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === "otp" && (
                  <div className="relative">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter 4-digit OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      maxLength={4}
                      className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                      required
                    />
                    <FaKey className="absolute right-3 top-1/3 transform -translate-y-1/2 text-black" />

                    <div className="text-sm text-black mt-2">
                      OTP sent to: {email}
                    </div>
                    {error && (
                      <div className="text-red-500 text-sm mt-1">
                        {error}
                      </div>
                    )}
                  </div>
                )}

                {currentStep === "reset" && (
                  <>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="Password"
                        placeholder="Enter password"
                        value={formData.Password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                        minLength={8}
                      />

                      <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                       
                    </div>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confromPassword"
                        placeholder="Confirm password"
                        value={formData.confromPassword}
                        onChange={handleChange}
                        className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                        minLength={8}
                      />

                      <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                      {error && (
                      <div className="text-red-500 text-sm mt-1">
                        {error}
                      </div>
                    )}
                    </div>
                  </>
                )}

                <div className="flex flex-col space-y-4">
                  <button
                    type="submit"
                    className="font-[700] group relative w-full flex justify-center py-4 px-3 border border-transparent text-md font-medium rounded-md text-white bg-[#1D71B8] duration-300 ease-in-out hover:opacity-70 transition-all"
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : currentStep === "email"
                      ? "Send OTP"
                      : currentStep === "otp"
                      ? "Verify OTP"
                      : "Reset Password"}
                  </button>

                  {/* {(currentStep === "otp" || currentStep === "reset") && (
                               <button
                                 type="button"
                                 onClick={handleBack}
                                 className="font-[700] group relative w-full flex justify-center py-4 px-3 border border-gray-300 text-md font-medium rounded-md text-gray-700 bg-white duration-300 ease-in-out hover:bg-gray-50 transition-all"
                                 disabled={loading}
                               >
                                 Back
                               </button>
                             )} */}

                  <div className="text-center">
                    {/* <Link href="/doctors/login" className="text-blue-600 hover:underline">
                                 Back to Login
                               </Link> */}
                  </div>
                </div>
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

export default ForgotPasswordComponent;
