import express from "express";
import {
  createMaterial,
  deleteMaterial,
  getAllMaterial,
  getOneMaterial,
  updateMaterial,
} from "../controllers/material.controller.js";

const router = express.Router();

router.get("/materials", getAllMaterial);
router.get("/materials/:materialId", getOneMaterial);
router.post("/createMaterial", createMaterial);
router.put("/updateMaterial/:materialId", updateMaterial);
router.delete("/deleteMaterial/:materialId", deleteMaterial);

export default router;
