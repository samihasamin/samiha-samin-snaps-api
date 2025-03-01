import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import photosData from "../data/photos.json";

const router = express.Router();

const readPhotos = () => {
  const data = fs.readFileSync("../data/photos.json", "utf-8");
  return JSON.parse(data);
};

const writePhotos = (data) => {
  fs.writeFileSync(
    "../data/photos.json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );
};

router.get("/", (req, res) => {
  const photos = readPhotos();
  res.json(photos);
});

router.get("/:id", (req, res) => {
  const photos = readPhotos();
  const photo = photos.find((img) => img.id === req.params.id);
  if (!photo) return res.status(404).json({ error: "Photo not found" });

  res.json(photo);
});

router.get("/:id/comments", (req, res) => {
  const photos = readPhotos();
  const photo = photos.find((img) => img.id === req.params.id);
  if (!photo) return res.status(404).json({ error: "Photo not found" });

  res.json(photo.comments || []);
});

router.post("/:id/comments", (req, res) => {
  const { name, comment } = req.body;
  if (!name || !comment) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const photos = readPhotos();
  const photo = photos.find((img) => img.id === req.params.id);
  if (!photo) return res.status(404).json({ error: "Photo not found" });

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  const newComment = {
    id: uuidv4(),
    name,
    comment,
    date: formattedDate,
  };

  photo.comments = photo.comments || [];
  photo.comments.push(newComment);
  writePhotos(photos);

  res.json(newComment);
});

export default router;
