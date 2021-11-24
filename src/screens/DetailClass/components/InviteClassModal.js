import React, { useEffect, useState } from "react";
import nProgress from "nprogress";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Formik } from 'formik';
import { inviteJoinClass } from "../../../redux/actions/email.action";
export default function InviteClassModal({ show, handleClose, isInviteTeacher }) {
  const dispatch = useDispatch();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Formik
        initialValues={{ email: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Field email is required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          nProgress.start();
          const dataInvite = {
            to: values.email,
            subject: "wellcome",
            title: "test send mail",
            body: "ahihi do ngoc",
            type: "wellcome",
          }
          setTimeout(() => {
            dispatch(inviteJoinClass(dataInvite));
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
              <Modal.Title>{isInviteTeacher ? "Mời giáo viên" : "Mời học viên"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nhập email</Form.Label>
                <Form.Control type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="abcxyz@gmail.com" />
                <Form.Text className="text-error">
                  {(errors.email && touched.email && errors.email)}
                </Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Form.Label className="h6 text-muted">
                    {isInviteTeacher ? "Giáo viên bạn thêm có thể làm mọi thứ, trừ xóa lớp học." : "" }
                </Form.Label>
                <Button variant="outline-secondary"
                    onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="outline-success" type="submit" disabled={isSubmitting}>Mời</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
