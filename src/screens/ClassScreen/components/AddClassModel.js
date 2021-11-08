import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from 'formik';
import { useSelector } from "react-redux";

export default function AddClassModel({ show, handleClose, createData, msgError }) {

  const { classes } = useSelector(state => state.class)
  const data = classes.filter(element => element.role === 'teacher');
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Formik
        initialValues={{ name: '', teacher: '', quantity: 0 }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Field name is required';
          }
          if (!values.teacher) {
            errors.teacher = 'Field teacher is required';
          }
          if (values.quantity < 1) {
            errors.quantity = 'Field quantity no less than 1';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          createData(values);
          setSubmitting(true);
          handleClose();
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
            <Modal.Header closeButton>
              <Modal.Title>Thêm lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tên lớp học</Form.Label>
                <Form.Control type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="10A3" />
                <Form.Text className="text-error">
                  {(errors.name && touched.name && errors.name) || msgError}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tên GVCN</Form.Label>
                <Form.Control type="text"
                  name="teacher"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.teacher}
                  placeholder="Nguyễn Văn A" />
                <Form.Text className="text-error">
                  {errors.teacher && touched.teacher && errors.teacher}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sĩ số</Form.Label>
                <Form.Control type="number"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity}
                  placeholder="37" />
                <Form.Text className="text-error">
                  {errors.quantity && touched.quantity && errors.quantity}
                </Form.Text>
              </Form.Group>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary"
                onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="outline-success" type="submit" disabled={isSubmitting}>Thêm</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
