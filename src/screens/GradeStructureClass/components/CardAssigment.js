import React, { useState } from 'react';
import nProgress from "nprogress";
import { Card, Col, Row, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import { Formik } from "formik";

export default function CardAssigment({ classID, info, handleAdd, handleEdit, handleDelete }) {
    const [isEdit, setIsEdit] = useState(false);

    const handleSubmitForm = (values, { setSubmitting }) => {
        if (info.id && isEdit) {
            nProgress.start();
            setSubmitting(true);
            const dataEdit = {
                name: values.name,
                score: values.score,
                classId: classID
            };
            setTimeout(() => {
                handleEdit(dataEdit);
                setSubmitting(false);
                nProgress.done();
            }, 500);
        } else if (!info.id) {
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
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-2">
                            <Form.Label>Assigment name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                readOnly={isEdit} />
                            <Form.Text className="text-error">
                                {(errors.name && touched.name && errors.name)}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Assigment score</Form.Label>
                            <Form.Control
                                type="text"
                                name="score"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.score}
                                readOnly={isEdit} />
                            <Form.Text className="text-error">
                                {(errors.score && touched.score && errors.score)}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            {
                                info.id && (
                                    <Row xs={2} md={4} lg={6}>
                                        <Col>
                                            <Button 
                                                type="submit" 
                                                disabled={isSubmitting} 
                                                variant={isEdit ? "success" : "primary"} 
                                                onClick={handleEdit.bind()}>
                                                {isEdit ? "Save" : "Edit"}
                                            </Button>
                                            <Button 
                                                variant="danger"
                                                className="ms-2"
                                                onClick={handleDelete.bind(this, info.id)}>
                                                Delete
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
