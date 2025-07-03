"use client";

import React,{useState} from "react";
import SettingComponent from '../../components/doctors/SettingComponent';
import doctorAuth from "hooks/doctorAuth";


const ReportsCollection: React.FC = () => {
  const { isAuthenticated, user } = doctorAuth(); 

  if (!isAuthenticated) {
    return null; 
  }
  
  return (
    <>
   
    </>
  );
};

export default ReportsCollection;
