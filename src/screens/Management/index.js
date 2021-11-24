import React from 'react';
import nProgress from "nprogress";
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import userService from '../../services/user.service';

export default function Management() {
  const { me } = useSelector(state => state.auth);
  const initialValues = Object.assign({}, me);
  return (
    <Container>
      <Row className="mt-1">
        <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
          <h1 className="text-success fw-bold text-center rounded">
          Profile
          </h1>

          <Formik
            initialValues={initialValues}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Field name is required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              nProgress.start();
              setSubmitting(true);
              const dataUpdate = {
                id: me.id,
                name: values.name,
                dob: values.dob,
                role: me.role,
                phone: values.phone,
              }
              setTimeout(() => {
                userService.updateUser(me.id, dataUpdate);
                setSubmitting(false);
                nProgress.done();
              }, 500);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Tran Van A" />
                  <Form.Text className="text-error">
                    {(errors.name && touched.name && errors.name)}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="text"
                    name="dob"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.dob}
                    placeholder="24/11/2021" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    placeholder="0123456789" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="abcxyz@gmail.com"
                    readOnly />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                    readOnly />
                </Form.Group>
                <Form.Group className="text-center">
                  <Button
                    className="text-center"
                    variant="outline-success"
                    type="submit"
                    disabled={isSubmitting}>Cập nhật
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}
