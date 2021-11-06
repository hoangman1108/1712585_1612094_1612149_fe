import React from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
export default function CardClass({ showDelete, info, role }) {
  return (
    <Card className="card-class" key={info._id}>
      <Card.Body>
        <Card.Title className="title">Lớp {info.name}</Card.Title>
        <Card.Text>
          <Row>
            <Col sm={10}>
              <span>Sĩ số: {info.quantity} học sinh</span>
              <br />
              <span>GVCN: {info.teacher}</span>
            </Col>
            <Col sm={2}>

              {
                role === 'teacher' && (<Button variant="outline-danger"
                  onClick={() => {
                    showDelete(info._id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>)
              }
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
