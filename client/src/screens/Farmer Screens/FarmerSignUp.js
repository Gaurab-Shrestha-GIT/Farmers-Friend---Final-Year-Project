import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import Axios from "axios";

const FarmerSignUp = () => {
  const [farmerEmail, setFarmerEmail] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [farmerAddress, setFarmerAddress] = useState("");
  const [farmerPhoneNumber, setFarmerPhoneNumber] = useState("");
  const [farmerPassword, setFarmerPassword] = useState("");
  const [farmerPasswordConfirm, setFarmerPasswordConfirm] = useState("");

  const [message, setMessage] = useState("");

  const registerFarmer = async () => {
    await Axios.post("http://localhost:5000/farmer/registerFarmer", {
      farmerName: farmerName,
      farmerAddress: farmerAddress,
      farmerEmail: farmerEmail,
      farmerPhoneNumber: farmerPhoneNumber,
      farmerPassword: farmerPassword,
      farmerPasswordConfirm: farmerPasswordConfirm,
    }).then((res) => {
      if (res.data.register) {
        setMessage(res.data.message);
      } else {
        setMessage(res.data.message);
      }
    });
  };

  return (
    <FormContainer>
      <title>Sign Up | Farmer's Friend</title>

      <div className=" text-center py-3">
        <i className="fa fa-handshake-o fa-3x me-3"></i>
        <h1>JOIN as FARMER</h1>
      </div>

      <Form className="py-4">
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Full Name"
            value={farmerName}
            onChange={(event) => {
              setFarmerName(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={farmerAddress}
            onChange={(event) => {
              setFarmerAddress(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Phone Number"
            value={farmerPhoneNumber}
            onChange={(event) => {
              setFarmerPhoneNumber(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={farmerEmail}
            onChange={(event) => {
              setFarmerEmail(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={farmerPassword}
            onChange={(event) => {
              setFarmerPassword(event.target.value);
            }}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Re-enter Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={farmerPasswordConfirm}
            onChange={(event) => {
              setFarmerPasswordConfirm(event.target.value);
            }}
          ></Form.Control>
          <div className=" text-center mt-3">
            <h4 className="p-3">{message}</h4>
          </div>
        </Form.Group>
      </Form>

      <Row className="py-2">
        <Col>
          <Button onClick={registerFarmer} className="me-5" type="submit">
            Sign Up
          </Button>
          Register as Customer? <Link to="/customersignup">Register Here</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default FarmerSignUp;
