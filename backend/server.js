import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "./db.js";
import questionRoutes from "./routes/ques.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use("/api/questions", questionRoutes);

app.post("/api/gpt-answer", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    console.log("No question received in body");
    return res.status(400).json({ error: "No question provided" });
  }

  console.log("Request Question:", question);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(`Give a short and relevant interview answer for: ${question}`);
    const answer = result.response.text();
    console.log("Answer generated:", answer);
    res.json({ answer });
  } catch (err) {
    console.error("GEMINI API Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("server running on port 5000"));