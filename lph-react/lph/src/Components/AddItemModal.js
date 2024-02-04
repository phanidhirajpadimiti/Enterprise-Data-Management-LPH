import React from 'react';
import { Modal} from 'react-bootstrap';
import AddItemForm from './AddItemForm';

const AddItemModal = ({ show, onHide, tableType}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddItemForm tableType={tableType} onClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};
 
export default AddItemModal;