import express from "express";
import {
  createFurniture,
  deleteFurniture,
  getAllFurnitures,
  getOneFurniture,
  updateFurniture,
} from "../controllers/furniture.controller.js";

const router = express.Router();

router.get("/furnitures", getAllFurnitures);
router.get("/furnitures/:furnitureId", getOneFurniture);
router.post("/createFurniture", createFurniture);
router.put("/updateFurniture/:furnitureId", updateFurniture);
router.delete("/deleteFurniture/:furnitureId", deleteFurniture);

export default router;
