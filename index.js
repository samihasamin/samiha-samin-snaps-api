import express from "express";
import cors from "cors";
import photoRoutes from "./routes/photos";
import tagsRoutes from "./routes/tags";
import path from "path";
import fs from "fs";
import "dotenv/config";
import photosData from "./data/photos.json";

const app = express();

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

app.use("/photos", express.static("public/images"));

app.use("/photos", photoRoutes);
app.use("/tags", tagsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
