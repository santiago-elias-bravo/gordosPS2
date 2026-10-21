
import { Link, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

import { productos } from "../data/productos";

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();

  const producto = productos.find(
    (producto) => producto.id === Number(id)
  );

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h1>Producto no encontrado</h1>
        <p>El juego que estás buscando no existe.</p>

        <Button as={Link} to="/productos" variant="primary">
          Volver al catálogo
        </Button>
      </Container>
    );
  }

  const disponible = producto.stock > 0;

  return (
    <Container className="py-5">
      <Button
        as={Link}
        to="/productos"
        variant="outline-secondary"
        className="mb-4"
      >
        ← Volver al catálogo
      </Button>

      <Card className="border-0 shadow-sm">
        <Row className="g-0">
          <Col md={6}>
            <div className="p-3 p-md-4 d-flex align-items-center justify-content-center h-100">
              <Card.Img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid"
                style={{
                  maxHeight: "450px",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>

          <Col md={6}>
            <Card.Body className="p-4 p-lg-5">
              <Badge
                bg="secondary"
                className="mb-3"
              >
                {producto.categoria}
              </Badge>

              <h1 className="fw-bold mb-3">
                {producto.nombre}
              </h1>

              <p className="text-secondary">
                {producto.descripcionCompleta}
              </p>

              <h2 className="text-primary fw-bold my-4">
                ${producto.precio.toLocaleString("es-AR")}
              </h2>

              <div className="mb-4">
                <strong>Disponibilidad: </strong>

                <Badge bg={disponible ? "success" : "danger"}>
                  {disponible
                    ? `${producto.stock} unidades disponibles`
                    : "Sin stock"}
                </Badge>
              </div>

              <h5 className="fw-bold mb-3">
                Características principales
              </h5>

              <ListGroup className="mb-4">
                {producto.caracteristicas.map(
                  (caracteristica, index) => (
                    <ListGroup.Item key={index}>
                      {caracteristica}
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>

              <Button
                variant="primary"
                size="lg"
                className="w-100"
                disabled={!disponible}
                onClick={() => agregarAlCarrito(producto)}
              >
                {disponible
                  ? "Agregar al carrito"
                  : "Producto no disponible"}
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default DetalleProducto;
