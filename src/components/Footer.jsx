
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
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
            <div className="d-flex flex-column gap-1">
              <Link className="link-light text-decoration-none" to="/inicio">
                Inicio
              </Link>
              <Link className="link-light text-decoration-none" to="/sobre-nosotros">
                Sobre Nosotros
              </Link>
              <Link className="link-light text-decoration-none" to="/videojuegos">
                Videojuegos
              </Link>
            </div>
          </Col>


          <Col md={4}>
            <h6 className="fw-bold">Contacto</h6>

            <p className="text-secondary mb-2">
              ¿Tenés alguna consulta sobre nuestros videojuegos?
            </p>

            <Link
              className="link-light text-decoration-none"
              to="/contacto"
            >
              Contactanos
            </Link>
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
