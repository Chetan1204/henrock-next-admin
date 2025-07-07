import DoctorNavBar from "components/doctors/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";

type ContactItem = {
  _id: string;
  name: string;
  email: string;
  companyName: string;
  subject: string;
  phone: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

const ITEMS_PER_PAGE = 10;

const Contact: React.FC = () => {
  const [contactData, setContactData] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setContactData(res.data.data);
      } catch (err: any) {
        console.error("Error fetching contact data", err);
        setError("Failed to load contact data");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = contactData.slice(startIndex, endIndex);
  const totalPages = Math.max(1, Math.ceil(contactData.length / ITEMS_PER_PAGE));

  return (
    <section className="doctor-dashboard-wr">
      <div className="doctor-dashboard-inner-container">
        <div className="doctors-right-wr">
          <DoctorNavBar />
          <div className="doctors-main-content-wr" style={{ padding: "15px", marginTop: "-31px", marginBottom: "40px" }}>
            <div style={{ marginTop: "20px" }}>
              <h2 className="text-xl font-bold mb-4"
                style={{
                  marginBottom: 15,
                  padding: "8px 10px",
                  borderRadius: 3,
                  color: "#000",
                  fontSize: 20,
                }}>
                Contact
              </h2>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : contactData.length === 0 ? (
                <p>No contact submissions found.</p>
              ) : (
                <>
                  <div className="overflow-auto">
                    <table className="contact-table">
                      <thead>
                        <tr style={{backgroundColor:"#23477f", color:"#fff"}}>
                          <th>S.no</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Company Name</th>
                          <th>Subject</th>
                          <th>Phone</th>
                          <th>Message</th>
                          <th>Created At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((item, index) => (
                          <tr key={item._id}>
                            <td>{startIndex + index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.companyName}</td>
                            <td>{item.subject}</td>
                            <td>{item.phone}</td>
                            <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {item.message}
                            </td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination controls */}
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
      </div>
    </section>
  );
};

export default Contact;
