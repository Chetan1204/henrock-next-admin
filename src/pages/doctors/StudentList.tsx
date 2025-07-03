"use client";

import React,{useState} from "react";
import StudentListComponent from '../../components/doctors/StudentListComponent';
import doctorAuth from "hooks/doctorAuth";

const StudentList: React.FC = () => {
  const { isAuthenticated, user } = doctorAuth(); 

  if (!isAuthenticated) {
    return null; 
  }
  
  return (
    <>
      <StudentListComponent/>
    </>
  );
};

export default StudentList;
