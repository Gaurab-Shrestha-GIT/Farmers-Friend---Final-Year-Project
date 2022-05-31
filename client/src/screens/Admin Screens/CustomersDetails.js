import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";

const CustomersDetails = () => {
  const [customerDetails, setCustomerDetails] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/admin/customerdetails")
      .then((response) => {
        setCustomerDetails(response.data);
      });
  }, []);

  return (
    <Container className="mt-4">
      <div>
        <nav aria-label="breadcrumb" className=" mt-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admindashboard" style={{ textDecoration: "none" }}>
                Admin Dashboard
              </a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Customer Details
            </li>
          </ol>
        </nav>
      </div>
      <div>
        <Row>
          <Col>
            <Card className="">
              <ListGroup className="text-center">
                <ListGroup.Item>
                  <h4>Total Customers: {customerDetails.length} </h4>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone No.</th>
              <th>Email</th>
            </tr>
          </thead>
          {customerDetails.map((val) => (
            <>
              <tbody>
                <tr>
                  <td>{val.customer_name}</td>
                  <td>{val.address}</td>
                  <td>{val.phone_number}</td>
                  <td>{val.customer_email}</td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
      </div>
    </Container>
  );
};

export default CustomersDetails;
