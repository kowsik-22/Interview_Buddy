import dotenv from "dotenv";
import { connectDB } from "../db.js";
import { Question } from "../model/Question.js";

dotenv.config();
await connectDB();

const all = await Question.find({});
console.log("All questions in DB:");
console.log(JSON.stringify(all, null, 2));
process.exit();
