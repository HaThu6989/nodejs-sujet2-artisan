import React, { useState } from "react";
import deleteIcon from "../../assets/delete-icon.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteMaterial(props) {
  const {
    material,
    furnitureId,
    getAllMaterials,
    getAllFurnitures,
    getOneFurniture,
  } = props;
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleShowDelete = () => {
    setShowDelete(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteMaterial/${material._id}`)
      .then((response) => {
        console.log(response.data);

        getAllMaterials();
        getAllFurnitures();
        getOneFurniture();
        navigate(`/furnitures/${furnitureId}`);
        handleCloseDelete();
      });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => handleShowDelete(material)}
        data-toogle="tooltip"
        data-placement="top"
        title="Supprimer matière"
      >
        <img src={deleteIcon} alt="delete" width="17" height="17" />
      </button>

      <Modal show={showDelete}>
        <Modal.Header>
          <Modal.Title>Suppression</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="alert alert-warning">
            Voulez-vous vraiment supprimer ces données?
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteMaterial;
