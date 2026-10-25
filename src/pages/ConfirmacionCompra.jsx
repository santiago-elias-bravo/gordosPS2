
import { Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert, } from "react-bootstrap";

function ConfirmacionCompra({ compra }) {
  if (!compra) {
    return <Navigate to="/inicio" replace />;
  }

  const { productos, cliente, cantidadProductos, subtotal, descuento, total, cupon, fecha, } = compra;

  return (
    <Container className="py-5">
      <Alert variant="success" className="text-center py-4 mb-4">
        <h2 className="fw-bold mb-3">
          ¡Compra realizada con éxito!
        </h2>
        <p className="mb-2">
          ¡Gracias por comprar en GORDOS PS2!
        </p>
        <p className="mb-0">
          Tu pedido fue registrado correctamente.
        </p>
      </Alert>
      <Row className="g-4">
        <Col lg={7}>
          <Card className="shadow-sm h-100">
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-4">
                Resumen de la compra
              </Card.Title>
              <p className="text-secondary">
                Fecha: {fecha}
              </p>
              {productos.map((producto) => (
                <div key={producto.id} className="d-flex justify-content-between align-items-center mb-3 gap-3">
                  <div>
                    <h6 className="mb-1">
                      {producto.nombre}
                    </h6>
                    <small className="text-secondary">
                      {producto.cantidad} ×
                      ${producto.precio.toLocaleString("es-AR")}
                    </small>
                  </div>
                  <span className="fw-semibold text-nowrap">
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
                <span>{cantidadProductos}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-secondary">Subtotal</span>
                <span>
                  ${subtotal.toLocaleString("es-AR")}
                </span>
              </div>
              {cupon && (
                <div className="d-flex justify-content-between mb-3 text-success">
                  <span>Descuento {cupon} (10%)</span>
                  <span>
                    -${descuento.toLocaleString("es-AR")}
                  </span>
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">
                  Total
                </h5>
                <h4 className="fw-bold text-primary mb-0">
                  ${total.toLocaleString("es-AR")}
                </h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5}>
          <Card className="shadow-sm h-100">
            <Card.Body className="p-4">
              <Card.Title className="fw-bold mb-4">
                Datos del comprador
              </Card.Title>
              <p>
                <strong>Nombre y apellido:</strong> {cliente.nombre}
              </p>
              <p>
                <strong>Correo electrónico:</strong> {cliente.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {cliente.telefono}
              </p>
              <hr />
              <p>
                <strong>Método de entrega:</strong>{" "}
                {cliente.metodoEntrega}
              </p>
              {cliente.metodoEntrega === "Envío a domicilio" ? (
                <>
                  <p>
                    <strong>Dirección:</strong>{" "}
                    {cliente.direccion} {cliente.altura}
                  </p>
                  {cliente.departamento && (
                    <p>
                      <strong>Piso y departamento:</strong>{" "}
                      {cliente.departamento}
                    </p>
                  )}
                  {cliente.entreCalles && (
                    <p>
                      <strong>Entre calles:</strong>{" "}
                      {cliente.entreCalles}
                    </p>
                  )}
                  <p>
                    <strong>Código postal:</strong>{" "}
                    {cliente.codigoPostal}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {cliente.ciudad}
                  </p>
                  <p>
                    <strong>Provincia:</strong> {cliente.provincia}
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Dirección de retiro:</strong>{" "}
                    Tte. Manuel Origone 151, Villa Tesei,
                    Buenos Aires.
                  </p>
                  <p className="mb-1">
                    <strong>Horarios de atención:</strong>
                  </p>
                  <p className="mb-1">
                    Lunes a viernes de 9:00 a 18:00 hs.
                  </p>
                  <p>
                    Sábados de 9:00 a 13:00 hs.
                  </p>
                </>
              )}
              <hr />
              <p>
                <strong>Medio de pago:</strong>{" "}
                {cliente.medioPago}
              </p>
              {cliente.observaciones && (
                <p>
                  <strong>Observaciones:</strong>{" "}
                  {cliente.observaciones}
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
        <Button as={Link} to="/videojuegos" variant="primary" size="lg" >
          Seguir explorando videojuegos
        </Button>

        <Button as={Link} to="/inicio" variant="outline-primary" size="lg" >
          Volver al inicio
        </Button>
      </div>
    </Container>
  );
}

export default ConfirmacionCompra;