import React, { useEffect, useState } from "react";
import axios from "axios";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Job Feed</h2>

      {jobs.length === 0 ? (
        <p className="text-gray-600">No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded mb-4 shadow hover:shadow-md"
          >
            <h3 className="text-xl font-semibold text-blue-700">
              {job.title}
            </h3>
            <p className="text-gray-800">{job.description}</p>
            <p className="mt-2">
              <strong>Skills:</strong>{" "}
              {job.skills && job.skills.join(", ")}
            </p>
            <p>
              <strong>Budget:</strong> {job.budget}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Posted by: {job.createdBy?.name || "Unknown"} (
              {job.createdBy?.email || "N/A"})
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobFeed;
