// DoctorNavBar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./DoctorsStyles.css";
import "./DoctorsResponsiveStyles.css";
import doctorAuth from "hooks/doctorAuth";
import router from "next/router";


const DoctorNavBar: React.FC = () => {
const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorDetails");
    router.push("/doctors/login");
  };


  const { user } = doctorAuth();
  const [doctorName, setDoctorName] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setDoctorName(user.name);
    }
  }, [user]);
  return (
   <div className="doctors-header-wr">

  
<div className="doctor-logo-wr">
  <Link href="/doctors">
    <img src="/login/logo.png" alt="Logo" />
  </Link>
</div>
      
    <ul className="top-links">
    <li>
      <Link href="/doctors/careers">Career</Link>
    </li>
    <li>
      <Link href="/doctors/contact">Contact Us</Link>
    </li>
  </ul>
      

      
 <ul className="menu">
        <li className="menu-item">
         <div className="doctor-info">
            <span className="doctor-name">
              {doctorName ? "Dr. " + doctorName : "Admin"}
            </span>
            <span className="doctor-email">
              {user?.email || "admin@example.com"}
            </span>
          </div>
          <ul className="submenu">
            <li className="submenu-item">
              <Link href="/doctors/view-profile">View Profile</Link>
            </li>
             <li className="submenu-item">
              <Link href="/doctors/security">Security</Link> 
            </li>
             <li className="submenu-item">
              <Link onClick={handleLogout} href="/">Log Out</Link>
              {/* <button onClick={handleLogout} >
                Log Out
                </button> */}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default DoctorNavBar;
