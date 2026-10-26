import { Link } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Home() {
  return (
    <>
      <section className="inicio-portada">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={7} className="inicio-contenido text-light">
              <p className="inicio-etiqueta">BIENVENIDOS A GORDOS PS2</p>
              <h1 className="inicio-titulo">
                Los clásicos nunca pasan de moda.
              </h1>
              <p className="inicio-descripcion">
                ¿Te acordás de esos juegos que te tenían horas frente a la tele?
                En Gordos PS2 queremos traer de vuelta esos momentos con
                videojuegos originales de PlayStation 2.
              </p>
              <p className="inicio-descripcion">
                Buscá tus favoritos, descubrí algún clásico que te quedó
                pendiente y armá tu colección.
              </p>
              <Button
                as={Link}
                to="/videojuegos"
                variant="primary"
                size="lg"
                className="inicio-boton"
              >
                Ver videojuegos 🎮
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="inicio-ventajas py-5">
        <Container>
          <div className="text-center mb-4">
            <h2 className="fw-bold">¿Qué podés encontrar?</h2>
            <p className="text-secondary">
              Un poco de nostalgia nunca viene mal.
            </p>
          </div>
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="inicio-tarjeta h-100">
                <Card.Body>
                  <div className="inicio-icono">🎮</div>
                  <Card.Title>Juegazos clásicos</Card.Title>
                  <Card.Text>
                    GTA, God of War, PES y muchos más. Esos juegos que siempre
                    dan ganas de volver a jugar.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="inicio-tarjeta h-100">
                <Card.Body>
                  <div className="inicio-icono">💿</div>
                  <Card.Title>Juegos Nuevos</Card.Title>
                  <Card.Text>
                    Disfrutá tus clásicos favoritos en su estado original:
                    juegos nuevos, sin uso y sellados de fábrica.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="inicio-tarjeta h-100">
                <Card.Body>
                  <div className="inicio-icono">🕹️</div>
                  <Card.Title>Para todos los gustos</Card.Title>
                  <Card.Text>
                    Deportes, aventuras, carreras, acción y esos clásicos que
                    nunca fallan.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="inicio-tarjeta h-100">
                <Card.Body>
                  <div className="inicio-icono">🛒</div>
                  <Card.Title>Compra Segura</Card.Title>
                  <Card.Text>
                    Comprá tus videojuegos favoritos con tranquilidad. Tus datos
                    se utilizan únicamente para gestionar tu pedido, brindándote
                    una experiencia de compra simple y confiable.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="inicio-final py-5">
        <Container className="text-center">
          <h2 className="fw-bold">¿Qué juego te gustaría volver a jugar?</h2>
          <p className="mb-4">
            Pegate una vuelta por el catálogo y encontrá tu próximo favorito.
          </p>
          <Button
            as={Link}
            to="/videojuegos"
            variant="primary"
            size="lg"
            className="inicio-boton"
          >
            Explorar catálogo →
          </Button>
        </Container>
      </section>
    </>
  );
}

export default Home;
