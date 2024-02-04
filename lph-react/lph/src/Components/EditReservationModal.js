import React from 'react';
import { Modal} from 'react-bootstrap';
import EditReservationForm from './EditReservationForm';

const EditReservationModal = ({ show, onHide, tableType, itemId, initialData}) => {
  console.log(initialData)
  console.log(itemId);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditReservationForm tableType={tableType} reservationId={itemId} onClose={onHide} initialData={initialData}/>
      </Modal.Body>
    </Modal>
  );
};
 
export default EditReservationModal;