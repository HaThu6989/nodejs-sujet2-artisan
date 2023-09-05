import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarMenu from "../../pages/NavbarMenu";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/esm/Card";
import Multiselect from "multiselect-react-dropdown";

function UpdateFurniture(props) {
  const { allMaterials, furnitures, getAllFurnitures } = props;
  const { furnitureId } = useParams();

  const furnitureDetails = furnitures?.find(
    (furniture) => furniture._id === furnitureId
  );

  console.log("furnitureDetails", furnitureDetails);

  const [title, setTitle] = useState(furnitureDetails.title);
  const [description, setDescription] = useState(furnitureDetails.description);
  const [model, setModel] = useState(furnitureDetails.model);
  const [materials, setMaterials] = useState(furnitureDetails.materials);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFurniture = {
      title,
      description,
      model,
      materials: materials?.map((elm) => elm._id),
    };

    console.log("newFurniture", newFurniture);

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/updateFurniture/${furnitureId}`,
        newFurniture
      )
      .then((response) => {
        getAllFurnitures();
        navigate("/furnitures");
      })
      .catch((e) => console.log("error updating furniture...", e));
  };

  return (
    <div>
      <>
        <NavbarMenu />

        <Container className="my-4">
          <Card>
            <Card.Header as="h4" className="font-link">
              Mise à jour
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={title}
                      required={true}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="my-4">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicSelect" className="my-4">
                    <Form.Label>Model</Form.Label>
                    <Form.Control
                      as="select"
                      value={model}
                      name="model"
                      onChange={(e) => setModel(e.target.value)}
                    >
                      <option value="">Choisir un model</option>
                      <option value="armoire">Armoire</option>
                      <option value="etagere">Etagère</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="formBasicSelect" className="my-4">
                    <Form.Label>Matières</Form.Label>
                    <Multiselect
                      options={allMaterials.map((elm) => {
                        return {
                          _id: elm?._id,
                          title: elm?.title,
                          compagny: elm?.compagny,
                        };
                      })}
                      selectedValues={materials}
                      name="materials"
                      onSelect={(selectedList, selectedItem) => {
                        console.log("selectedItem", selectedItem);
                        setMaterials((prev) => [...prev, selectedItem]);
                      }}
                      onRemove={(selectedList, selectedItem) => {
                        setMaterials((prev) =>
                          prev.filter((elm) => elm._id !== selectedItem._id)
                        );
                      }}
                      displayValue="title"
                      showCheckbox="true"
                      keepSearchTerm="true"
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" className="my-2">
                    Mettre à jour !
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

export default UpdateFurniture;
