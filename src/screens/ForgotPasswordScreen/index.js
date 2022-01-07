import React from "react";
import nProgress from "nprogress";
import { Formik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import authService from "../../services/auth.service";
import Swal from "sweetalert2";

const ForgotPasswordScreen = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">Forgot Password</h1>
          <Formik
            initialValues={{ email: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Field name is required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              nProgress.start();
              setSubmitting(true);
              const { email } = values;
              authService.forgotPassword(email)
              .then((res) => {
                nProgress.done();
                setSubmitting(false);
                const status = res?.data?.message === "CHECK_YOUR_EMAIL_TO_RESET_PASSWORD" ? true : false;
                Swal.fire({
                  position: "center",
                  icon: status ? "success" : "error",
                  title: status ? "Click here to redirect your email" : "Email doesn't exist in system",
                  showConfirmButton: status,
                  confirmButtonText: 'Redirect',
                  showCancelButton: !status
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.open("https://mail.google.com/", "_self");
                  }
                });
              });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Enter email to get password again"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name="email"
                  />
                  {props.errors.email && (
                    <Form.Text className="text-danger">
                      {props.errors.email}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  className="w-100 fw-bolder"
                  variant="outline-success"
                  type="submit"
                >
                  Search
                </Button>
                
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordScreen;
