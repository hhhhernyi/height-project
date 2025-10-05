import dotenv from "dotenv";
dotenv.config();
console.log("Supabase URL:", process.env.SUPABASE_URL);

import express from "express";
import cors from "cors";
import heightsRouter from "./routes/heights";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/heights", heightsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});