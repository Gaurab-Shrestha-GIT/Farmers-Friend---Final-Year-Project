import React, { useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  //login button
  const login = async () => {
    await Axios.post("https://farmersfriends.herokuapp.com/admin/adminlogin", {
      adminEmail: adminEmail,
      adminPassword: adminPassword,
    }).then((response) => {
      if (!response.data.adminLoggedIn && !response.data.auth) {
        setMessage(response.data.message);
      } else {
        localStorage.setItem("adminLoggedIn", true);
        localStorage.setItem("adminEmail", response.data.adminEmail);
        localStorage.setItem("token", response.data.token);
        navigate("/admindashboard/pendingproducts");
      }
    });
  };

  return (
    <div>
      <title>Admin Login | Farmer's Friend</title>

      <FormContainer>
        <div className=" text-center py-3">
          <i className="fa fa-user fa-3x me-3"></i>
          <h1>LOGIN AS ADMIN</h1>
        </div>

        <Form className="py-4">
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={adminEmail}
              onChange={(event) => {
                setAdminEmail(event.target.value);
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={adminPassword}
              onChange={(event) => {
                setAdminPassword(event.target.value);
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
      </FormContainer>
    </div>
  );
};

export default AdminLogin;
