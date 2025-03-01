import express from "express";
import fs from "fs";
import tagsData from "../data/tags.json";

const router = express.Router();

router.get("/", (req, res) => {
  const tags = JSON.parse(fs.readFileSync(tagsData, "utf-8"));
  res.json(tags);
});

export default router;
