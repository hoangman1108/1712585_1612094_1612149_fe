import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

export default function CardClass({ info }) {
  const history = useHistory();
  return (
    <Card className="card-class" key={info.id}>
      <Card.Body>
        <Card.Title className="title"
          onClick={() => history.push(`/classes/${info.id}/detail`)}
        >Lớp {info.name}</Card.Title>
        <Card.Text>
          <Row>
            <Col sm={10}>
              <span>Sĩ số: {info.students.length}</span>
              <br />
              <span>GVCN: {info.teachers.length}</span>
            </Col>
            <Col sm={2}>
              {/* {
                role === 'teacher' && (<Button variant="outline-danger"
                  onClick={() => {
                    showDelete(info.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>)
              } */}
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
