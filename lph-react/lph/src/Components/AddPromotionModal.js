import React from 'react';
import { Modal } from 'react-bootstrap';
import AddPromotionForm from './AddPromotionForm';

const AddPromotionModal = ({ show, onHide, tableType}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddPromotionForm tableType={tableType} onClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};
 
export default AddPromotionModal;