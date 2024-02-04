import React from 'react';
import { Modal } from 'react-bootstrap';
import AddOrderForm from './AddOrderForm';

const AddOrderModal = ({ show, onHide, tableType}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddOrderForm tableType={tableType} onClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};
 
export default AddOrderModal;