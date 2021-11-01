import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function DeleteClassModel({ show, handleClose, deleteData }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Xoá lớp học</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn chắc chắn muốn xóa lớp học này?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary"
          type="submit"
          onClick={handleClose}>
          Đóng
        </Button>
        <Button
        onClick={()=>{
          deleteData();
          handleClose();
        }}
        variant="outline-danger">Xóa</Button>
      </Modal.Footer>
    </Modal>
  );
}
