import React, { useState } from 'react';

const AddPromotionForm = ({ onSubmit }) => {
  const [newPromotion, setNewPromotion] = useState({
    PROMOTIONNAME: '',
    DESCRIPTION: '',
    DISCOUNT: '',
    STARTDATE: '',
    ENDDATE: '',
    // Add other promotion properties here
  });

  const handleChange = (e) => {
    setNewPromotion({
      ...newPromotion,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/promotions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPromotion),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the form after successful submission
      setNewPromotion({
        PROMOTIONNAME: '',
        DESCRIPTION: '',
        DISCOUNT: '',
        STARTDATE: '',
        ENDDATE: '',
      });

      // Trigger the callback function passed through props
      if (onSubmit) {
        onSubmit();
      }
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
            value={newPromotion.PROMOTIONNAME}
            onChange={handleChange}
            className="form-control"
            id="promotion-name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-description" className="col-form-label">
            Description
          </label>
          <textarea
            name="DESCRIPTION"
            value={newPromotion.DESCRIPTION}
            onChange={handleChange}
            className="form-control"
            id="promotion-description"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-discount" className="col-form-label">
            Discount
          </label>
          <input
            type="text"
            name="DISCOUNT"
            value={newPromotion.DISCOUNT}
            onChange={handleChange}
            className="form-control"
            id="promotion-discount"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-start-date" className="col-form-label">
            Start Date
          </label>
          <input
            type="date"
            name="STARTDATE"
            value={newPromotion.STARTDATE}
            onChange={handleChange}
            className="form-control"
            id="promotion-start-date"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="promotion-end-date" className="col-form-label">
            End Date
          </label>
          <input
            type="date"
            name="ENDDATE"
            value={newPromotion.ENDDATE}
            onChange={handleChange}
            className="form-control"
            id="promotion-end-date"
            required
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Add Promotion
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPromotionForm;
