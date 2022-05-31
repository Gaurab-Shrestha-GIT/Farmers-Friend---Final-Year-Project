import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FarmerHeader = () => {
  const [farmerLoggedIn, setFarmerLoggedIn] = useState();

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("farmerLoggedIn");
    localStorage.removeItem("farmerEmail");
    setFarmerLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("farmerLoggedIn")) {
      setFarmerLoggedIn(true);
    }
  });

  return (
    <header>
      <Navbar bg="success" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#">Farmer's Friend</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!farmerLoggedIn ? (
                <>
                  <>
                    <Nav.Link href="/farmersignup">
                      <i className="fa fa-handshake-o me-2"></i>
                      Join as Farmer
                    </Nav.Link>
                    <Nav.Link href="/customersignup">
                      <i className="fas fa-user me-2"></i>
                      Register as Customer
                    </Nav.Link>

                    <NavDropdown
                      title="Login"
                      id="basic-nav-dropdown"
                      className="bg-success"
                    >
                      <NavDropdown.Item href="/farmerdashboard/farmerlogin">
                        <i className="fa fa-handshake-o me-2"></i> Login as
                        Farmer
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/customerlogin">
                        <i className="fas fa-user me-2"></i> Login as Customer
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                </>
              ) : (
                <>
                  <Nav.Link href="/farmerdashboard">
                    <i className="fa fa-id-card me-2"></i>
                    Farmer Profile
                  </Nav.Link>
                  <Nav.Link href="/farmerdashboard/addproduct">
                    <i className="fa fa-plus-square me-2"></i>
                    Add Product
                  </Nav.Link>
                  <Nav.Link href="/farmerdashboard/productlist">
                    <i className="fa-solid fa-list me-2"></i>
                    Product List
                  </Nav.Link>
                  <Nav.Link href="/farmerdashboard/farmerorders">
                    <i className="fas fa-carrot me-2"></i>Order
                  </Nav.Link>
                  <Nav.Link onClick={logout}>Logout</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default FarmerHeader;
