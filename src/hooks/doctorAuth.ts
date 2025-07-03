// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const doctorAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<any>(null); // Store user details

  const isTokenExpired = (token: string): boolean => {
  
    try {
        console.log("Token:", token);
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorDetails");
    setIsAuthenticated(false);
    window.location.href = "/doctors/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("doctorToken");
    const doctorDetails = localStorage.getItem("doctorDetails");

    if (token && !isTokenExpired(token) && doctorDetails) {
      setUser(JSON.parse(doctorDetails)); // Set user details as an object
    } else {
      console.log("Token expired or no doctor details found. Logging out...");
      handleLogout();
    }
  }, []);

  return { isAuthenticated, user };
};

export default doctorAuth;
