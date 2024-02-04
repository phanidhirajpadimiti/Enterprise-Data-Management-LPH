import React from 'react';
import { Modal} from 'react-bootstrap';
import EditOrderForm from './EditOrderForm';

const EditOrderModal = ({ show, onHide, tableType, orderId, initialData}) => {
  console.log(initialData)
  console.log(orderId);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditOrderForm tableType={tableType} orderId={orderId} onClose={onHide} initialData={initialData}/>
      </Modal.Body>
    </Modal>
  );
};
 
export default EditOrderModal;