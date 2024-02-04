import React from 'react';
import { Modal } from 'react-bootstrap';
import AddReservationForm from './AddReservationForm';

const AddReservationModal = ({ show, onHide, tableType}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddReservationForm tableType={tableType} onClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};
 
export default AddReservationModal;