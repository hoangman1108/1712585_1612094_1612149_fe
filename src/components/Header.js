import React from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignInAlt,
  faSignOutAlt,
  faAngleRight,
  faTasks,
  faSearch,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "../redux/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export default function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogout = () => {
    dispatch(logout());
    history.push("/auth/login");
  };

  return (
    <Navbar bg="secondary" expand={false}>
      <Container fluid>
        <Navbar.Brand href="/" className="text-light fw-bold">
          SPA GradeBook
        </Navbar.Brand>
        <Navbar.Toggle className="bg-light" aria-controls="spaGradeBook" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton className="bg-secondary">
            <Offcanvas.Title
              id="offSpaGradeBook"
              className="text-light fw-bold"
            >
              SPA GradeBook
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-secondary">
            <Nav className="justify-content-end flex-grow-1 bg-navbar">
              <Nav.Link className="custom-nav-link text-light px-3" href="/">
                <FontAwesomeIcon className="color-iCoin" icon={faHome} />
                {' '} Home
                <FontAwesomeIcon
                  className="color-iCoin float-end"
                  icon={faAngleRight}
                />
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 bg-navbar">
              <Nav.Link
                className="custom-nav-link text-light px-3"
                href="/profile"
              >
                <FontAwesomeIcon className="color-iCoin" icon={faTasks} />
                {" "} Profile
                <FontAwesomeIcon
                  className="color-iCoin float-end"
                  icon={faAngleRight}
                />
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 bg-navbar">
              <Nav.Link
                className="custom-nav-link text-light px-3"
                href="/classes?offset=1&limit=6"
              >
                <FontAwesomeIcon className="color-iCoin" icon={faUserFriends} />
                {" "} Classes
                <FontAwesomeIcon
                  className="color-iCoin float-end"
                  icon={faAngleRight}
                />
              </Nav.Link>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 bg-navbar">
              <Nav.Link
                className="custom-nav-link text-light px-3"
              >
                <FontAwesomeIcon className="color-iCoin" icon={faSearch} />
                {" "} Search
                <FontAwesomeIcon
                  className="color-iCoin float-end"
                  icon={faAngleRight}
                />
              </Nav.Link>
            </Nav>

            {!isLoggedIn && (
              <Nav className="justify-content-end flex-grow-1 bg-navbar">
                <Nav.Link
                  className="custom-nav-link text-light px-3"
                  href="/auth/login"
                >
                  <FontAwesomeIcon className="color-iCoin" icon={faSignInAlt} />
                  {" "} Login
                  <FontAwesomeIcon
                    className="color-iCoin float-end"
                    icon={faAngleRight}
                  />
                </Nav.Link>
              </Nav>
            )}
            {!isLoggedIn && (
              <Nav className="justify-content-end flex-grow-1 bg-navbar">
                <Nav.Link
                  className="custom-nav-link text-light px-3"
                  href="/auth/register"
                >
                  <FontAwesomeIcon className="color-iCoin" icon={faSignInAlt} />
                  {" "} Register
                  <FontAwesomeIcon
                    className="color-iCoin float-end"
                    icon={faAngleRight}
                  />
                </Nav.Link>
              </Nav>
            )}
            {isLoggedIn && (
              <Nav className="justify-content-end flex-grow-1 bg-navbar">
                <Nav.Link
                  className="custom-nav-link text-light px-3"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon
                    className="color-iCoin"
                    icon={faSignOutAlt}
                  />
                  {" "} Logout
                  <FontAwesomeIcon
                    className="color-iCoin float-end"
                    icon={faAngleRight}
                  />
                </Nav.Link>
              </Nav>
            )}
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
