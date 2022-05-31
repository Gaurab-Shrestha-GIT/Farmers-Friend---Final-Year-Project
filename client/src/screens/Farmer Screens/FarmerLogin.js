import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useEffect } from "react-router-dom";
import Axios from "axios";
import FormContainer from "../../components/FormContainer";

const FarmerLogin = () => {
  const [farmerEmail, setFarmerEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  const login = async () => {
    await Axios.post("http://localhost:5000/farmer/farmerlogin", {
      farmerEmail: farmerEmail,
      password: password,
    }).then((response) => {
      if (response.data.farmerLoggedIn) {
        localStorage.setItem("farmerLoggedIn", true);
        localStorage.setItem("farmerEmail", response.data.farmerEmail);
        navigate("/farmerdashboard");
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
          <h1>LOGIN AS FARMER</h1>
        </div>

        <Form className="py-4">
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
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
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>
          <div className=" text-center mt-3">
            <h4 className="p-3">{message}</h4>
          </div>
        </Form>

        <Row className="py-2 text-center">
          <Col>
            <Button className="" onClick={login}>
              Login
            </Button>
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

export default FarmerLogin;
