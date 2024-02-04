import React, { useState } from 'react';

const AddItemForm = ({ onSubmit }) => {
  const [newMenuItem, setNewMenuItem] = useState({
    NAME: '',
    PRICE: '',
    DESCRIPTION: '',
    // Add other menu item properties here
  });

  const handleChange = (e) => {
    setNewMenuItem({
      ...newMenuItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMenuItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the form after successful submission
      setNewMenuItem({
        NAME: '',
        PRICE: '',
        DESCRIPTION: '',
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
          <label htmlFor="menu-item-name" className="col-form-label">
            Name
          </label>
          <input
            type="text"
            name="NAME"
            value={newMenuItem.NAME}
            onChange={handleChange}
            className="form-control"
            id="menu-item-name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="menu-item-price" className="col-form-label">
            Price
          </label>
          <input
            type="text"
            name="PRICE"
            value={newMenuItem.PRICE}
            onChange={handleChange}
            className="form-control"
            id="menu-item-price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="menu-item-description" className="col-form-label">
            Description
          </label>
          <textarea
            name="DESCRIPTION"
            value={newMenuItem.DESCRIPTION}
            onChange={handleChange}
            className="form-control"
            id="menu-item-description"
            required
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItemForm;