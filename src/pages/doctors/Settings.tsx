"use client";

import React,{useState} from "react";
import SettingComponent from '../../components/doctors/SettingComponent';
import doctorAuth from "hooks/doctorAuth";

const Settings: React.FC = () => {
  const { isAuthenticated, user } = doctorAuth(); 

  if (!isAuthenticated) {
    return null; 
  }
  
  return (
    <>
      <SettingComponent/>
    </>
  );
};

export default Settings;
