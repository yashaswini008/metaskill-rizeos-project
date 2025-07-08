import express from "express";
import Job from "../models/Job.js";


const router = express.Router();

// ➕ POST a new job
router.post("/", async (req, res) => {
  try {
    const { title, description, skills, budget, userId } = req.body;

    const job = new Job({
      title,
      description,
      skills,
      budget,
      createdBy: userId,
    });

    await job.save();
    res.status(201).json({ msg: "Job posted", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
