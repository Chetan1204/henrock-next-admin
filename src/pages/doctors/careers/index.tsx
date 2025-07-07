import React, { useEffect, useState } from "react";
import DoctorNavBar from "components/doctors/Navbar";
import axios from "axios";

interface CareerItem {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  jobRole: string;
  message: string;
  cv: string;
  createdAt?: string;
}

const ITEMS_PER_PAGE = 10;

const Career: React.FC = () => {
  const [careerData, setCareerData] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/career");
        setCareerData(res.data.data);
      } catch (err: any) {
        console.error("Failed to fetch career data", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCareerData();
  }, []);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = careerData.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(careerData.length / ITEMS_PER_PAGE));

  return (
    <section className="doctor-dashboard-wr">
      <div className="doctor-dashboard-inner-container">
        <div className="doctors-right-wr">
          <DoctorNavBar />
          <div className="doctors-main-content-wr" style={{ padding: "15px", marginTop: "0px", marginBottom: "40px" }}>
            <h2
              className="text-xl font-bold mb-4"
              style={{
                marginBottom: 15,
                padding: "8px 10px",
                borderRadius: 3,
                color: "#000",
                fontSize: 20,
              }}
            >
              Career Applications
            </h2>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : careerData.length === 0 ? (
              <p>No career submissions found.</p>
            ) : (
              <>
                <div className="overflow-auto">
                  <table className="career-table">
                    <thead>
                      <tr style={{backgroundColor:"#23477f", color:"#fff"}}>
                        <th>S.no</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Education</th>
                        <th>Experience</th>
                        <th>Job Role</th>
                        <th>Message</th>
                        <th>CV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.map((item, index) => (
                        <tr key={item._id}>
                          <td>{startIndex + index + 1}</td>
                          <td>{item.fullName}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.education}</td>
                          <td>{item.experience}</td>
                          <td>{item.jobRole}</td>
                          <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {item.message}
                          </td>
                          <td>
                            <a
                              href={`http://localhost:5000/uploads/${item.cv}`}
                              download
                              className="text-blue-500 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View CV
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pagination-container">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-btn ${currentPage === index + 1 ? "pagination-active" : ""}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
