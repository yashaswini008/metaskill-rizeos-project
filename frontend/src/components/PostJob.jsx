import React, { useState } from "react";
import axios from "axios";

const PostJob = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    budget: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user || !user._id) {
      alert("Please login first.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/jobs", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
        userId: user._id,
      });

      alert("Job posted successfully!");
      setForm({ title: "", description: "", skills: "", budget: "" });
    } catch (err) {
      console.error(err);
      alert("Job posting failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>

      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        rows="4"
      />

      <input
        type="text"
        name="skills"
        placeholder="Required Skills (comma separated)"
        value={form.skills}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <input
        type="text"
        name="budget"
        placeholder="Budget"
        value={form.budget}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post Job
      </button>
    </div>
  );
};

export default PostJob;
