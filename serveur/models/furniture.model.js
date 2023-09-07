import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const furnitureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  model: {
    type: String,
    enum: ["armoire", "etagere"],
  },
  materials: [{ type: Schema.Types.ObjectId, ref: "Material" }],
});

const FurnitureModel = model("Furniture", furnitureSchema);

export default FurnitureModel;
