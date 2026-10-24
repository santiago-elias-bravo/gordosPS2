import { Card, Row, Col, Button, ButtonGroup, Badge } from "react-bootstrap";

function CarritoItem({ producto, cambiarCantidad, eliminarDelCarrito }) {
  const subtotal = producto.precio * producto.cantidad;
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Row className="align-items-center g-3">
          <Col xs={4} md={3} className="text-center">
            <Card.Img src={producto.imagen} alt={producto.nombre} style={{ height: "150px", width: "100%", objectFit: "contain", padding: "8px",}}/>
          </Col>
          <Col xs={8} md={5}>
            <Badge bg="success" className="mb-2">
              Stock: {producto.stock}
            </Badge>
            <Card.Subtitle className="mb-2 text-secondary">
              {producto.categoria}
            </Card.Subtitle>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text className="mb-2">
              Precio unitario: ${producto.precio.toLocaleString("es-AR")}
            </Card.Text>
            <Button variant="outline-danger" size="sm" onClick={() => eliminarDelCarrito(producto.id)}>
              Eliminar
            </Button>
          </Col>
          <Col xs={12} md={4} className="text-md-end">
            <p className="text-secondary mb-2">Cantidad</p>
            <ButtonGroup className="mb-3">
              <Button variant="outline-secondary" disabled={producto.cantidad <= 1} onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}>
                -
              </Button>
              <Button variant="outline-secondary" disabled>
                {producto.cantidad}
              </Button>
              <Button variant="outline-secondary" disabled={producto.cantidad >= producto.stock} onClick={() =>cambiarCantidad(producto.id, producto.cantidad + 1)}>
                +
              </Button>
            </ButtonGroup>
            <p className="text-secondary mb-1">Subtotal</p>
            <h5 className="fw-bold mb-0">
              ${subtotal.toLocaleString("es-AR")}
            </h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CarritoItem
