// src/pages/students/index.tsx
import React from "react";
import DoctorsDashboard from "../../components/doctors/DoctorDashboard";
import doctorAuth from "hooks/doctorAuth";
const DoctorsPage: React.FC = () => {
  const { isAuthenticated, user } = doctorAuth();

  if (!isAuthenticated) {
    return null;
  } 
  return (
    <>
      <DoctorsDashboard />
    </>
  );
};

export default DoctorsPage;
