import React, { useState, useEffect } from 'react';

const EditPromotionForm = ({ promotionId, initialData }) => {
  const [promotion, setPromotion] = useState({
    PROMOTIONNAME: '',
    DESCRIPTION: '',
    DISCOUNT: '',
    STARTDATE: '',
    ENDDATE: '',
    // Add other promotion properties here
  });

  useEffect(() => {
    // Populate the form fields with the data from initialData
    if (initialData) {
      setPromotion({
        PROMOTIONNAME: initialData.PROMOTIONNAME || '',
        DESCRIPTION: initialData.DESCRIPTION || '',
        DISCOUNT: initialData.DISCOUNT || '',
        STARTDATE: initialData.STARTDATE || '',
        ENDDATE: initialData.ENDDATE || '',
        // Add other promotion properties here
      });
    }
  }, [initialData]);

  const fetchPromotion = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/promotions/${promotionId}/`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPromotion(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchPromotion();
  }, [promotionId]); // Include promotionId in the dependency array to refetch data when it changes

  const handleChange = (e) => {
    setPromotion({
      ...promotion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/promotions/${promotionId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(promotion),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle success, close the form, or refresh the data
      // onClose();
    } catch (error) {
      console.error('Error:', error);
    }

    // Reload the page or perform any other necessary actions
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="promotion-name" className="col-form-label">
            Promotion Name
          </label>
          <input
            type="text"
            name="PROMOTIONNAME"
            value={promotion.PROMOTIONNAME}
            onChange={handleChange}
            className="form-control"
            id="promotion-name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-description" className="col-form-label">
            Description
          </label>
          <textarea
            name="DESCRIPTION"
            value={promotion.DESCRIPTION}
            onChange={handleChange}
            className="form-control"
            id="promotion-description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-discount" className="col-form-label">
            Discount
          </label>
          <input
            type="text"
            name="DISCOUNT"
            value={promotion.DISCOUNT}
            onChange={handleChange}
            className="form-control"
            id="promotion-discount"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-start-date" className="col-form-label">
            Start Date
          </label>
          <input
            type="date"
            name="STARTDATE"
            value={promotion.STARTDATE}
            onChange={handleChange}
            className="form-control"
            id="promotion-start-date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-end-date" className="col-form-label">
            End Date
          </label>
          <input
            type="date"
            name="ENDDATE"
            value={promotion.ENDDATE}
            onChange={handleChange}
            className="form-control"
            id="promotion-end-date"
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Update Promotion
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPromotionForm;
