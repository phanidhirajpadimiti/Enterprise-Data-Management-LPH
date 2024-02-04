import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import EditPromotionModal from './EditPromotionModal';
import DeleteModal from './DeleteModal';
import AddPromotionModal from './AddPromotionModal';

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPromotionId, setEditPromotionId] = useState(null);
  const [editPromotion, setEditPromotion] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/promotions/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Sort promotions or perform any other pre-processing as needed
        setPromotions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  const handleEdit = (promotionId) => {
    const promotionToEdit = promotions.find((promotion) => promotion.PROMOTIONID === promotionId);
    setEditPromotionId(promotionId);
    setEditPromotion(promotionToEdit);
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleAdd = () => {
    setShowAddForm(true);
  }
  
  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleDelete = (promotionId) => {
    setPromotionToDelete(promotionId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/promotions/${promotionToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete promotion (Status: ${response.status})`);
      }

      setPromotions((prevPromotions) =>
        prevPromotions.filter((promotion) => promotion.PROMOTIONID !== promotionToDelete)
      );

      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setPromotionToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="content_wrapper">
        <h1 className="content_title">Promotions</h1>
        <button type="button" class="btn btn-success createbut" onClick={() => handleAdd()} style={{ color: '#FFD100' }}>Add Promotion
        </button>
        <Table className="table">
          <thead className="table-light">
            <tr>
              <th>Promotion ID</th>
              <th>Promotion Name</th>
              <th>Description</th>
              <th>Discount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr key={promotion.PROMOTIONID}>
                <td>{promotion.PROMOTIONID}</td>
                <td>{promotion.PROMOTIONNAME}</td>
                <td>{promotion.DESCRIPTION}</td>
                <td>{promotion.DISCOUNT}</td>
                <td>{promotion.STARTDATE}</td>
                <td>{promotion.ENDDATE}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(promotion.PROMOTIONID)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(promotion.PROMOTIONID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Edit Form Modal */}
        <EditPromotionModal
          show={showEditForm}
          onHide={handleCloseEditForm}
          promotionId={editPromotionId}
          title="Edit Promotion"
          initialData={editPromotion}
        />
        {/* Add Form Modal */}
        <AddPromotionModal
          show={showAddForm} // Corrected prop name
          onHide={handleCloseAddForm} // Corrected prop name
          tableType="item" // You might need to adjust this based on your use case
          title="Add"
        />
        {/* Delete Confirmation Modal */}
        <DeleteModal
          show={showDeleteConfirmation}
          onHide={handleDeleteCancel}
          onConfirm={handleDeleteConfirmation}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Promotions;
