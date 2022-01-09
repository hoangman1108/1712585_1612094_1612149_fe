import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Accordion, Col, Card, Form, Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
import classService from "../../../services/class.service";
export default function ListPost(props) {
  const { me } = props;
  const history = useHistory();
  const { name, role, id } = me;
  const classID = history.location.pathname.split("/")[2];
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const res = await classService.getGradeView(classID);
      const data = res?.data;
      console.log("data ne", data);

      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

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

                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your comment</Form.Label>
                    <Form.Control type="text" placeholder="new comment" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Create comment
                  </Button>
                </Form>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Col>
    </Row>
  );
}
