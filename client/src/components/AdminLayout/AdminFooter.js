import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AdminFooter = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            &copy;2022 Farmer's Friend | All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AdminFooter;
