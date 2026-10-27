import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { useState } from "react";

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });

    setEnviado(false);
  }

  function validateForm() {
    const newErrors = {};

    if (formData.nombreCompleto.trim() === "") {
      newErrors.nombreCompleto = "Ingresá tu nombre completo.";
    }

    if (formData.email.trim() === "") {
      newErrors.email = "Ingresá tu correo electrónico.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Ingresá un correo electrónico válido.";
    }

    if (formData.asunto.trim() === "") {
      newErrors.asunto = "Ingresá el asunto de tu consulta.";
    }

    if (formData.mensaje.trim() === "") {
      newErrors.mensaje = "Ingresá el mensaje que querés enviarnos.";
    }

    return newErrors;
  }

  function manejarEnvio(event) {
    event.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setEnviado(true);

    setFormData({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
  }

  return (
    <Container className="py-5">
      <div className="mb-5">
        <p className="text-primary fw-bold mb-2">ESTAMOS PARA AYUDARTE</p>

        <h1 className="fw-bold">Contactanos</h1>

        <p className="text-secondary">
          ¿Tenés alguna consulta sobre nuestros videojuegos? Escribinos y
          contanos en qué podemos ayudarte.
        </p>
      </div>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4 p-md-5">
              <h4 className="fw-bold mb-4">Envianos un mensaje</h4>

              {enviado && (
                <Alert variant="success">¡Mensaje enviado correctamente!</Alert>
              )}

              <Form onSubmit={manejarEnvio} noValidate>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="nombreCompleto">
                      <Form.Label>Nombre completo *</Form.Label>

                      <Form.Control
                        type="text"
                        name="nombreCompleto"
                        placeholder="Tu nombre completo"
                        value={formData.nombreCompleto}
                        onChange={handleChange}
                        isInvalid={!!errors.nombreCompleto}
                      />

                      {errors.nombreCompleto && (
                        <Form.Control.Feedback type="invalid">
                          {errors.nombreCompleto}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Correo electrónico *</Form.Label>

                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />

                      {errors.email && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="asunto">
                      <Form.Label>Asunto *</Form.Label>

                      <Form.Control
                        type="text"
                        name="asunto"
                        placeholder="¿Sobre qué querés consultar?"
                        value={formData.asunto}
                        onChange={handleChange}
                        isInvalid={!!errors.asunto}
                      />

                      {errors.asunto && (
                        <Form.Control.Feedback type="invalid">
                          {errors.asunto}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>

                  <Col xs={12}>
                    <Form.Group controlId="mensaje">
                      <Form.Label>Mensaje *</Form.Label>

                      <Form.Control
                        as="textarea"
                        name="mensaje"
                        rows={5}
                        placeholder="Escribí tu consulta..."
                        value={formData.mensaje}
                        onChange={handleChange}
                        isInvalid={!!errors.mensaje}
                      />

                      {errors.mensaje && (
                        <Form.Control.Feedback type="invalid">
                          {errors.mensaje}
                        </Form.Control.Feedback>
                      )}
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
                ¿Buscás un juego en particular o necesitás información sobre una
                compra?
              </p>

              <hr />

              <h6 className="fw-bold">Videojuegos</h6>

              <p className="text-secondary mb-4">
                Consultá nuestro catálogo y descubrí los clásicos disponibles.
              </p>

              <Button href="/videojuegos" variant="outline-primary">
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
