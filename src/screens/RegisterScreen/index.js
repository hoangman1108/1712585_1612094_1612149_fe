import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";


const RegisterScreen = () => {
  return (
    <Container>
      <Row className="mt-1">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">Register</h1>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                className="focus-success"
                type="text"
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                className="focus-success"
                type="text"
                placeholder="Enter your DBO"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="focus-success"
                type="email"
                placeholder="Enter your Email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mã số</Form.Label>
              <Form.Control
                className="focus-success"
                type="text"
                placeholder="Enter your mssv"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                className="focus-success"
                type="text"
                placeholder="Enter your phone"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Button
              className="w-100 fw-bolder"
              variant="outline-success"
              type="submit"
            >
              Register
            </Button>
            <p
              style={{ fontSize: ".875em" }}
              class="text-muted text-center rounded mt-3"
            >
              Do have an account ?
              <a className="text-success" href="/auth/login">
                {" "}
                Login
              </a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
