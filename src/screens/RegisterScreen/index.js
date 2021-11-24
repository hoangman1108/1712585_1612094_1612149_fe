import React from "react";
import * as yup from "yup";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import { connect } from "react-redux";
import { RESET_INFO_REGISTER } from "../../redux/actions/types";
import { useDispatch } from "react-redux";
import authService from "../../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registerSchema = yup.object({
  // username: yup.string().required(),
  phone: yup.string().min(10).required(),
});

const RegisterScreen = (props) => {
  const dispatch = useDispatch();
  const { name, email, password, google, facebook } = props.infoUserRegister;
  const initialLoginValues = {
    name,
    dob: "",
    role: "student",
    email,
    mssv: "",
    phone: "",
    google,
    facebook,
    password,
    confirmPassword: "",
  };
  
  return (
    <Container>
      <ToastContainer />
      <Row className="mt-1">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">
            Register {google && "by Google"} {facebook && "by facebook"}
          </h1>

          <Formik
            initialValues={initialLoginValues}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              // nProgress.start();
              actions.setSubmitting(false);
              delete values.confirmPassword;
              if (!values.facebook) {
                delete values.facebook;
              }
              if (!values.google) {
                delete values.google;
              }
              authService
                .register(values)
                .then(() => {
                  dispatch({ type: RESET_INFO_REGISTER });
                  window.location.href = "/auth/login";
                })
                .catch((error) => {
                  const message =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  toast.error(message);
                });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3" hidden={name ? true : false}>
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Enter your name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                    required={true}
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
                    required={true}
                    name="dob"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    type="select"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.role}
                    required={true}
                    name="role"
                  >
                    <option value="student">student</option>
                    <option value="teacher">teacher</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" hidden={email ? true : false}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="email"
                    placeholder="Enter your Email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    required={true}
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
                    required={true}
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
                    required={true}
                    name="phone"
                  />
                  {props.errors.phone && (
                    <Form.Text className="text-danger">
                      {props.errors.phone}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" hidden={password ? true : false}>
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
                <Form.Group className="mb-3" hidden={password ? true : false}>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.confirmPassword}
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
const mapStateToProps = (state) => ({
  infoUserRegister: state.register.infoUserRegister,
});
export default connect(mapStateToProps)(RegisterScreen);
