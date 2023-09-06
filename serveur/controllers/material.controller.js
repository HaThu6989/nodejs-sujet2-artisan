import MaterialModel from "../models/materialModel.js";
import FurnitureModel from "../models/furnitureModel.js";

export const getAllMaterial = (req, res) => {
  MaterialModel.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("error getting list of materials", err);
      res.status(500).json({
        message: "error getting list of materials",
        error: err,
      });
    });
};

export const getOneMaterial = (req, res) => {
  const { materialId } = req.params;

  MaterialModel.findById(materialId)
    .then((material) => res.json(material))
    .catch((err) => {
      console.log("error getting details of a material", err);
      res.status(500).json({
        message: "error getting details of a material",
        error: err,
      });
    });
};

export const createMaterial = (req, res) => {
  const { title, compagny, furniture, quantity } = req.body;
  const newMaterial = { title, compagny, furniture, quantity };
  MaterialModel.create(newMaterial)
    .then((materialCreated) => {
      return FurnitureModel.findByIdAndUpdate(
        materialCreated.furniture,
        { $push: { materials: materialCreated._id } },
        { $set: { claimed: true } }
      );
    })
    .then((response) => {
      res.status(201).json(response);
    })
    // .then(() => {
    //   return MaterialModel.find()
    //     .limit(1)
    //     .sort({ $natural: -1 })
    //     .then((response) => res.status(201).json(response));
    // })
    .catch((err) => {
      res.status(500).json({
        message: "error creating a new material",
        error: err,
      });
    });
};

export const updateMaterial = (req, res) => {
  const { materialId } = req.params;

  MaterialModel.findByIdAndUpdate(materialId, req.body, { new: true })
    .then((updatedMaterial) => res.json(updatedMaterial))
    .catch((err) => {
      console.log("error updating material", err);
      res.status(500).json({
        message: "error updating material",
        error: err,
      });
    });
};

// OK
export const deleteMaterial = (req, res) => {
  const { materialId } = req.params;

  MaterialModel.findByIdAndRemove(materialId)
    .then((materialDeleted) => {
      return FurnitureModel.updateMany(
        { _id: materialDeleted.furniture },
        { $pull: { materials: materialDeleted._id } }
      );
    })
    .then(() =>
      res.json({
        message: `material with id ${materialId}.`,
      })
    )
    .catch((err) => {
      res.status(500).json({
        message: "error deleting material",
        error: err,
      });
    });
};
