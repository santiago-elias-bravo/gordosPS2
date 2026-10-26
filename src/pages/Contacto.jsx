import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useState } from "react";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  function manejarEnvio(event) {
    event.preventDefault();
    setEnviado(true);
  }
  return (
    <Container className="py-5">
      <div className="mb-5">
        <p className="text-primary fw-bold mb-2">
          ESTAMOS PARA AYUDARTE
        </p>
        <h1 className="fw-bold">Contactanos</h1>
        <p className="text-secondary">
          ¿Tenés alguna consulta sobre nuestros videojuegos?
          Escribinos y contanos en qué podemos ayudarte.
        </p>
      </div>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4 p-md-5">
              <h4 className="fw-bold mb-4">Envianos un mensaje</h4>
              {enviado && (
                <Alert variant="success">
                  ¡Mensaje enviado correctamente!
                </Alert>
              )}
              <Form onSubmit={manejarEnvio}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="nombre">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Tu nombre"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="tu@email.com"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="asunto">
                      <Form.Label>Asunto</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="¿Sobre qué querés consultar?"
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="mensaje">
                      <Form.Label>Mensaje</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Escribí tu consulta..."
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Button type="submit" variant="primary">
                      Enviar mensaje
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4 p-md-5">
              <h4 className="fw-bold mb-3">Gordos PS2</h4>

              <p className="text-secondary">
                ¿Buscás un juego en particular o necesitás
                información sobre una compra?
              </p>

              <hr />

              <h6 className="fw-bold">Videojuegos</h6>
              <p className="text-secondary mb-4">
                Consultá nuestro catálogo y descubrí los clásicos
                disponibles.
              </p>

              <Button
                href="/videojuegos"
                variant="outline-primary"
              >
                Ver videojuegos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contacto;
