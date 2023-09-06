import React from "react";
import NavbarMenu from "./NavbarMenu";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import armoireImg from "../assets/armoire.webp";

function Home() {
  return (
    <div>
      <NavbarMenu />

      <Container className="my-4 mb-3 p-3 background-overlay-landing">
        <Row className="justify-content-center text-center ">
          <Col md="auto">
            <h1 className="mb-3">ARMOIRES ET ETAGERES SUR MESURE</h1>

            <p>
              <strong>
                Des créations sur-mesure d'armoires et d'étagères de qualité.
              </strong>
            </p>
            <p>
              Parfaits pour ranger avec style tous vos vêtements, vaisselles,
              linge de maison et accessoires du quotidien. Tous nos modèles ont
              été réalisés pour vous offrir une belle capacité de rangement tout
              en apportant une touche de modernité à votre intérieur. Chaque
              armoire est conçue de façon artisanale en France.
            </p>
          </Col>
        </Row>
      </Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        <img style={{ width: "50%" }} src={armoireImg} />
      </div>
    </div>
  );
}

export default Home;
