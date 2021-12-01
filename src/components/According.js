import React from 'react'
import { Accordion, Col, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
export default function According() {
  return (
    <Row className="mt-5">
      <Col sm={{ span: 8, offset: 2 }}>
      {/* defaultActiveKey="0" */}
      <Accordion> 
      <Accordion.Item eventKey="0"  className="mt-3">
        <Accordion.Header>
          <FontAwesomeIcon icon={faFileContract}/>
           <span className="ps-3">Post</span></Accordion.Header>
        <Accordion.Body className="shadow rounded">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
      </Col>
    </Row>
  )
}
