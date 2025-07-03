"use client";

import React, { useState, useEffect } from "react";

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
      
    </>
  );
};

export default MedicalTest;
