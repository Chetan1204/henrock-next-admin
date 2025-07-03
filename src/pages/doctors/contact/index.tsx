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

const Contact: React.FC = () => {
  const [contactData, setContactData] = useState<ContactItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setContactData(res.data.data);
      } catch (err: any) {
        console.error("Error fetching contact data", err);
        setError("Failed to load contact data");
      } finally {
        setLoading(false); // Make sure loading is set to false
      }
    };

    fetchContacts();
  }, []);

  return (
    <section className="doctor-dashboard-wr">
      <div className="doctor-dashboard-inner-container">
        <div className="doctors-right-wr">
          <DoctorNavBar />
          <div className="doctors-main-content-wr" style={{padding:"15px", marginTop:"33px"}}>
            <div style={{ marginTop: "20px" }} className="careers-table-wr">
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
                Contact
              </h2>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : contactData.length === 0 ? (
                <p>No contact submissions found.</p>
              ) : (
                <div className="overflow-auto">
                  <table className="career-table w-full border text-sm">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Company Name</th>
                        <th className="p-2 border">Subject</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Message</th>
                        <th className="p-2 border">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactData.map((item) => (
                        <tr key={item._id} className="hover:bg-gray-50">
                          <td className="p-2 border">{item.name}</td>
                          <td className="p-2 border">{item.email}</td>
                          <td className="p-2 border">{item.companyName}</td>
                          <td className="p-2 border">{item.subject}</td>
                          <td className="p-2 border">{item.phone}</td>
                          <td className="p-2 border">{item.message}</td>
                          <td className="p-2 border">
                            {new Date(item.createdAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
