import React from "react";
import { Accordion, Col, Card, Form, Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract } from "@fortawesome/free-solid-svg-icons";
export default function According() {
  return (
    <Row className="mt-5">
      <Col sm={{ span: 8, offset: 2 }}>
        {/* defaultActiveKey="0" */}
        <Accordion>
          <Accordion.Item eventKey="0" className="mt-3">
            <Accordion.Header>
              <FontAwesomeIcon icon={faFileContract} />
              <span className="ps-3">Post</span>
            </Accordion.Header>
            <Accordion.Body className="shadow rounded">
              <Card>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
              <br />

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Your comment</Form.Label>
                  <Form.Control type="text" placeholder="new comment" />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                  Create comment
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
}
