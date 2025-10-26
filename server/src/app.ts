// add basic express setup
import express from "express";
import cors from "cors";
import { geocodeRouter } from "./routes/geocode";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use(express.json());

app.use("/api/geocode", geocodeRouter);

// static frontend
app.use(express.static(path.join(__dirname, "../public")));

export default app;
