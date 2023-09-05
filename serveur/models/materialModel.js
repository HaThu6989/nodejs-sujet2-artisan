import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const materialSchema = new Schema({
  title: {
    type: String,
    enum: ["frene", "chene", "noyer", "acier", "inox", "aluminum", "plastic"],
  },
  compagny: { type: String, enum: ["Bbois", "MetaLo", "pPlastique"] },
  furniture: { type: Schema.Types.ObjectId, ref: "Furniture" },
  quantity: { type: Number },
});

const MaterialModel = model("Material", materialSchema);

export default MaterialModel;
