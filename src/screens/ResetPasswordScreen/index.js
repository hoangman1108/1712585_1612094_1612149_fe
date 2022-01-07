import React from "react";
import nProgress from "nprogress";
import { Formik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import authService from "../../services/auth.service";
import Swal from "sweetalert2";
import { useHistory } from 'react-router';

const ResetPasswordScreen = () => {
  const history = useHistory();
  const userID = history.location.pathname.split('/')[4];

  return (
    <Container>
      <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">Reset Password</h1>
          <Formik
            initialValues={{ newPassword: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.newPassword) {
                errors.newPassword = "Field new password is required";
              }

              if (values.newPassword && values.newPassword.length < 6) {
                errors.newPassword = "Password must be at least 6 characters";
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              nProgress.start();
              setSubmitting(true);
              const { newPassword } = values;
              authService.resetPassword(userID, newPassword)
              .then((res) => {
                nProgress.done();
                setSubmitting(false);
                const status = res?.data?.message === "RESET_PASSWORD_SUCCESS" ? true : false;
                Swal.fire({
                  position: "center",
                  icon: status ? "success" : "error",
                  title: status ? "Reset password successfully" : "Reset password failed",
                  showConfirmButton: status,
                  confirmButtonText: 'Redirect to login',
                  showCancelButton: !status
                }).then((result) => {
                  if (result.isConfirmed) {
                    history.push("/auth/login");
                  }
                });
              });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicNewPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="password"
                    placeholder="Enter new password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.newPassword}
                    name="newPassword"
                  />
                  {props.errors.newPassword && (
                    <Form.Text className="text-danger">
                      {props.errors.newPassword}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  className="w-100 fw-bolder"
                  variant="outline-success"
                  type="submit"
                  disabled={props.isSubmitting}
                >
                  Reset
                </Button>
                
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordScreen;
