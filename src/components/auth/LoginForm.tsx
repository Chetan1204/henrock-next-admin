"use client";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useAppStore } from 'lib/hooks';
import { parentLogin } from "lib/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import "../doctors/DoctorsResponsiveStyles.css";
import { FaUser, FaLock } from "react-icons/fa";  


const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const store = useAppStore();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const { error, isAuthenticated, user,token } = useAppSelector((state: any) => state.auth);
      const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
      }); 
      const validateForm = async () => {
        try {
          await validationSchema.validate(formData, { abortEarly: false });
          setFormErrors({});
          return true;
        } catch (errors) {
          const validationErrors: Record<string, string> = {};
          // errors.inner.forEach((error) => {
          //   if (error.path) validationErrors[error.path] = error.message;
          // });
          setFormErrors(validationErrors);
          return false;
        }
      };
      let loading =false;
      const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 
        loading = true;
        const isValid = await validateForm();
        dispatch(parentLogin(formData)).then((response) => {
          console.log("Dispatch resolved:", response);
        }).catch((error) => {
          console.error("Dispatch rejected:", error);
        });

        loading = false;
      };

      useEffect(() => {
        if (isAuthenticated) {
          router.push("/parent");
        }
      }, [isAuthenticated]);
    

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-md">
      <div>
        <Image
          src="/login/logo.png"
          width={100}
          height={100}
          alt="Logo"
          className="m-auto login-page-logo-img"
        />
        <h1 className="text-black text-3xl font-semibold mt-6">
          Welcome to Your Child&apos;s Health Portal
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
        />
        <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
      </div>
      
      <div className="relative">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password" 
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="mt-1 block w-full pr-10 pl-3 py-4 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
        />
        <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={loading}
          className={`group relative w-full flex justify-center py-4 px-3 border border-transparent text-md font-medium rounded-md text-white ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      
      {/* <div className="text-center">
        <Link href="/parent/forgot-password" className="text-gray-400 text-lg font-light mt-2">
          Forgot Password?
        </Link>
      </div> */}
    </form>
  );
};

export default LoginForm;
