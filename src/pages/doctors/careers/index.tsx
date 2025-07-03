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

const Career: React.FC = () => {
  const [careerData, setCareerData] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCareerData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/career");

        // ✅ API returns: { success: true, data: [...] }
        setCareerData(res.data.data);

        setLoading(false);
      } catch (err: any) {
        console.error("Failed to fetch career data", err);
        setError("Failed to load data");
        setLoading(false);
      }
    };

    fetchCareerData();
  }, []);

  return (
    <section className="doctor-dashboard-wr">
      <div className="doctor-dashboard-inner-container">
        <div className="doctors-right-wr">
          <DoctorNavBar />
          <div className="doctors-main-content-wr" style={{padding:"15px", marginTop:"33px"}}>
            <div style={{ marginTop: "20px" }} className="careers-table-wr">
              <h2 className="text-xl font-bold mb-4" style={{
                  marginBottom: 15,
                  padding: "8px 10px",
                  borderRadius: 3,
                 color: "#000",
                  fontSize: 20,
                }}>Career Applications</h2>

              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : careerData.length === 0 ? (
                <p>No career submissions found.</p>
              ) : (
                <div className="overflow-auto">
                  <table className="career-table w-full border text-sm">
                    <thead className="bg-gray-100 text-left">
                      <tr>
                        <th className="p-2 border">Full Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Education</th>
                        <th className="p-2 border">Experience</th>
                        <th className="p-2 border">Job Role</th>
                        <th className="p-2 border">Message</th>
                        <th className="p-2 border">CV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {careerData.map((item, index) => (
                        <tr key={item._id || index} className="hover:bg-gray-50">
                          <td className="p-2 border">{item. fullName}</td>
                          <td className="p-2 border">{item.email}</td>
                          <td className="p-2 border">{item.phone}</td>
                          <td className="p-2 border">{item.education}</td>
                          <td className="p-2 border">{item.experience}</td>
                          <td className="p-2 border">{item.jobRole}</td>
                          <td className="p-2 border">{item.message}</td>
                          <td className="p-2 border">
                            <a
                          href={`http://localhost:5000/uploads/${item.cv}`}
                          download
                          className="text-blue-500 underline"
                          target="_blank"
                           rel="noopener noreferrer"
                            >
                          Download CV
                              </a>

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

export default Career;
