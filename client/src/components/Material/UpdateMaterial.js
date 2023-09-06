import React, { useState } from "react";
import updateIcon from "../../assets/update-icon.jpg";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Update(props) {
  const {
    material,
    furnitureId,
    getAllMaterials,
    getAllFurnitures,
    getOneFurniture,
  } = props;
  const [title, setTitle] = useState();
  const [compagny, setCompagny] = useState();
  const [furniture, setFurniture] = useState(furnitureId);
  const [quantity, setQuantity] = useState();
  const [showUpdate, setShowUpdate] = useState(false);

  const navigate = useNavigate();

  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };

  const handleShowUpdate = () => {
    setShowUpdate(true);
    setTitle(material.title);
    setCompagny(material.compagny);
    setQuantity(material.quantity);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUpdate = { title, compagny, quantity };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/updateMaterial/${material._id}`,
        newUpdate
      )
      .then((response) => {
        console.log(response.data);

        getAllMaterials();
        getAllFurnitures();
        getOneFurniture();
        navigate(`/furnitures/${furnitureId}`);
        handleCloseUpdate();
      });
  };
  return (
    <>
      <button
        type="button"
        onClick={() => handleShowUpdate(material)}
        data-toogle="tooltip"
        data-placement="top"
        title="Mettre à jour matière"
      >
        <img src={updateIcon} alt="update" width="17" height="17" />
      </button>

      <Container>
        <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop="static"
          keyboard={false}
        >
          <Form className="my-4" onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group controlId="formBasicSelect" className="my-1">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  as="select"
                  value={title}
                  name="title"
                  onChange={(e) => setTitle(e.target.value)}
                >
                  <option value="">Choisir une matière</option>
                  <option value="frene">Frêne</option>
                  <option value="chene">Chêne</option>
                  <option value="noyer">Noyer</option>
                  <option value="acier">Acier </option>
                  <option value="inox">Inox</option>
                  <option value="aluminum">Aluminum</option>
                  <option value="plastic">Plastique</option>
                </Form.Control>
              </Form.Group>
              {["frene", "chene", "noyer"].includes(title) && (
                <Form.Group controlId="formBasicSelect" className="my-4">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control
                    as="select"
                    value={compagny}
                    name="compagny"
                    required
                    onChange={(e) => setCompagny(e.target.value)}
                  >
                    <option value="">Choisir une entreprise</option>
                    <option value="Bbois">Bbois</option>
                  </Form.Control>
                </Form.Group>
              )}

              {["acier", "inox", "aluminum"].includes(title) && (
                <Form.Group controlId="formBasicSelect" className="my-4">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control
                    as="select"
                    value={compagny}
                    name="compagny"
                    onChange={(e) => setCompagny(e.target.value)}
                  >
                    <option value="">Choisir une entreprise</option>
                    <option value="MetaLo">MetaLo</option>
                  </Form.Control>
                </Form.Group>
              )}

              {title === "plastic" && (
                <Form.Group controlId="formBasicSelect" className="my-4">
                  <Form.Label>Entreprise</Form.Label>
                  <Form.Control
                    as="select"
                    value={compagny}
                    name="compagny"
                    onChange={(e) => setCompagny(e.target.value)}
                  >
                    <option value="">Choisir une entreprise</option>
                    <option value="pPlastique">pPlastique</option>
                  </Form.Control>
                </Form.Group>
              )}

              <Form.Group controlId="formBasicSelect" className="my-4">
                <Form.Label>Quantité</Form.Label> <br />
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Fermer
              </Button>
              <Button variant="primary" type="submit">
                Mettre à jour !
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
    </>
  );
}

export default Update;
