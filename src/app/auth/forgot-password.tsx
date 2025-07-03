// src/pages/auth/forgot-password.tsx
import React from 'react';
// Update the import path below if the actual path is different
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import Image from 'next/image';
import "../../styles/global.scss"


const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-2/3 bg-cover bg-center flex flex-col justify-center text-white p-8 left-sec" style={{ backgroundImage: 'url(/login/left-bg.png)' }}>
        <div className="text-left">
          <Image
            src="/login/left-image.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <h1 className="text-4xl font-bold mb-4 text-black">Access, Monitor, Connect</h1>
          <p className="text-lg text-black">Easily check your child&apos;s medical records and stay updated on their health. Log in <br/> now to view history, track vaccinations, manage appointments, and more.<br/> Your child&apos;s well-being is just a click away.</p>
        </div>
      </div>
      <div className="w-full md:w-1/3 bg-orange-400 flex justify-center items-center relative right-sec">
        <div className="max-w-md w-full">
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 absolute top-1/2 left-1/1 transform -translate-x-2/3 -translate-y-1/2 bg-gray-50 p-8 br-20 form-wrap">
            <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
