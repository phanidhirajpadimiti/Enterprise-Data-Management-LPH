import React, { useState, useEffect } from 'react';

const EditOrderForm = ({ orderId, initialData }) => {
  const [order, setOrder] = useState({
    OrderDate: '',
    TotalAmount: '',
    // Add other order properties here
  });

  useEffect(() => {
    // Populate the form fields with the data from initialData
    if (initialData) {
      setOrder({
        OrderDate: initialData.OrderDate || '',
        TotalAmount: initialData.TotalAmount || '',
        // Add other order properties here
      });
    }
  }, [initialData]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]); // Include orderId in the dependency array to refetch data when it changes

  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/orders/${orderId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle success, close the form, or refresh the data
      // onClose();
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
            value={order.OrderDate}
            onChange={handleChange}
            className="form-control"
            id="order-date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="total-amount" className="col-form-label">
            Total Amount
          </label>
          <input
            type="text"
            name="TotalAmount"
            value={order.TotalAmount}
            onChange={handleChange}
            className="form-control"
            id="total-amount"
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Update Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderForm;
