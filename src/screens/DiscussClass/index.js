import React, { useState, useEffect } from "react";
import { Container, Col, Button, Modal, Form } from "react-bootstrap";
import nProgress from "nprogress";
import { useHistory } from "react-router";
import * as yup from "yup";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import ListPost from "./components/ListPost";
import TabsDetail from "../ClassScreen/components/TabsDetail";
import classService from "../../services/class.service";

export default function DiscussClass() {
  const { me } = useSelector((state) => state.auth);
  console.log("me ne", me);
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const [reloadList, setReloadList] = useState(true);
  const [assignmentData, setAssignmentData] = useState([]);
  const classID = history.location.pathname.split("/")[2];
  const initialLoginValues = {
    classId: classID,
    studentId: me?.id,
    Mssv: "",
    composition: "",
    current: 0,
    expect: 0,
    explanation: "",
    comments: [],
    mark: "processing",
  };

  useEffect(() => {
    classService.getAssigments(classID).then((response) => {
      setAssignmentData(response.data);
    });
  }, []);

  const loginSchema = yup.object({
    Mssv: yup.string().required(),
    composition: yup.string().required(),
    explanation: yup.string().required(),
  });

  const createForm = () => {
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
  };
  return (
    <Container>
      <TabsDetail />
      <Col>
        {" "}
        <Button
          style={{ display: `${me.role === "teacher" ? "none" : ""}` }}
          onClick={createForm}
        >
          Create Post
        </Button>{" "}
      </Col>
      <Modal show={showForm}>
        <Modal.Header>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik
            initialValues={initialLoginValues}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              nProgress.start();
              actions.setSubmitting(false);
              classService.createGradeView({ ...values }).then(() => {
                nProgress.done();
                closeForm();
                setReloadList(!reloadList);
              });
            }}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail1">
                  <Form.Label>MSSV</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="Mssv"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.Mssv}
                    name="Mssv"
                  />
                  {props.errors.Mssv && (
                    <Form.Text className="text-danger">
                      {props.errors.Mssv}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail2">
                  <Form.Label>Assigment</Form.Label>
                  <Form.Control
                    className="focus-success"
                    as="select"
                    placeholder="composition"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.composition}
                    name="composition"
                  >
                    {assignmentData.map((ele, index) => (
                      <option key={index} value={ele.id}>
                        {ele.name}
                      </option>
                    ))}
                  </Form.Control>
                  {props.errors.composition && (
                    <Form.Text className="text-danger">
                      {props.errors.composition}
                    </Form.Text>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail3">
                  <Form.Label>Current grade</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="current"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.current}
                    name="current"
                  />
                  {/* {props.errors.current && (
                    <Form.Text className="text-danger">
                      {props.errors.current}
                    </Form.Text>
                  )} */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail4">
                  <Form.Label>Expect grade</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="expect"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.expect}
                    name="expect"
                  />
                  {/* {props.errors.expect && (
                    <Form.Text className="text-danger">
                      {props.errors.expect}
                    </Form.Text>
                  )} */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail5">
                  <Form.Label>Explanation</Form.Label>
                  <Form.Control
                    className="focus-success"
                    type="text"
                    placeholder="explanation"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.explanation}
                    name="explanation"
                  />
                  {props.errors.explanation && (
                    <Form.Text className="text-danger">
                      {props.errors.explanation}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button variant="secondary" onClick={closeForm}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Create Post
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
      <ListPost reloadList={reloadList} me={me} />
    </Container>
  );
}
