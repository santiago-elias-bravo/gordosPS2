
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import FormularioCompra from "../components/FormularioCompra";

function FinalizarCompra({ carrito, cuponAplicado, confirmarCompra }) {
  const navigate = useNavigate();

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const subtotal = carrito.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  );

  const descuento = cuponAplicado ? subtotal * 0.10 : 0;
  const totalFinal = subtotal - descuento;

  if (carrito.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2 className="fw-bold">Tu carrito está vacío</h2>
        <p className="text-secondary">
          Agregá videojuegos antes de finalizar tu compra.
        </p>
        <Button variant="primary" onClick={() => navigate("/videojuegos")}>
          Ver videojuegos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1 className="fw-bold">Finalizar compra</h1>
        <p className="text-secondary">
          Completá tus datos para confirmar tu pedido.
        </p>
      </div>
      <Row className="g-4">
        {/* Formulario del comprador */}
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-4">
                Datos del comprador
              </Card.Title>
              <FormularioCompra
                confirmarCompra={confirmarCompra}
              />
            </Card.Body>
          </Card>
          <Button
            variant="outline-primary"
            className="mt-3"
            onClick={() => navigate("/carrito")}
          >
            ← Volver al carrito
          </Button>
        </Col>
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold mb-4">
                Resumen del pedido
              </Card.Title>
              {carrito.map((producto) => (
                <div key={producto.id} className="d-flex justify-content-between mb-3 gap-2">
                  <span>
                    {producto.nombre} × {producto.cantidad}
                  </span>
                  <span className="text-nowrap">
                    ${(producto.precio * producto.cantidad)
                      .toLocaleString("es-AR")}
                  </span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">
                  Cantidad de productos
                </span>
                <span>{cantidadTotal}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>
              {cuponAplicado && (
                <div className="d-flex justify-content-between mb-3 text-success">
                  <span>Descuento GORDOFF10 (10%)</span>
                  <span>
                    -${descuento.toLocaleString("es-AR")}
                  </span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Total</h5>
                <h4 className="fw-bold mb-0">
                  ${totalFinal.toLocaleString("es-AR")}
                </h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default FinalizarCompra;