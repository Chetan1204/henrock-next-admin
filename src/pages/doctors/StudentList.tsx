"use client";

import React,{useState} from "react";

import doctorAuth from "hooks/doctorAuth";

const StudentList: React.FC = () => {
  const { isAuthenticated, user } = doctorAuth(); 

  if (!isAuthenticated) {
    return null; 
  }
  
  return (
    <>
    
    </>
  );
};

export default StudentList;
