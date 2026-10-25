
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";

function NavbarTienda({ cantidadCarrito }) {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="py-3"
    >
      <Container>
        <Navbar.Brand as={Link} to="/inicio" className="fw-bold">
          <span className="text-primary">GORDOS</span> PS2
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/inicio">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/videojuegos">
              Videojuegos
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/carrito">
              🛒 Carrito <Badge bg="primary">{cantidadCarrito}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTienda;

