import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Alert from "react-bootstrap/Alert";

import { productos } from "../data/productos";

function DetalleProducto({ agregarAlCarrito, carrito }) {
  const { id } = useParams();

  const [productoAgregado, setProductoAgregado] = useState(false);

  const producto = productos.find(
    (producto) => producto.id === Number(id)
  );

  const productoEnCarrito = carrito.find(
    (item) => item.id === producto?.id
  );

  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cantidad : 0;

  const disponible = producto ? producto.stock > 0 : false;

  const stockMaximoAlcanzado = producto ? cantidadEnCarrito >= producto.stock : false;

  function agregarProducto() {
    if (!producto || stockMaximoAlcanzado) {
      return;
    }
    agregarAlCarrito(producto);
    setProductoAgregado(true);
  }

  useEffect(() => {
    if (!productoAgregado) return;

    const temporizador = setTimeout(() => {
      setProductoAgregado(false);
    }, 1200);

    return () => clearTimeout(temporizador);
  }, [productoAgregado]);

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
                {disponible && (
                  <p className="text-secondary mt-2 mb-0">
                    Unidades en tu carrito: {cantidadEnCarrito}
                  </p>
                )}
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
                disabled={!disponible || stockMaximoAlcanzado}
                onClick={agregarProducto}
              >
                {!disponible
                  ? "Producto no disponible"
                  : stockMaximoAlcanzado
                    ? "Stock máximo alcanzado"
                    : "Agregar al carrito"}
              </Button>
              {productoAgregado && (
                <Alert
                  variant="success"
                  className="mt-3 mb-0 py-2 text-center"
                >
                  ¡Producto agregado al carrito!
                </Alert>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default DetalleProducto;
