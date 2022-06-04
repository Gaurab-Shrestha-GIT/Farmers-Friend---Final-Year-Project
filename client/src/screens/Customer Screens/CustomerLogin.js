import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, c, useEffect, useNavigate } from "react-router-dom";
import Axios from "axios";

const CustomerLogin = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const logincustomer = async () => {
    await Axios.post(
      "https://farmersfriends.herokuapp.com/customer/customerlogin",
      {
        customerEmail: customerEmail,
        password: password,
      }
    ).then((response) => {


      if (response.data.customerLoggedIn) {
        localStorage.setItem("customerLoggedIn", true);
        localStorage.setItem("customerEmail", response.data.customerEmail);
        navigate("/");
      } else {
        setMessage(response.data.message);
      }
    });
  };
  return (
    <div>
      <title>Login | Farmer's Friend</title>

      <FormContainer>
        <div className=" text-center py-3">
          <i className="fa fa-user fa-3x me-3"></i>
          <h1>LOGIN AS CUSTOMER</h1>
        </div>

        <Form className="py-4">
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
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <div className="text-center mt-3">
            <h4 className="p-3">{message}</h4>
          </div>
        </Form>

        <Row className="py-2 text-center">
          <Col>
            <Button onClick={logincustomer}>Login</Button>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            Register as <Link to="/customersignup">Customer</Link> | Register as{" "}
            <Link to="/farmersignup">Farmer</Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default CustomerLogin;
