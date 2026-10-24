import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Form } from "react-bootstrap";
import CarritoItem from "../components/CarritoItem";

function Carrito({ carrito, cambiarCantidad, eliminarDelCarrito }) {
  const navigate = useNavigate();
  const [codigoCupon, setCodigoCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [errorCupon, setErrorCupon] = useState("");

  function aplicarCupon() {
    if (codigoCupon.trim().toUpperCase() === "GORDOFF10") {
      setCuponAplicado(true);
      setErrorCupon("");
    } else {
      setCuponAplicado(false);
      setErrorCupon("El cupón ingresado no es válido.");
    }
  }

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );
  const precioTotal = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );

  const descuento = cuponAplicado ? precioTotal * 0.1 : 0;
  const totalConDescuento = precioTotal - descuento;

  return (
    <Container className="py-5">
      <div className="mb-4">
        <h1 className="fw-bold">Mi carrito de compras</h1>
        <p className="text-secondary">
          Revisá tus videojuegos antes de continuar con la compra.
        </p>
      </div>
      {carrito.length === 0 ? (
        <Card className="text-center shadow-sm">
          <Card.Body className="py-5">
            <h4>Tu carrito está vacío</h4>
            <p className="text-secondary">
              Todavía no agregaste videojuegos a tu carrito.
            </p>
            <Button variant="primary" onClick={() => navigate("/productos")}>
              Ver videojuegos
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row className="g-4">
          <Col lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Productos agregados</h4>
              <Badge bg="primary">{cantidadTotal} productos</Badge>
            </div>
            {carrito.map((producto) => (
              <CarritoItem
                key={producto.id}
                producto={producto}
                cambiarCantidad={cambiarCantidad}
                eliminarDelCarrito={eliminarDelCarrito}
              />
            ))}
            <Button variant="outline-primary" onClick={() => navigate("/productos")}>
              ← Seguir comprando
            </Button>
          </Col>
          <Col lg={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title className="fw-bold mb-4">
                  Resumen del carrito
                </Card.Title>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Cantidad de productos</span>
                  <span>{cantidadTotal}</span>
                </div>
                <hr />
                <div className="mb-3">
                  <Form.Label className="fw-semibold">
                    ¿Tenés un cupón de descuento?
                  </Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      placeholder="Ingresá tu cupón"
                      value={codigoCupon}
                      onChange={(e) => {
                        setCodigoCupon(e.target.value);
                        setErrorCupon("");
                      }}
                      disabled={cuponAplicado}
                    />
                    {cuponAplicado ? (
                      <Button variant="outline-danger" onClick={() => { setCuponAplicado(false); setCodigoCupon(""); setErrorCupon("");}}>
                        Quitar
                      </Button>
                    ) : (
                      <Button variant="outline-primary" onClick={aplicarCupon}>
                        Aplicar
                      </Button>
                    )}
                  </div>
                  {errorCupon && (
                    <Form.Text className="text-danger">{errorCupon}</Form.Text>
                  )}
                  {cuponAplicado && (
                    <Form.Text className="text-success">
                      Cupón aplicado correctamente.
                    </Form.Text>
                  )}
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-secondary">Subtotal</span>
                  <span>${precioTotal.toLocaleString("es-AR")}</span>
                </div>
                {cuponAplicado && (
                  <div className="d-flex justify-content-between mb-3 text-success">
                    <span>Descuento (10%)</span>
                    <span>-${descuento.toLocaleString("es-AR")}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Total</h5>
                  <h4 className="fw-bold mb-0">
                    ${totalConDescuento.toLocaleString("es-AR")}
                  </h4>
                </div>
                <div className="d-grid">
                  <Button variant="primary" onClick={() => navigate("/finalizar-compra")}>
                    Continuar con la compra
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Carrito;
