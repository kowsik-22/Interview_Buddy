import express from "express";
import { Question } from "../model/Question.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const role = req.query.role;
  console.log("ROLE RECEIVED:", role);
    try {
      const technical = await Question.aggregate([
      { $match: { 
          role: { $regex: new RegExp("^" + role.trim() + "$", "i") }, 
          type: "technical" 
        } 
      },
      { $sample: { size: 7 } }
    ]);

  const behavioral = await Question.aggregate([
      { $match: { 
          role: { $regex: new RegExp("^" + role.trim() + "$", "i") }, 
          type: "behavioral" 
        } 
      },
      { $sample: { size: 3 } }
    ]);

    res.json({ technical, behavioral });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;