import React, { useState } from 'react';

const AddOrderForm = ({ onSubmit }) => {
  const [newOrder, setNewOrder] = useState({
    OrderDate: '',
    TotalAmount: '',
    // Add other order properties here
  });

  const handleChange = (e) => {
    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the form after successful submission
      setNewOrder({
        OrderDate: '',
        TotalAmount: '',
      });

      // Trigger the callback function passed through props
      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Reload the page
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="order-date" className="col-form-label">
            Order Date
          </label>
          <input
            type="date"
            name="OrderDate"
            value={newOrder.OrderDate}
            onChange={handleChange}
            className="form-control"
            id="order-date"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="total-amount" className="col-form-label">
            Total Amount
          </label>
          <input
            type="text"
            name="TotalAmount"
            value={newOrder.TotalAmount}
            onChange={handleChange}
            className="form-control"
            id="total-amount"
            required
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Add Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrderForm;
