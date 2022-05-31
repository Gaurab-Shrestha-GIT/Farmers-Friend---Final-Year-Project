import Axios from "axios";
import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";

const CustomerSignUp = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerPasswordConfirm, setcustomerPasswordConfirm] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const registerCustomer = async () => {
    await Axios.post("http://localhost:5000/customer/registerCustomer", {
      customerName: customerName,
      customerAddress: customerAddress,
      customerPhoneNumber: customerPhoneNumber,
      customerEmail: customerEmail,
      customerPassword: customerPassword,
      customerPasswordConfirm: customerPasswordConfirm,
    }).then((res) => {
      if (res.data.register) {
        setMessage(res.data.message);
      } else {
        setMessage(res.data.message);
      }
    });
  };

  return (
    <div>
      <title>Sign Up | Farmer's Friend</title>

      <FormContainer>
        <title>Sign Up | Farmer's Friend</title>

        <div className=" text-center py-3">
          <i className="fa fa-user fa-3x me-3"></i>
          <h1>REGISTER AS CUSTOMER</h1>
        </div>

        <Form className="py-4">
          <Form.Group>
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
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={customerAddress}
              onChange={(event) => {
                setCustomerAddress(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              value={customerPhoneNumber}
              onChange={(event) => {
                setCustomerPhoneNumber(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={customerEmail}
              onChange={(event) => {
                setCustomerEmail(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={customerPassword}
              onChange={(event) => {
                setCustomerPassword(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={customerPasswordConfirm}
              onChange={(event) => {
                setcustomerPasswordConfirm(event.target.value);
              }}
            ></Form.Control>
            <div className=" text-center mt-3">
              <h4 className="p-2">{message}</h4>
            </div>
          </Form.Group>
        </Form>

        <Col>
          <Button className="me-5" onClick={registerCustomer}>
            Sign Up
          </Button>
          Register as Farmer? <Link to="/farmersignup">Register Here</Link>
        </Col>
      </FormContainer>
    </div>
  );
};

export default CustomerSignUp;
