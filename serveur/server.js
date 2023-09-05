import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import FurnitureRoute from "./routes/furniture.routes.js";
import MaterialRoute from "./routes/material.routes.js";

dotenv.config();

const { MONGODB_URL, PORT, FRONT_END_URL } = process.env;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: FRONT_END_URL,
  })
);

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Home</h1>`);
});

app.use("/", FurnitureRoute);
app.use("/", MaterialRoute);
