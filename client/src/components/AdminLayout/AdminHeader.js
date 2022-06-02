import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState();

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("token");
    setAdminLoggedIn(false);
    setAdminLoggedIn(false);
    navigate("/admindashboard/adminlogin");
  };

  useEffect(() => {
    if (localStorage.getItem("adminLoggedIn")) {
      setAdminLoggedIn(true);
    }
  });
  return (
    <div>
      <header>
        <Navbar bg="success" expand="lg" collapseOnSelect>
          <Container>
            <Navbar.Brand href="/">Farmer's Friend</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {!adminLoggedIn ? (
                  <>
                    <Nav.Link href="/admindashboard/adminlogin">Login</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link href="/admindashboard/pendingproducts">
                      <i className="fa fa-tachometer-alt me-2"></i>
                      Products
                    </Nav.Link>

                    <NavDropdown
                      title="User Details"
                      id="basic-nav-dropdown"
                      className="bg-success"
                    >
                      <NavDropdown.Item href="/admindashboard/farmersdetails">
                        <i className="fas fa-handshake-o me-2"></i> Farmers
                        Details
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admindashboard/customersdetails">
                        <i className="fas fa-users me-2"></i>
                        Customers Details
                      </NavDropdown.Item>
                    </NavDropdown>
                    {/* <Nav.Link href="/admindashboard/farmersdetails">
                      <i className="fas fa-handshake-o me-2"></i>
                      Farmers Details
                    </Nav.Link>
                    <Nav.Link href="/admindashboard/customersdetails">
                      <i className="fas fa-users me-2"></i>
                      Customers Details
                    </Nav.Link> */}

                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default AdminHeader;
