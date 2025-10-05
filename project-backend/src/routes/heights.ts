import { Router } from "express";
import { supabase } from "../db/supabase";

const router = Router();

// GET /heights → fetch all rows
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("height_entries") // 👈 use the actual table name
    .select("*")
    .order("measurement_date", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST /heights → insert new row(s)
router.post("/", async (req, res) => {
  const { records, pin } = req.body;

  if (pin !== process.env.SECRET_PIN) {
    return res.status(403).json({ error: "Invalid PIN" });
  }

  if (!records || !Array.isArray(records)) {
    return res.status(400).json({ error: "Records must be an array" });
  }

  // Your table has columns: user_id, measurement_date, height_cm
  // So we need to map the incoming records accordingly
  const today = new Date().toISOString().split("T")[0];
  const rows = records.map((r) => ({
    user_id: r.name,              // e.g. "HY", "HP"
    measurement_date: today,
    height_cm: r.height,
  }));

  const { data, error } = await supabase.from("height_entries").insert(rows);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

export default router;