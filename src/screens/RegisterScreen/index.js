import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import nProgress from "nprogress";

const RegisterScreen = () => {
  const initialLoginValues = {
    name: "",
    dob: "",
    // role": "string",
    email: "",
    mssv: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  return (
    <Container>
      <Row className="mt-1">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">Register</h1>

          <Formik
            initialValues={initialLoginValues}
            // validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              // nProgress.start();
              actions.setSubmitting(false);
              console.log("co vao day", values);
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Enter your name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    required = {true}
                    name="name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of birth</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Enter your DBO"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.dob}
                    required = {true}
                    name="dob"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="email"
                    placeholder="Enter your Email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    required = {true}
                    name="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Mã số</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Enter your mssv"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.mssv}
                    required = {true}
                    name="mssv"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Enter your phone"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.phone}
                    required = {true}
                    name="phone"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.confirmPassword}
                    required = {true}
                    name="confirmPassword"
                  />
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
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;
