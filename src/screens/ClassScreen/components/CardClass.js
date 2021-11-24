import React, { useRef } from 'react'
import { Card, Col, Row, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

export default function CardClass({ info }) {
  const history = useHistory();
  const { me } = useSelector(state => state.auth);
  const textAreaRef = useRef(null);
  const urlJoinClass = window.location.origin + `/classes/invite/${info.id}?role=${me.role}`
  const handleCopyLink = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
  }

  return (
    <Card className="card-class" key={info.id}>
      <Card.Body>
        <Card.Title className="title text-center"
          onClick={() => history.push(`/classes/${info.id}/detail`)}
        >Lớp {info.name}</Card.Title>
        <Card.Text>
          <Row>
            <Col sm={10}>
              <span>Sĩ số: {info.students.length}</span>
              <br />
              <span>GVCN: {info.teachers.length}</span>
            </Col>
          </Row>
          <Row>
            <InputGroup className="mb-2 mt-2">
              <Button onClick={handleCopyLink} variant="outline-secondary" id="button-addon1">
                Copy link
              </Button>
              <FormControl
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                value={urlJoinClass}
                ref={textAreaRef}
                readOnly
              />
            </InputGroup>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
