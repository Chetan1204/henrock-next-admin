"use client";

import React, { useState, useEffect } from "react";
import MedicalTestComponent from '../../components/doctors/MedicalTestComponent';
import { jwtDecode } from 'jwt-decode'; 
import doctorAuth from "hooks/doctorAuth";

const MedicalTest: React.FC = () => {
// checking user logged in or not
const { isAuthenticated, user } = doctorAuth(); 

if (!isAuthenticated) {
  return null; 
}

 
  return (
    <>
      <MedicalTestComponent />
    </>
  );
};

export default MedicalTest;
