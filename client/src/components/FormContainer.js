import React from "react";
import { Container, Row, Col } from "react-bootstrap";

//Column has width of 12 on extra small screens and 6 on medium screens
//column contains child component
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
