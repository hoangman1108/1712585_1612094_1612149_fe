import React from "react";
import nProgress from "nprogress";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { createClass } from "../../../redux/actions/class.action";
export default function AddClassModel({ show, handleClose }) {
  const {me} = useSelector(state => state.auth);
  const dispatch = useDispatch();


  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Formik
        initialValues={{ name: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Field name is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          nProgress.start();
          const dataCreate = {
            name: values.name,
            teachers: [me.id],
            codeJoin: "1234",
          };
          setTimeout(() => {
            dispatch(createClass(dataCreate));
            setSubmitting(true);
            nProgress.done();
            handleClose();
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
            <Modal.Header closeButton>
              <Modal.Title>Thêm lớp học</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tên lớp học</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="10A3"
                />
                <Form.Text className="text-error">
                  {errors.name && touched.name && errors.name}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tên GVCN</Form.Label>
                <Form.Select
                  name="teacher"
                  aria-label="Default select example"
                  as="select"
                >
                  <option>{me.name}</option>
                </Form.Select>
                {/* <Form.Control type="text"
                  name="teacher"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.teacher}
                  placeholder="Nguyễn Văn A" /> */}
                <Form.Text className="text-error">
                  {errors.teacher && touched.teacher && errors.teacher}
                </Form.Text>
              </Form.Group>

              {/* <Form.Group className="mb-3">
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
              </Form.Group> */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button
                variant="outline-success"
                type="submit"
                disabled={isSubmitting}
              >
                Thêm
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
