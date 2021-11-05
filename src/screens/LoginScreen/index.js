import React from "react";
import * as yup from "yup";
import nProgress from "nprogress";
import { Formik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import convertMessage from "../../utils/converMessage";
import { Redirect } from "react-router";

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(6).required(),
});

const initialLoginValues = { username: "0967945772", password: "man1234" };

const LoginScreen = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  if (isLoggedIn) {
    return(<Redirect to={'/'} />)
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">Login</h1>
          <Formik
            initialValues={initialLoginValues}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              nProgress.start();
              actions.setSubmitting(false);
              const { username, password } = values;
              dispatch(login(username, password))
                .then(() => {
                  console.log(message, 'message');
                  nProgress.done();
                  window.location.reload();
                })
                .catch(() => {
                  nProgress.done();
                  // setLoading(false);
                });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Enter email/mssv/phone"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.username}
                    name="username"
                  />
                  {props.errors.username && (
                    <Form.Text className="text-danger">
                      {props.errors.username}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password"
                  />
                  {props.errors.password && (
                    <Form.Text className="text-danger">
                      {props.errors.password}
                    </Form.Text>
                  )}
                </Form.Group>
                <Button
                  className="w-100 fw-bolder"
                  variant="outline-success"
                  type="submit"
                >
                  Login
                </Button>
                <p
                  style={{ fontSize: ".875em" }}
                  class="text-muted text-center rounded mt-3"
                >
                  Don't have an account yet?
                  <a className="text-success" href="/auth/register">
                    {" "}
                    Register
                  </a>
                </p>

                {message && (
                  <p
                    style={{ fontSize: ".875em" }}
                    class="text-danger text-center rounded mt-3"
                  >
                    {convertMessage(message)}
                  </p>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container >
  );
};

export default LoginScreen;
