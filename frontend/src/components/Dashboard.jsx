// Dashboard.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard({ user, setUser }) {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const navigate = useNavigate();

  const handleExtract = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/ai/extract-skills", { bio });
      setSkills(res.data.skills || []);
    } catch (error) {
      console.error("Skill extraction failed", error);
      alert("Skill extraction failed");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("profile", selectedFile);

    try {
      const res = await axios.post("http://localhost:5000/api/upload/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedUrl(res.data.url);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Welcome, {user?.name} 👋</h2>

      {user?.wallet && (
        <p className="text-sm text-gray-600 mb-4">
          ✅ Connected to wallet: <span className="font-mono">{user.wallet}</span>
        </p>
      )}

      <div className="mb-4">
        <label className="block font-medium">Upload Profile Picture</label>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
          Upload
        </button>
        {uploadedUrl && (
          <img
            src={uploadedUrl}
            alt="Profile"
            className="mt-4 w-32 h-32 rounded-full object-cover"
          />
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Paste your bio here...</label>
        <textarea
          className="w-full p-2 border rounded"
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <button onClick={handleExtract} className="bg-green-500 text-white px-3 py-1 rounded mt-2">
          Extract Skills with AI
        </button>
        {skills.length > 0 && (
          <ul className="list-disc list-inside mt-2 text-sm">
            {skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
