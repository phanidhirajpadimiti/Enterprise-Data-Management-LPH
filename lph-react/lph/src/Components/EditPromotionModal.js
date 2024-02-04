import React from 'react';
import { Modal} from 'react-bootstrap';
import EditPromotionForm from './EditPromotionForm';

const EditPromotionModal = ({ show, onHide, tableType, promotionId, initialData}) => {
  console.log(initialData)
  console.log(promotionId);
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit {tableType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditPromotionForm tableType={tableType} promotionId={promotionId} onClose={onHide} initialData={initialData}/>
      </Modal.Body>
    </Modal>
  );
};
 
export default EditPromotionModal;