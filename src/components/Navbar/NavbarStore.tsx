import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";

import { Link } from "react-router-dom";
import "./Navbar.css";
function NavbarStore({ cartCount }: any) {
  const [viewProd, setViewProd] = useState(false);

  return (
    <div>
      <Navbar style={{ backgroundColor: "#a6a6a6" }} expand="lg">
        <Container fluid style={{ padding: "0px 60px 0px 70px" }}>
          <Navbar.Brand style={{ color: "white" }}>
            <h2>TeeRex Store</h2>
          </Navbar.Brand>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              {viewProd ? (
                <Nav.Item>
                  <Link to="/home">
                    <Button
                      variant="light"
                      style={{ height: "38px", marginRight: "20px" }}
                      onClick={() => setViewProd(false)}
                    >
                      Products
                    </Button>
                  </Link>
                </Nav.Item>
              ) : (
                ""
              )}
              <Nav.Item>
                <Link to="cart">
                  <Button
                    variant="light"
                    style={{ height: "38px", marginRight: "20px" }}
                    onClick={() => setViewProd(true)}
                  >
                    <Cart />
                    <span className="badge badge-warning" id="lblCartCount">
                      {cartCount}
                    </span>
                  </Button>
                </Link>
              </Nav.Item>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarStore;
