// routes/ai.routes.js
import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/extract-skills", async (req, res) => {
  const { bio } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Extract a list of skills from the given bio.",
        },
        {
          role: "user",
          content: bio,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    const extractedSkills = aiResponse.split(",").map((s) => s.trim());

    res.json({ skills: extractedSkills });
  } catch (error) {
    console.error("Skill extraction error:", error);
    res.status(500).json({ error: "Skill extraction failed" });
  }
});

export default router;
