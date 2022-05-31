import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchProductBox from "../SearchProductBox";

const CustomerHeader = () => {
  const [customerLoggedIn, setCustomerLoggedIn] = useState();

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("customerLoggedIn");
    localStorage.removeItem("customerEmail");

    setCustomerLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("customerLoggedIn")) {
      setCustomerLoggedIn(true);
    }
  });

  return (
    <header>
      <Navbar bg="success" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Farmer's Friend</Navbar.Brand>
          <SearchProductBox />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!customerLoggedIn ? (
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
                      <i className="fa fa-handshake-o me-2"></i> Login as Farmer
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/customerlogin">
                      <i className="fas fa-user me-2"></i> Login as Customer
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link href="/customerprofile">
                    <i className="fas fa-user me-2"></i>Profile
                  </Nav.Link>
                  <Nav.Link href="/customerorders">
                    <i className="fas fa-basket-shopping me-2"></i>Orders
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

export default CustomerHeader;
