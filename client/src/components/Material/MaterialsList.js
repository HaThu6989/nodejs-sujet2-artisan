import React from "react";
import Button from "react-bootstrap/Button";
import NavbarMenu from "../../pages/NavbarMenu";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import deleteIcon from "../../../src/assets/trash.svg";
import axios from "axios";

function MaterialsList(props) {
  const { allMaterials, getAllMaterials } = props;

  const deleteMaterial = (materialId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/deleteMaterial/${materialId}`)
      .then(() => {
        getAllMaterials();
      })
      .catch((e) => console.log("error deleting Material...", e));
  };
  return (
    <div>
      <NavbarMenu />
      <Container className="mt-4 ">
        <h1 className="mb-3 font-link">Liste des matières</h1>
        <Row>
          {allMaterials.map((elm) => (
            <Col key={elm._id} className="my-2" xs lg="3">
              <Card className="shadow w-100 p-3" border="success">
                <Card.Body className="p-3">
                  <Card.Title>
                    <p className="post-title">{elm.title}</p>
                  </Card.Title>
                  <Card.Text>
                    <Row className="cols-md-4 mt-3">
                      <Col className="text-right col-4">
                        <Nav.Link
                          className="post-button"
                          to={`/materials/${elm._id}`}
                          as={Link}
                        >
                          <img src="https://img.icons8.com/ios/30/000000/details-pane.png" />
                        </Nav.Link>
                      </Col>

                      <Col className="text-right col-4">
                        <Button
                          className="post-button"
                          onClick={() => deleteMaterial(elm._id)}
                        >
                          <img
                            src={deleteIcon}
                            alt="delete"
                            width="24"
                            height="24"
                          />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MaterialsList;
