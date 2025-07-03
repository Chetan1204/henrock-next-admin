"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./DoctorsStyles.css";
import "./DoctorsResponsiveStyles.css";
import DoctorNavBar from "./Navbar";
import doctorAuth from "hooks/doctorAuth";
import axios, { AxiosResponse } from "axios";
import * as Yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { apiGet, apiPut } from "utils/api";
import { useRouter } from "next/router";
import Loader from "components/Loader";

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
// form data interface
interface ProfileFormData {
  full_name: string;
  email: string;
  specialist: string;
  mobile: string;
  location: string;
  certificate: File | null;
}

// doctor data ineterface which we are getting from the get api
interface DoctorData {
  user_id: number;
  user_role: number;
  full_name: string;
  email: string;
  mobile: string;
  specialist: string;
  location: string;
  certificate: string;
}

// component starts from here
const SettingComponent: React.FC = () => {
  // states
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(1); // State to track active tab
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [doctorData, setDoctorData] = useState<DoctorData | null>(null); // Initialize with null
  const { user } = doctorAuth(); // Assuming doctorAuth is a custom hook
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: "",
    email: "",
    specialist: "",
    mobile: "",
    location: "",
    certificate: null,
  });

  useEffect(() => {
    // Accessing localStorage only in the browser
    const storedToken = localStorage.getItem("doctorToken");
    setToken(storedToken);
  }, []);

  const router = useRouter();

  // state to show and hide password
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // function to toggle password visibility
  const togglePasswordVisibility = (field: keyof typeof passwordVisibility) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // profile form validation
  const ProfileValidationSchema = Yup.object({
    full_name: Yup.string().required("*Full name is required"),
    specialist: Yup.string().required("*Specialist is required"),
    mobile: Yup.string().required("*Phone number is required"), // Use mobile here
    location: Yup.string().required("*Location is required"),
    // certificate: Yup.string().required("*Certificate is required"),
  });

  //password form validation
  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Include at least one uppercase letter")
      .matches(/[a-z]/, "Include least one lowercase letter")
      .matches(/[0-9]/, "Include at least one number")
      .notOneOf([Yup.ref("currentPassword")], "New password must be different")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });
  

  // to handle tab change
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  // to handle edit and view profile toggle
  const handleToggle = () => {
    setIsEditing((prev) => !prev);
  };


  // function to handle password form data submission
  const handlePasswordFormSubmit = async (values: PasswordFormValues) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/doctor/changePassword`,
        {
          old_password: values.currentPassword,
          new_password: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token as a Bearer token
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Password updated successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          toast.error(data.message || "Invalid request. Please try again.");
        } else if (status === 401) {
          toast.error(data.message || "Unauthorized. Please login again.");
        } else if (status === 500) {
          toast.error("Server error. Please try later.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      } else {
        console.error("Error updating password:", error);
        toast.error("Failed to update password. Please try again.");
      }
    }finally{
      setLoading(false);
    }
  };


  // Function to fetch doctor data
  async function handleGetUserData() {
    try {
      setPageLoading(true);
    const response = (await apiGet("/doctor/user")) as AxiosResponse;
      // Set the fetched data to doctorData state
      if (!response?.data) {
        toast.error("Invalid response data")
      }
      setDoctorData(response?.data);
      setFormData(response?.data);
  
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          console.error("Network error - Please try again later!");
          toast.error("Network error - Please try again later.");
          localStorage.removeItem("doctorToken");
          localStorage.removeItem("doctorDetails");
          router.push("/doctors/login");
          return;
        }

        console.error(
          `API Error: ${error.response.status} - ${
            error.response.data?.message || "Something went wrong"
          }`
        );
        toast.error(
          `Error: ${error.response.data?.message || "Failed to fetch data."}`
        );
        localStorage.removeItem("doctorToken");
        localStorage.removeItem("doctorDetails");
        router.push("/doctors/login");
      } else if (error instanceof Error) {
        console.error("Unexpected error:", error.message);
        toast.error("Something went wrong. Please try again.");
        localStorage.removeItem("doctorToken");
        localStorage.removeItem("doctorDetails");
        router.push("/doctors/login");
      } else {
        console.error("An unknown error occurred:", error);
        toast.error("Unexpected issue. Please refresh the page.");
      }
    }finally{
      setPageLoading(false);
    } 
  }

  // Fetch data when user is available
  useEffect(() => {
    setPageLoading(true)
    if (user) {
      handleGetUserData();
    }
  }, [user]);

  // function to handle profile data updation


  return (
    <>
      <section className="doctor-dashboard-wr">
        <div className="doctor-dashboard-inner-container">
          {/* left wr */}
         

          {/* right wr */}
          <div className="doctors-right-wr">
            {/* header wr */}
            <DoctorNavBar />

            <div className="doctors-nav-wr">
              <Link href="#">Settings</Link>
              <span>
                <img src="/doctors/right-arrow.png" alt="" />
              </span>
              <Link href="#">
              {activeTab === 2 ? "Password & Security" : "Profile"}
              </Link>
            </div>

            <div className="doctors-main-content-wr settings">
            <div className="settings-wr">
                <h3>Settings</h3>

            {/* main content area */}
            {pageLoading ? <>
            <Loader/>
            </> : <>
             
                <div className="setting-inner-content-wr">
                  <div className="tabber-container">
                    <div className="tabs">
                      <div
                        className={`tab ${activeTab === 1 ? "active" : ""}`}
                        onClick={() => handleTabClick(1)}
                      >
                        View/Edit Profile
                      </div>
                      <div
                        className={`tab ${activeTab === 2 ? "active" : ""}`}
                        onClick={() => handleTabClick(2)}
                      >
                        Password & Security
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content">
                      {activeTab === 1 && (
                        <div
                          style={{ position: "relative" }}
                          className="form-tab"
                        >
                          <button
                            onClick={handleToggle}
                            className={`${isEditing ? 'edit-profile cancel' : 'edit-profile'}`}
                          >
                            {isEditing ? "Cancel Edit" : "Edit Profile"}
                          </button>

                          {/* View Profile Section */}
                          <div
                            className="view-profile-wr"
                            style={{ display: isEditing ? "none" : "block" }}
                          >
                            <div className="student-personal-detail-wr">
                              <figure>
                                <img
                                  src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                                  alt="student-profile-img"
                                />
                              </figure>
                              <div className="details-container">
                                <h4 className="student-name">
                                  {doctorData?.full_name}
                                </h4>
                                <div className="setting-user-detail-wr">
                                  <div className="student-other-details-wr">
                                    <div>
                                      <h5>Email: </h5>
                                      <span>{doctorData?.email}</span>
                                    </div>
                                    <div>
                                      <h5>Specialist: </h5>
                                      <span>{doctorData?.specialist}</span>
                                    </div>
                                  </div>
                                  <div className="student-other-details-wr">
                                    <div>
                                      <h5>Location:</h5>
                                      <span>{doctorData?.location}</span>
                                    </div>
                                    <div>
                                      <h5>Phone</h5>
                                      <span>{doctorData?.mobile}</span>
                                    </div>
                                  </div>
                                  {/* <div className="student-other-details-wr">
                                    <div>
                                      <h5>Certificate</h5>
                                      {doctorData && doctorData?.certificate !== "" ? 
                                             <figure className="certificate-img-wr">
                                              <span style={{fontSize: '14px',color: '#000',whiteSpace: 'nowrap',width: '100%',overflow: 'hidden',textOverflow: 'ellipsis',}}>{doctorData?.certificate}</span>
                                            </figure>
                                            :
                                            <>
                                             <figure className="certificate-img-wr">
                                              <span>N/A</span>
                                             </figure>
                                            </>
                                       }
 
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Edit Profile Form */}
                          
                          <Formik
                            enableReinitialize={true}
                            initialValues={formData}
                            validationSchema={ProfileValidationSchema}
                            onSubmit={ async (values) => {
                              try {
                                setLoading(true);
                                const formData = new FormData();
                            
                                // Append other fields
                                formData.append('full_name', values.full_name);
                                formData.append('email', values.email);
                                formData.append('specialist', values.specialist);
                                formData.append('phone', values.mobile);
                                formData.append('location', values.location);
                            
                                console.log("Certificate Before Appending:", values.certificate); // Check file before appending

                                if (values.certificate) {
                                  formData.append("certificate", values.certificate); // Append the file
                                }
                            
                                const response = (await apiPut(`/doctor/user/${doctorData?.user_id}`, formData)) as AxiosResponse;
                                
                                 if (!response?.data) {
                                   toast.error("Invalid response data!")
                                 }else{
                                   toast.success("Profile updated successfully!");
                                 }
                                
                              } catch (error: unknown) {
                                if (axios.isAxiosError(error)) {
                                  if (!error.response) {
                                    console.error("Network error - Please try again later!");
                                    toast.error("Network error - Please try again later.");
                                    return;
                                  }
                          
                                  console.error(
                                    `API Error: ${error.response.status} - ${
                                      error.response.data?.message || "Something went wrong"
                                    }`
                                  );
                                  toast.error(
                                    `Error: ${error.response.data?.message || "Some error occured please try again!"}`
                                  );
                                } else if (error instanceof Error) {
                                  console.error("Unexpected error:", error.message);
                                  toast.error("Something went wrong. Please try again.");
                                } else {
                                  console.error("An unknown error occurred:", error);
                                  if(error === "Only .png, .jpg and .jpeg format allowed!"){
                                    toast.error(error);
                                  }else{
                                    toast.error("Unexpected issue. Please refresh the page.");
                                  }
                                }
                              }finally{
                                setIsEditing(false);
                                setLoading(false);
                                handleGetUserData();
                              }
                            }}
                          >
                            {({
                              values,
                              handleChange,
                              handleReset,
                              errors,
                              touched,
                            }) => (
                              <Form
                                className="edit-profile-wr"
                                style={{
                                  display: isEditing ? "block" : "none",
                                }}
                              >
                                <div className="top-input-wr">
                                  <div>
                                    <label> Full Name</label>
                                    {errors.full_name && touched.full_name && (
                                      <strong className="error">
                                        {errors.full_name}
                                      </strong>
                                    )}
                                    <Field
                                      type="text"
                                      placeholder="Enter Full Name"
                                      name="full_name"
                                      value={values.full_name}
                                      onChange={handleChange}
                                    />

                                  </div>
                                  <div>
                                    <label> Email </label>
                                    <Field
                                      type="email"
                                      placeholder="Enter Email"
                                      name="email"
                                      value={values.email}
                                      disabled
                                    />
                                  </div>
                                  <div>
                                    <label> Specialist </label>
                                    {errors.specialist &&
                                      touched.specialist && (
                                        <strong className="error">
                                          {errors.specialist}
                                        </strong>
                                      )}
                                    <Field
                                      type="text"
                                      placeholder="Enter Specialist"
                                      name="specialist"
                                      value={values.specialist}
                                      onChange={handleChange}
                                    />

                                  </div>
                                </div>

                                <div className="middle-input-wr">
                                  <div>
                                    <label> Phone </label>
                                    {errors.mobile && touched.mobile && (
                                      <strong className="error">
                                        {errors.mobile}
                                      </strong>
                                    )}
                                    <Field
                                      type="text"
                                      placeholder="Enter Phone"
                                      name="mobile" // Use "mobile" here
                                      value={values.mobile}
                                      onChange={handleChange}
                                    />

                                  </div>
                                  <div>
                                    <label> Location </label>
                                    {errors.location && touched.location && (
                                      <strong className="error">
                                        {errors.location}
                                      </strong>
                                    )}
                                    <Field
                                      type="text"
                                      placeholder="Enter Location"
                                      name="location"
                                      value={values.location}
                                      onChange={handleChange}
                                    />

                                  </div>
                                  {/* <div>
                                      <FileUploadField/>
                                  </div> */}
                                </div>

                                <div className="bottom-input-wr">
                                  <div>
                                    <input
                                      type="submit"
                                      value={loading ? "Updating..." : "Update Profile" }
                                    />
                                  </div>
                                  {/* <div>
                                    <input
                                      type="reset"
                                      value="Cancel"
                                      onClick={() => {
                                        handleReset();
                                        handleToggle(); // Assuming handleToggle resets the form visibility
                                      }}
                                    />
                                  </div> */}
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      )}

                      {activeTab === 2 && (
                        <div className="form-tab">
                          {/* password form starts from here */}
                          <Formik
                            initialValues={{
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: "",
                            }}
                            validationSchema={passwordSchema}
                            onSubmit={handlePasswordFormSubmit}
                          >
                            {({ values, handleChange, handleReset }) => (
                              <Form>
                                {/* Input Top Wrapper */}
                                <div className="top-input-wr">
                                  <div style={{ position: "relative" }}>
                                    <label>Current Password</label>
                                    <ErrorMessage
                                      name="currentPassword"
                                      component="span"
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        position: "relative",
                                      }}
                                    >
                                      <Field
                                        type={
                                          passwordVisibility.currentPassword
                                            ? "text"
                                            : "password"
                                        }
                                        value={values.currentPassword}
                                        onChange={handleChange}
                                        name="currentPassword"
                                        placeholder="Enter Current Password"
                                      />

                                      <img
                                        onClick={() =>
                                          togglePasswordVisibility(
                                            "currentPassword"
                                          )
                                        }
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          cursor: "pointer",
                                        }}
                                        src={
                                          passwordVisibility.currentPassword
                                            ? "/parents/close-eye-img.svg"
                                            : "/parents/open-eye-img.svg"
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Input Middle Wrapper */}
                                <div className="middle-input-wr">
                                  <div style={{ position: "relative" }}>
                                    <label>New Password</label>
                                    <ErrorMessage
                                      name="newPassword"
                                      component="span"
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        position: "relative",
                                      }}
                                    >
                                      <Field
                                        type={
                                          passwordVisibility.newPassword
                                            ? "text"
                                            : "password"
                                        }
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        name="newPassword"
                                        placeholder="Enter New Password"
                                      />

                                      <img
                                        onClick={() =>
                                          togglePasswordVisibility(
                                            "newPassword"
                                          )
                                        }
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          cursor: "pointer",
                                        }}
                                        src={
                                          passwordVisibility.newPassword
                                            ? "/parents/close-eye-img.svg"
                                            : "/parents/open-eye-img.svg"
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div style={{ position: "relative" }}>
                                    <label>Confirm Password</label>
                                    <ErrorMessage
                                      name="confirmPassword"
                                      component="span"
                                    />
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        position: "relative",
                                      }}
                                    >
                                      <Field
                                        type={
                                          passwordVisibility.confirmPassword
                                            ? "text"
                                            : "password"
                                        }
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Enter Confirm Password"
                                      />

                                      <img
                                        onClick={() =>
                                          togglePasswordVisibility(
                                            "confirmPassword"
                                          )
                                        }
                                        style={{
                                          position: "absolute",
                                          right: "10px",
                                          cursor: "pointer",
                                        }}
                                        src={
                                          passwordVisibility.confirmPassword
                                            ? "/parents/close-eye-img.svg"
                                            : "/parents/open-eye-img.svg"
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                {/* Input Bottom Wrapper */}
                                <div className="bottom-input-wr">
                                  <div>
                                    <input
                                      type="submit"
                                      value={loading ? "Updating..." : "Update Password" }

                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="submit"
                                      value={"cancel"}
                                      onClick={handleReset}
                                    />
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </>}
              </div>
            </div>
          

            {/* footer-area */}
            <div className="doctors-footer-wr">
              <h6>
                © 2025. Vigour360. Developed by{" "}
                <Link href="https://www.immersiveinfotech.com/">
                  Immersive infotech
                </Link>
              </h6>
            </div>
          </div>
        </div>
      </section>

      {/* toast container to show toasts */}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default SettingComponent;
