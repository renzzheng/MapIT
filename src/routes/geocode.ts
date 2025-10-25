import { Router } from "express";

export const geocodeRouter = Router();

geocodeRouter.post("/", (req, res) => {
  const { address } = req.body;
  res.json({ message: `You sent: ${address}` });
});
