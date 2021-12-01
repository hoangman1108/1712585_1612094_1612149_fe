import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

export default function TabsDetail() {
  const history = useHistory();
  const currentPath = history.location.pathname.split('/')[3];
  const handleChangePage = (path) => {
    if (currentPath === path) {
      return;
    }
    history.push(history.location.pathname.replace(currentPath, path));
  }
  return (
    <Row className="bg-success text-center">
      <Col className={`text-white fw-bold p-2 fs-5 ${currentPath === 'detail' ? '' : 'bg-non-active'}`}
        onClick={() => handleChangePage('detail')}
      >
        Detail
      </Col>
      <Col className={`text-white fw-bold p-2 fs-5 ${currentPath === 'assignment' ? '' : 'bg-non-active'}`} //bg-non-active
        onClick={() => handleChangePage('discuss')}
      >
        Discuss
      </Col>
      <Col className={`text-white fw-bold p-2 fs-5 ${currentPath === 'grade' ? '' : 'bg-non-active'}`}
        onClick={() => handleChangePage('grade')}
      >
        Grade Structure
      </Col>
    </Row>
  )
}
