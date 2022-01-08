import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import {
  BsLink45Deg
} from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';

export default function CardClass({ info }) {
  const history = useHistory();
  const { me } = useSelector(state => state.auth);
  const urlJoinClass = window.location.origin + `/classes/invite/${info.id}?role=${me.role}`
  const handleCopyLink = () => {
    navigator.clipboard.writeText(urlJoinClass);
    toast('Link classroom copied to clipboard !', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <Card className="card-class card-shadow mb-2" key={info.id}>
      <Card.Body>
        <Card.Title className="title text-center" style={{ borderRadius: '3px' }}
          onClick={() => history.push(`/classes/${info.id}/detail`)}
        >Class {info.name}</Card.Title>
        <Card.Text>
          <Row>
            <Col sm={10}>
              <span>Total: {info.students.length}</span>
              <br />
              <span>Teachers: {info.teachers.length}</span>
            </Col>
          </Row>
          <div style={{
            background: '#80808061',
            borderRadius: '50%',
            cursor: "pointer",
            height: "36px",
            width: "36px",
            lineHeight: 2,
            float: "right",
            textAlign: "center"
          }}
            onClick={handleCopyLink}>
            <BsLink45Deg
              style={{ fontSize: "20px" }}
            />
          </div>

          <ToastContainer />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
