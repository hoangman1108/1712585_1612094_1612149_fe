import React, { useEffect, useState } from 'react';
import nProgress from "nprogress";
import { Container, Button, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import userService from '../../services/user.service';
import Swal from "sweetalert2";
import TableGradeBoard from "../GradeBoardClass/components/TableGradeBoard";

export default function Management() {
  const { me } = useSelector(state => state.auth);
  const initialValues = Object.assign({}, me);
  const isTeacher = me?.role === "teacher" ? true : false;
  const [tabSelected, setTabSelected] = useState("profile");
  const [grades, setGrades] = useState([]);
  
  const gradeColumns = React.useMemo(
    () => [
      {
        Header: "Grade Board",
        columns: [
          {
            Header: "Class name",
            accessor: "className",
          },
          {
            Header: "Assignment name",
            accessor: "assignmentName",
          },
          {
            Header: "Point",
            accessor: "point",
          }
        ],
      },
    ],
    []
  );

  useEffect(() => {
    userService.myGrade()
      .then((res) => {
        const data = res?.data;
        if (data.length > 0) {
          if (data.length > 1)
            data.sort((a, b) => b.point - a.point);
          handleDataGrades(data);
        } else {
          setGrades([]);
        }
      })
  }, []);

  const handleDataGrades = (data) => {
    setGrades(data.map(grade => {
      return {
        className: grade.classId.name,
        assignmentName: grade.assignmentId.name,
        point: grade.point
      }
    }));
  }

  const alertSwal = (status, title) => {
    Swal.fire({
      position: "center",
      icon: status,
      title: title,
      showConfirmButton: false,
      showCloseButton: true
    });
  }

  const handleUpdateUser = (dataUpdate, setSubmitting) => {
    userService.updateUser(me.id, dataUpdate)
      .then((res) => {
        setSubmitting(false);
        nProgress.done();
        const message = res?.data?.message;
        if (message === "MSSV_IS_EXISTS") {
          alertSwal("error", "MSSV existed, please enter other MSSV");
          return;
        }

        alertSwal("success", "Update profile successfully");
      })
      .catch(() => {
        setSubmitting(false);
        nProgress.done();
        alertSwal("error", "Update profile failed");
      })
  }

  return (
    <Container>
      <Tabs defaultActiveKey={tabSelected}
        onSelect={(k) => setTabSelected(k)}
        id="uncontrolled-tab-example"
        className="my-3"
      >
        <Tab eventKey="profile" title="My Profile">
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
                  if (!isTeacher && values?.mssv && !values.mssv) {
                    errors.mssv = 'Field mssv is required';
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
                    phone: values.phone
                  }
                  if (!isTeacher) {
                    dataUpdate.mssv = values.mssv;
                  }
                  handleUpdateUser(dataUpdate, setSubmitting);
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
                    {
                      !isTeacher ? (<Form.Group className="mb-3">
                        <Form.Label>MSSV</Form.Label>
                        <Form.Control
                          type="text"
                          name="mssv"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.mssv}
                          placeholder="1612001"
                        />
                      </Form.Group>) : ""
                    }
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
                        disabled={isSubmitting}>Update
                      </Button>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Tab>
        {
          !isTeacher ? (
            <Tab eventKey="grade" title="My Grade">
              {
                grades.length > 0 ? (
                  <TableGradeBoard columns={gradeColumns} data={grades} onEdit={() => { }} isTeacher={isTeacher} />
                ) : (
                  <p>The student has no score !!!</p>
                )
              }
            </Tab>
          ) : ""
        }
      </Tabs>

    </Container>
  )
}
