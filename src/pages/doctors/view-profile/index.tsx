import DoctorNavBar from "components/doctors/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const getToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("doctorToken");
    }
    return null;
  };

  const getDoctorDetails = () => {
    const doctorDetailsString = localStorage.getItem("doctorDetails");
    return doctorDetailsString ? JSON.parse(doctorDetailsString) : null;
  };

  // ✅ Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        setMessage("No token found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        const doctorDetails = getDoctorDetails();
        const email = doctorDetails?.email;

        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          params: { email },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email: fetchedEmail } = res.data.user;
        setFormData({ name, email: fetchedEmail });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setMessage("Failed to load profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle profile update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const token = getToken();
    if (!token) {
      setMessage("No token found. Please login again.");
      setSaving(false);
      return;
    }

    try {
      const doctorDetails = getDoctorDetails();
      const email = doctorDetails?.email;

      await axios.put(
        "http://localhost:5000/api/auth/update-user",
        { name: formData.name, email: formData.email || email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("✅ Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("❌ Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="view-profile-page">
      <DoctorNavBar />
      <div className="profile-container">
        <h2>User Details</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label className="text-black">
                Name: <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="text-black">
                Email Address: <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />
            </div>

            {message && <p className="status-message">{message}</p>}

            <div className="form-actions">
              <button type="submit" className="save-btn" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ViewProfile;
