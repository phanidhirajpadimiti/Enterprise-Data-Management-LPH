import React from 'react';
import { Modal} from 'react-bootstrap';
import EditEmployeeForm from './EditEmployeeForm';

const EditEmployeeModal = ({ show, onHide, tableType, EmployeeId, initialData}) => {
  console.log(initialData)
  console.log(EmployeeId);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditEmployeeForm tableType={tableType} EmployeeId={EmployeeId} onClose={onHide} initialData={initialData}/>
      </Modal.Body>
    </Modal>
  );
};
 
export default EditEmployeeModal;