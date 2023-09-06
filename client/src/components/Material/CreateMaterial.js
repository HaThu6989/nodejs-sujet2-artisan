import React from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

function CreateMaterial(props) {
  const { getAllMaterials, getAllFurnitures, furnitureId, getOneFurniture } =
    props;
  const [title, setTitle] = useState("");
  const [compagny, setCompagny] = useState("");
  const [furniture, setFurniture] = useState(furnitureId);
  const [quantity, setQuantity] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMaterial = {
      title,
      compagny,
      furniture,
      quantity,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/createMaterial`, newMaterial)
      .then((response) => {
        console.log("response.data", response.data);
        setTitle("");
        setCompagny("");
        setQuantity("");

        getAllMaterials();
        getAllFurnitures();
        getOneFurniture();
        navigate(`/furnitures/${furnitureId}`);
        handleClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Ajouter une matière
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
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
            <Button variant="secondary" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              Créer !
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default CreateMaterial;
