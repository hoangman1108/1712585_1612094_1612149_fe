import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Accordion, Col, Card, Form, Button, Row } from "react-bootstrap";
import { Formik } from "formik";
import nProgress from "nprogress";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import classService from "../../../services/class.service";
export default function ListPost(props) {
  const { reloadList, me } = props;

  const history = useHistory();
  const { name, role, id, email } = me;
  const classID = history.location.pathname.split("/")[2];
  const [posts, setPosts] = useState([]);
  const [gradeViewId, setGradeViewId] = useState("");
  const [reloadListComment, setReloadListComment] = useState(true);

  const initialLoginValues = {
    name: name,
    email: email,
    role: role,
    comment: "",
  };
  const loginSchema = yup.object({
    comment: yup.string().min(1).required(),
  });

  useEffect(() => {
    classService.getGradeView(classID).then((res) => {
      const data = res?.data;
      console.log("data ne", data);

      setPosts(data);
    });
  }, [reloadList,reloadListComment]);

  return (
    <Row className="mt-5">
      <Col sm={{ span: 8, offset: 2 }}>
        <Accordion>
          {posts.map((e, index) => (
            <Accordion.Item key={index} eventKey="0" className="mt-3">
              <Accordion.Header>
                <FontAwesomeIcon icon={faFileContract} />
                <span className="ps-3">{`${e.composition.name} - ${e.Mssv} `}</span>
              </Accordion.Header>
              <Accordion.Body className="shadow rounded">
                <Card>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    <Card.Title>{e.Mssv}</Card.Title>
                    <Card.Text>
                      <div>{`Current grade: ${e.current}`}</div>
                      <div>{`Expect grade: ${e.expect}`}</div>
                      <div>{`Explanation: ${e.explanation}`}</div>
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
                <br />
                <h6>Comments: </h6>
                <Card>
                  {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                  <Card.Body>
                    {e.comments.map((o, index) => (
                      <Card.Text key={index}>
                        <span style={{ fontWeight: "bold" }}>{o.name} </span>
                        <span
                          style={{ color: "gray" }}
                        >{` (${o.email}): `}</span>
                        {o.comment}
                      </Card.Text>
                    ))}

                    {/* <Button variant="primary">Go somewhere</Button> */}
                  </Card.Body>
                </Card>
                <br />
                <Formik
                  initialValues={initialLoginValues}
                  validationSchema={loginSchema}
                  onSubmit={(values, actions) => {
                    nProgress.start();
                    actions.setSubmitting(false);
                    classService
                      .createCommentInPost(gradeViewId, { ...values })
                      .then(() => {
                        setReloadListComment(!reloadListComment);
                        nProgress.done();
                        // closeForm();
                        // setReloadList(!reloadList);
                      });
                  }}
                >
                  {(props) => (
                    <Form onSubmit={props.handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Your comment</Form.Label>
                        <Form.Control
                          className="focus-success"
                          type="text"
                          placeholder="new comment"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.comment}
                          name="comment"
                        />

                        {props.errors.comment && (
                          <Form.Text className="text-danger">
                            {props.errors.comment}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group style={{ display: "none" }}>
                        <Form.Control
                          type="text"
                          value={e.id}
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          name="gradeViewId"
                        />
                      </Form.Group>

                      <Button
                        onClick={() => {
                          setGradeViewId(e.id);
                        }}
                        variant="primary"
                        type="submit"
                      >
                        Create comment
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Col>
    </Row>
  );
}
