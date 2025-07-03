import axios from "axios";
import DoctorNavBar from "components/doctors/Navbar";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Security = () => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("doctorToken");
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const toggleVisibility = (field: keyof typeof formData) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password, newPassword, confirmPassword } = formData;
    const newErrors: Record<string, string> = {};

    if (!password) newErrors.password = "Current password is required.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    if (newPassword && newPassword.length < 6)
      newErrors.newPassword = "New password must be at least 6 characters.";
    if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = getToken();
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      console.log("Sending token:", token);
        const doctorDetailsString = localStorage.getItem("doctorDetails");
        const doctorDetails = doctorDetailsString ? JSON.parse(doctorDetailsString) : null;
        const email = doctorDetails?.email; 
        
      const response = await axios.post(
        "http://localhost:5000/api/auth/change-password",
        { email, password, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setFormData({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("API error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An error occurred while changing password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="security-page">
      <DoctorNavBar />
      <div className="security-container">
        <h2 className="security-title">Account Security</h2>
        <form onSubmit={handleSubmit} className="security-form">
          {(["password", "newPassword", "confirmPassword"] as const).map((field) => (
            <div className="form-group" key={field}>
              <label>
                {field === "password" && <>Current Password <span>*</span></>}
                {field === "newPassword" && <>New Password <span>*</span></>}
                {field === "confirmPassword" && <>Confirm New Password <span>*</span></>}
              </label>
              <div className="input-wrapper">
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility(field)}
                  className="eye-btn"
                >
                  {showPassword[field] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors[field] && <p className="form-error">{errors[field]}</p>}
            </div>
          ))}
          <div className="form-actions">
            <button type="submit" disabled={loading} className="save-btn">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Security;
