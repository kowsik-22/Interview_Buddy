import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  role: String,               // e.g., "SDE"
  type: String,               // "technical" or "behavioral"
  question: String,
  difficulty: String          // "Easy", "Medium", "Hard"
});

export const Question = mongoose.model("Question", questionSchema);