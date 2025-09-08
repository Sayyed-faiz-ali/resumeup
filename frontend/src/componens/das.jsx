import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, Link, useParams } from "react-router-dom";
import LoadingDots from "./loadin";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  // const { resumeId } = useParams();
   

  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResumes = resumes.filter(resume =>
    resume && resume.title && resume.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch all resumes for the user
  useEffect(() => {
    const fetchResumes = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const config = { headers: { "x-auth-token": token } };
        const res = await axios.get(`http://localhost:5000/api/data`, config);
        setResumes(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch resumes:", err.response?.data || err.message);
        setError(err.response?.data?.msg || "Server Error");
        setLoading(false);
      }
    };

    fetchResumes();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Delete resume
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:5000/api/data/${id}`, {
      headers: { "x-auth-token": token }
    });
    alert("Resume deleted successfully!");
    setResumes(resumes.filter((resume) => resume._id !== id));
  } catch (err) {
    console.error("Failed to delete resume:", err.response?.data || err.message);
    alert(err.response?.data?.msg || "Failed to delete resume");
  }
};


  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingDots />   
    </div>
  );

  if (error) return <p className="p-10 text-red-600">{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center space-x-4">
          <img className="w-20 h-20 rounded-full" src="/logo.png" alt="Logo" />
          <motion.h2
            className="text-3xl font-semibold text-blue-600"
            initial={{ y: 0 }}
            animate={{ y: [0, -50, 0] }} 
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            Dashboard
          </motion.h2>
        </div>
        <div className="flex space-x-4">
          <Link to="/create">
            <button className="bg-blue-600 text-white py-2 px-5 rounded-md font-medium hover:bg-blue-700">
              Create New Resume
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-5 rounded-md font-medium hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Resume List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search resumes..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex flex-col space-y-4">
          {filteredResumes.length > 0 ? (
            filteredResumes.map((resume) => (
              <div
                key={resume._id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    src={resume.avatar || "/logo.png"}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {resume.title || "Untitled Resume"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Last updated:{" "}
                      {resume.startDate && !isNaN(new Date(resume.startDate))
                        ? new Date(resume.startDate).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link to={`/view/${resume._id}`}>
                    <button className="bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-md hover:bg-blue-200">
                      View
                    </button>
                  </Link>
                  <Link to={`/edit/${resume._id}`}>
                    <button className="bg-yellow-100 text-yellow-600 font-medium py-2 px-4 rounded-md hover:bg-yellow-200">
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(resume._id)}
                    className="bg-red-100 text-red-600 font-medium px-4 py-2 rounded hover:bg-red-200"
                  >
                    Delete Resume
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No resumes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
