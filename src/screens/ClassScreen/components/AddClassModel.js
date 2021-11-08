import React, { useEffect, useState } from "react";
import nProgress from "nprogress";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import userService from "../../../services/user.service";
import { createClass } from "../../../redux/actions/class.action";
export default function AddClassModel({ show, handleClose, msgError }) {
  const [teachers, setTeachers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    userService.getUserByRole('teacher')
      .then(value => {
        if (value.data) {
          setTeachers(value.data)
        }
      })
  }, [])

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Formik
        initialValues={{ name: '', teacher: undefined }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Field name is required';
          }
          if (!values.teacher) {
            errors.teacher = 'Field teacher is required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          nProgress.start();
          const dataCreate = {
            name: values.name,
            teachers: [values.teacher],
            codeJoin: "1234",
          }
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
                <Form.Select name="teacher"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.teacher}
                  aria-label="Default select example"
                  as="select"
                >
                  <option>Chọn giáo viên</option>
                  {
                    teachers.map((teacher, index) => (<option key={index} value={teacher.id}>{teacher.name}</option>))
                  }
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
