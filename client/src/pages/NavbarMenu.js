import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function NavbarMenu() {
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow p-1">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="font-weight-bolder text-white" to="/" as={Link}>
            Accueil
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/furnitures"
            as={Link}
          >
            Meubles
          </Nav.Link>

          <Nav.Link
            className="font-weight-bolder text-white"
            to="/createFurniture"
            as={Link}
          >
            Nouveau Meuble
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/chart"
            as={Link}
          >
            Graphique
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarMenu;
