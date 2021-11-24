import React, { useEffect, useState } from "react";
import nProgress from "nprogress";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from 'formik';
import emailService from "../../../services/email.service";
import { useSelector } from 'react-redux';

export default function InviteClassModal({ show, handleClose, isInviteTeacher, getInfoClass }) {
  const { me } = useSelector(state => state.auth);
  const infoClass = getInfoClass();
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
          const inviteRole = isInviteTeacher ? "teacher" : "student";
          const dataInvite = {
            to: values.email,
            subject: `Lời mời tham gia lớp học: ${infoClass.name}`,
            title: "test send mail",
            body: "test send mail body",
            type: "invite-join-class",
            info: JSON.stringify({
              url: window.location.origin + `/classes/invite/${infoClass.id}?role=${inviteRole}`,
              teacherName: me.name,
              className: infoClass.name,
              teacherEmail: me.email
            })
          }
          setTimeout(() => {
            emailService.inviteJoinClass(dataInvite);
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
