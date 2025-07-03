"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./DoctorsStyles.css";
import "./DoctorsResponsiveStyles.css";

import DoctorNavBar from "./Navbar";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { apiGet } from "../../utils/api";
import Loader from "components/Loader";
import { Bounce, toast, ToastContainer } from "react-toastify";
// import axios, { AxiosResponse } from "axios";
import NoDataFound from "./NoDataComponent";
import Contact from "pages/doctors/contact";

const DoctorsDashboard: React.FC = () => {
  interface SchoolContact {
    school_contact_id: number;
    contact_name: string;
    contact_mobile: string;
  }

  interface Test {
    test_id: string;
    test_name: string;
  }

  interface School {
    full_name: string;
    email: string;
    mobile: string | null;
    location: string;
    status: number;
    user_id: number;
    unique_prefix: string;
    school_logo: string;
    test_ids: string; 
    test_names: string;
    contact_list: SchoolContact[];
    tests: Test[];
  }

  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterResultloading, setFilterResultLoading] = useState(false);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);

  const [schoolList, setSchoolList] = useState<School[]>([]);
  const [page, setPage] = useState<number>(1);

  const [searchFilters, setSearchFilters] = useState({
    schoolName: "",
    prefix: "",
    email: "",
    location: "",
    sortByNew: "new",
  });

  // Handle modal open
  const handleSpocClick = (school: School) => {
    setSelectedSchool(school);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSchool(null);
  };

  

 


  
const handleSearchChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value } = e.target;
  setSearchFilters((prev) => ({ ...prev, [name]: value }));
};

  useEffect(() => {
   
  }, []);





  return (
    <>
      <section className="doctor-dashboard-wr">
        <div className="doctor-dashboard-inner-container">
          {/* left wr */}
        

          {/* right wr */}
          <div className="doctors-right-wr " style={{marginTop:"-17px"}}>
            {/* header wr */}
            {/* <DoctorNavBar /> */}

            {/* main content area */}
            <div className="doctors-main-content-wr" style={{marginTop:"19px"}}>

              {/* school list wr */}
              <div style={{marginTop:"20px"}} className="school-list-wr">
                <div
                  className="school-list-cont"
                  style={{
                    position: "relative",
                    height: `${
                      filteredSchools && filteredSchools.length < 5
                        ? "fit-content"
                        : schoolList && schoolList.length < 5
                        ? "fit-content"
                        : ""
                    }`,
                  }}
                >
                  {filterResultloading === true ? (
                    <div className="loader-parent-container-medical-modules">
                      <Loader />
                    </div>
                  ) : (
                    <></>
                  )}

                 <Contact/>

                </div>


                {/* Modal */}
                {isModalOpen && selectedSchool && (
                  <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                      <button className="close-button" onClick={closeModal}>
                        &times;
                      </button>
                      <h4 className="modal-title">Spoc</h4>
                      <div className="modal-table-wr">
                        <table>
                          <thead>
                            <tr className="school-list-table-heading-wr">
                              <th>S.no</th>
                              <th>Name</th>
                              <th>Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedSchool.contact_list.map(
                              (contact, contactIndex) => {
                                return (
                                  <tr key={contact.school_contact_id}>
                                    <td>{contactIndex + 1}</td>
                                    <td>{contact.contact_name}</td>
                                    <td>{contact.contact_mobile}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* footer-area */}
            <div className="doctors-footer-wr">
              <h6>
                © 2025. henrockstructureassociates. Developed by {""} 
                  <Link href="https://www.immersiveinfotech.com/">
                    Immersive infotech
                </Link>
              </h6>
            </div>
          </div>
        </div>
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
      </section>
    </>
  );
};

export default DoctorsDashboard;
