import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function SobreNosotros() {
  return (
  <div className="sobre-nosotros-page">
    <Container className="py-5">
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <p className="text-primary fw-bold mb-2">SOBRE NOSOTROS</p>

            <h1 className="fw-bold mb-4 titulo-sobre-nosotros">Los clásicos nunca pasan de moda...</h1>

            <p className="text-secondary texto-justificado">
              En Gordos PS2 nos gustan los videojuegos que marcaron una época.
              Creamos esta tienda para que puedas encontrar esos clásicos de
              PlayStation 2 que recordás con cariño o descubrir juegos que
              todavía no tuviste la oportunidad de probar.
            </p>

            <p className="text-secondary texto-justificado">
              Nuestro catálogo reúne juegos de distintos géneros, desde
              aventuras y acción hasta deportes y carreras. Queremos que
              encontrar tu próximo videojuego sea sencillo y que vuelvas a
              disfrutar de estos clásicos.
            </p>

            <Button
              as={Link}
              to="/videojuegos"
              variant="primary"
              className="mt-2"
            >
              Explorar videojuegos
            </Button>
          </Col>

          <Col lg={5}>
            <Card className="border-0 shadow-sm">
              <img
                src="/logoTienda.png"
                alt="Logo de Gordos PS2"
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                }}
              />
            </Card>
          </Col>
        </Row>
      </Container>

      <section className="py-5 sobre-nosotros-beneficios">
        <Container>
          <div className="mb-4">
            <h2 className="fw-bold">Lo que nos gusta de los clásicos</h2>
            <p className="text-secondary">
              Mucho más que jugar: recuerdos, variedad y diversión.
            </p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h5 className="fw-bold">🎮 Nostalgia</h5>
                  <p className="text-secondary mb-0">
                    Juegos que nos recuerdan tardes frente a la consola y
                    momentos que siguen vigentes.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h5 className="fw-bold">🕹️ Variedad</h5>
                  <p className="text-secondary mb-0">
                    Aventuras, deportes, carreras y muchos otros géneros para
                    distintos gustos.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <h5 className="fw-bold">❤️ Pasión por jugar</h5>
                  <p className="text-secondary mb-0">
                    Queremos que descubrir un clásico o reencontrarte con tu
                    juego favorito sea sencillo.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section
        className="py-5 text-center text-white sobre-nosotros-final"
        style={{ backgroundColor: "#101827" }}
      >
        <Container>
          <h2 className="fw-bold mb-3">¿Buscás tu próximo clásico?</h2>

          <p className="mb-4">
            Explorá nuestro catálogo y encontrá tu próximo videojuego favorito.
          </p>

          <Button as={Link} to="/videojuegos" variant="primary">
            Explorar catálogo
          </Button>
        </Container>
      </section>
    </div>
  );
}

export default SobreNosotros;
