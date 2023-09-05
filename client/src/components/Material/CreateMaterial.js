import React from "react";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import { useNavigate } from "react-router-dom";

function CreateMaterial(props) {
  const { getAllMaterials, getAllFurnitures, furnitureId } = props;
  const [title, setTitle] = useState("");
  const [compagny, setCompagny] = useState("");
  const [furniture, setFurniture] = useState(furnitureId);
  const [quantity, setQuantity] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMaterial = { title, compagny, furniture, quantity };

    axios
      .post(`${process.env.REACT_APP_API_URL}/createMaterial`, newMaterial)
      .then(() => {
        setTitle("");
        setCompagny("");
        setQuantity("");

        getAllMaterials();
        getAllFurnitures();

        navigate(`/furnitures/${furnitureId}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <>
        <Container className="my-4">
          <Card>
            <Card.Header as="h6" className="font-link">
              Ajouter une matière
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
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

                  <Button variant="success" type="submit" className="my-2">
                    Créer !
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </>
    </div>
  );
}

export default CreateMaterial;
