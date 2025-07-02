import express from "express";
import { Question } from "../model/Question.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const role = req.query.role;
  console.log("👉 ROLE RECEIVED:", role);
  try {
    const technical = await Question.find({ 
      role: { $regex: new RegExp("^" + role.trim() + "$", "i") }, 
      type: "technical" 
    });
    const behavioral = await Question.find({ 
      role: { $regex: new RegExp("^" + role.trim() + "$", "i") }, 
      type: "behavioral" 
    });

    res.json({ technical, behavioral });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;