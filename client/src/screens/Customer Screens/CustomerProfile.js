import Avatar from "react-avatar";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import Axios from "axios";

const CustomerProfile = () => {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [message, setMessage] = useState("");

  useEffect(async () => {
    await Axios.post("http://localhost:5000/customer/customerprofile", {
      customerEmail: localStorage.getItem("customerEmail"),
    }).then((response) => {
      setCustomerDetails(response.data);
      setCustomerName(response.data[0].customer_name);
      setAddress(response.data[0].address);
      setPhoneNumber(response.data[0].phone_number);
    });
  }, []);

  const update = () => {
    Axios.put("http://localhost:5000/customer/customerprofile", {
      customerEmail: localStorage.getItem("customerEmail"),
      updatedName: customerName,
      updatedAddress: address,
      updatedPassword: password,
      updatedPhoneNumber: phoneNumber,
    }).then((response) => {
      if (response.data.update) {
        alert("Detals Successfully Updated!");
        window.location.reload();
      } else {
        setMessage(response.data.message);
      }
    });
  };

  return (
    <Container>
      <title>Welcome to Farmer's Friend</title>
      {customerDetails.map((val) => (
        <Row key={val.id}>
          <Col md={4}>
            <div className="mb-4">
              <div className="card-body text-center">
                <Avatar facebookId="100008343750912" size="350" />

                <p className="my-3">Email: {val.customer_email}</p>
                <p className="my-3">Customer Name: {val.customer_name}</p>
                <p className="my-3">Address: {val.address}</p>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <FormContainer>
              <Form className="py-4">
                <Form.Group controlId="name">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    value={customerName}
                    onChange={(event) => {
                      setCustomerName(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Address"
                    value={address}
                    onChange={(event) => {
                      setAddress(event.target.value);
                    }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
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
              <Row className="py-1">
                <Col className="text-center">
                  <Button onClick={update} className="me-5" type="submit">
                    Update
                  </Button>
                </Col>
              </Row>
            </FormContainer>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default CustomerProfile;
