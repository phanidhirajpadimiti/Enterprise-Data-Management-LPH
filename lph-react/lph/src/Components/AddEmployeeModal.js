import React from 'react';
import { Modal} from 'react-bootstrap';
import AddEmployeeForm from './AddEmployeeForm';

const AddEmployeeModal = ({ show, onHide, tableType}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddEmployeeForm tableType={tableType} onClose={onHide} />
      </Modal.Body>
    </Modal>
  );
};
 
export default AddEmployeeModal;