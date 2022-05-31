import Avatar from "react-avatar";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import Axios from "axios";

const FarmerDashboard = () => {
  const [farmerDetails, setFarmerDetails] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [message, setMessage] = useState("");

  useEffect(async () => {
    await Axios.post("http://localhost:5000/farmer/farmerdashboard", {
      farmerEmail: localStorage.getItem("farmerEmail"),
    }).then((response) => {
      setFarmerDetails(response.data);
      setName(response.data[0].name);
      setAddress(response.data[0].address);
      setPhoneNumber(response.data[0].farmer_phone_number);
    });
  }, []);

  const update = () => {
    Axios.put("http://localhost:5000/farmer/farmerdashboard", {
      farmerEmail: localStorage.getItem("farmerEmail"),
      updatedName: name,
      updatedAddress: address,
      updatedPassword: password,
      updatedPhoneNumber: phoneNumber,
    }).then((response) => {
      if (response.data.update) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    });
  };

  return (
    <>
      <Container>
        <Row>
          {farmerDetails.map((val) => (
            <>
              <Col md={4} key={val.id}>
                <div className="mb-4">
                  <div className="card-body text-center">
                    <Avatar facebookId="100008343750912" size="350" />

                    <p className="my-3">Email: {val.farmer_email}</p>
                    <p className="my-3">Customer Name: {val.name}</p>
                    <p className="my-3">Address: {val.address}</p>
                  </div>
                </div>
              </Col>
            </>
          ))}

          <Col md={8}>
            <FormContainer>
              <Form className="py-4">
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    placeholder="Enter Name"
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    placeholder="Enter Address"
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phoneNumber}
                    placeholder="Enter Phone Number"
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>

                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <div className="text-center">
                  <h5 className="pt-4">{message}</h5>
                </div>
              </Form>
              <Row className="py-4">
                <Col className="text-center">
                  <Button className="me-5" onClick={update}>
                    Update
                  </Button>
                </Col>
              </Row>
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FarmerDashboard;
