
import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto py-4">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="fw-bold">
              GORDOS PS2
            </h5>
            <p className="text-secondary mb-0">
              Tu lugar para encontrar videojuegos
              originales de PlayStation 2.
            </p>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold">Navegación</h6>
            <ul className="list-unstyled">
              <li>
                <Link className="link-light text-decoration-none"
                  to="/">
                  Inicio
                </Link>
              </li>
              <li>
                <Link className="link-light text-decoration-none"
                  to="/productos">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link className="link-light text-decoration-none"
                  to="/contacto">
                  Contacto
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="fw-bold">Nuestra tienda</h6>
            <p className="text-secondary mb-1">
              Videojuegos originales
            </p>
            <p className="text-secondary mb-0">
              Clásicos nuevos y usados
            </p>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />

        <p className="text-secondary text-center mb-0">
          © {new Date().getFullYear()} Gordos PS2.
          Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
