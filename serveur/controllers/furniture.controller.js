import FurnitureModel from "../models/furnitureModel.js";
import MaterialModel from "../models/materialModel.js";

export const getAllFurnitures = (req, res) => {
  FurnitureModel.find()
    .populate("materials")
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("error getting list of furnitures", err);
      res.status(500).json({
        message: "error getting list of furnitures",
        error: err,
      });
    });
};

export const getOneFurniture = (req, res) => {
  const { furnitureId } = req.params;

  FurnitureModel.findById(furnitureId)
    .populate("materials")
    .then((furniture) => res.json(furniture))
    .catch((err) => {
      console.log("error getting details of a furniture", err);
      res.status(500).json({
        message: "error getting details of a furniture",
        error: err,
      });
    });
};

export const createFurniture = async (req, res) => {
  const { title, description, model, materials } = req.body;

  const newFurniture = { title, description, model, materials };

  await FurnitureModel.create(newFurniture)
    .then((furnitureCreated) => {
      return MaterialModel.updateMany(
        { _id: { $in: furnitureCreated.materials } },
        { $push: { furnitures: furnitureCreated._id } },
        { $set: { claimed: true } }
      );
    })
    .then(() => {
      return FurnitureModel.find()
        .limit(1)
        .sort({ $natural: -1 })
        .then((response) => res.status(201).json(response));
    })
    .catch((err) => {
      res.status(500).json({
        message: "error updating Material after changing Furniture",
        error: err,
      });
    });
};

export const updateFurniture = (req, res) => {
  const { furnitureId } = req.params;

  FurnitureModel.findByIdAndUpdate(furnitureId, req.body, { new: true })
    .populate("materials")
    .then((updatedFurniture) => res.json(updatedFurniture))
    .catch((err) => {
      console.log("error updating furniture", err);
      res.status(500).json({
        message: "error updating furniture",
        error: err,
      });
    });
};

export const deleteFurniture = (req, res) => {
  const { furnitureId } = req.params;

  FurnitureModel.findByIdAndRemove(furnitureId)
    .then((furnitureDeleted) => {
      return MaterialModel.updateMany(
        { _id: { $in: furnitureDeleted.materials } },
        { $pull: { furnitures: furnitureId } }
      );
    })
    .then(() =>
      res.json({
        message: `furniture with id ${furnitureId} & all associated lessons were removed successfully.`,
      })
    )
    .catch((err) => {
      res.status(500).json({
        message: "error deleting furniture",
        error: err,
      });
    });
};
