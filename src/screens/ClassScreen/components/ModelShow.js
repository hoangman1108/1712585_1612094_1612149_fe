import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import convertMessage from '../../../utils/converMessage';
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../../redux/actions/message.action';

export default function ModelShow({message}) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(clearMessage());
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{color: 'red'}}>{convertMessage(message)}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
