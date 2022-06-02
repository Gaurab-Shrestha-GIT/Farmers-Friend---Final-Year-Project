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
import { useNavigate } from "react-router-dom";

const FarmersDetails = () => {
  const [farmerDetails, setFarmerDetails] = useState([]);

  const navigate = useNavigate();

  useEffect(async () => {
    if (!localStorage.getItem("token")) {
      navigate("/admindashboard/adminlogin");
    }

    await axios
      .get("https://farmersfriends.herokuapp.com/admin/farmerdetails", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFarmerDetails(response.data);
      });
  }, []);

  return (
    <Container className="mt-4">
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admindashboard" style={{ textDecoration: "none" }}>
                Admin Dashboard
              </a>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Farmers Details
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
                  <h4>Total Farmers: {farmerDetails.length} </h4>
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
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          {farmerDetails.map((val) => (
            <>
              <tbody>
                <tr>
                  <td>{val.name}</td>
                  <td>{val.address}</td>
                  <td>{val.farmer_email}</td>
                  <td>{val.farmer_phone_number}</td>
                </tr>
              </tbody>
            </>
          ))}
        </Table>
      </div>
    </Container>
  );
};

export default FarmersDetails;
