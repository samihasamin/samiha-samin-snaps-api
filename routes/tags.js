import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/", (req, res) => {
  const tags = JSON.parse(
    fs.readFileSync(path.resolve("data/tags.json"), "utf-8")
  );
  res.json(tags);
});

export default router;
