import React, { useState } from 'react';
import nProgress from "nprogress";
import { Card, Col, Row, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Formik } from "formik";

export default function CardAssigment({ classID, info, handleAdd, handleEdit, handleDelete }) {
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmitForm = (values, { setSubmitting }) => {
        if (info.id) {
            const form = document.querySelector(`[name='${info.id}']`);
            const inputs = form.querySelectorAll('input.form-control');
            if (isEdit) {
                nProgress.start();
                setSubmitting(true);
                const dataEdit = {
                    name: values.name,
                    score: values.score,
                    id: info.id
                };
                setTimeout(() => {
                    handleEdit(dataEdit);
                    inputs.forEach(input => input.setAttribute('readonly', ''));
                    setSubmitting(false);
                    nProgress.done();
                }, 500);
            } else {
                setSubmitting(false);
                inputs.forEach(input => input.removeAttribute('readonly'));
            }
            setIsEdit(isEdit ? false : true);
        } else if (!info.id) {
            nProgress.start();
            setSubmitting(true);
            const dataAdd = {
                name: values.name,
                score: values.score,
                classId: classID
            };
            setTimeout(() => {
                handleAdd(dataAdd);
                setSubmitting(false);
                nProgress.done();
            }, 500);
        }
    }

    return (
        <Card className="mb-3">
            <Formik
                initialValues={{ name: info.name, score: info.score }}
                validate={(values) => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = "Field name is required";
                    }
                    if (!values.score) {
                        errors.score = "Field score is required";
                    }
                    return errors;
                }}
                onSubmit={handleSubmitForm}
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
                    <Form onSubmit={handleSubmit} name={info.id}>
                        <Form.Group className="mb-2 mt-2">
                            <Row className="align-items-center">
                                <Col xs={4} lg={2}>
                                    <Form.Label>Assigment name:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        readOnly />
                                    <Form.Text className="text-error">
                                        {(errors.name && touched.name && errors.name)}
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Row className="align-items-center">
                                <Col xs={4} lg={2}>
                                    <Form.Label>Assigment score:</Form.Label>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="text"
                                        name="score"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.score}
                                        readOnly />
                                    <Form.Text className="text-error">
                                        {(errors.score && touched.score && errors.score)}
                                    </Form.Text>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {
                                info.id && (
                                    <Row>
                                        <Col></Col>
                                        <Col className="d-flex justify-content-end">
                                            <Button
                                                variant="danger"
                                                onClick={handleDelete.bind(this, info.id)}>
                                                Delete
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="ms-2"
                                                disabled={isSubmitting}
                                                variant={isEdit ? "success" : "primary"}
                                                >
                                                {isEdit ? "Save" : "Edit"}
                                            </Button>
                                        </Col>
                                    </Row>
                                )
                            }
                            {
                                !info.id && (
                                    <Row>
                                        <Button type="submit" disabled={isSubmitting} variant="success">Add</Button>
                                    </Row>
                                )
                            }
                        </Form.Group>
                    </Form>
                )}
            </Formik>
        </Card>

    )
}
