import React, { useState, useEffect } from 'react';

const EditItemForm = ({ itemId, initialData }) => {
  const [menuItem, setMenuItem] = useState({
    NAME: '',
    PRICE: '',
    DESCRIPTION: '',
    // Add other menu item properties here
  });

  useEffect(() => {
    // Populate the form fields with the data from initialData
    if (initialData) {
      setMenuItem({
        NAME: initialData.NAME || '',
        PRICE: initialData.PRICE || '',
        DESCRIPTION: initialData.DESCRIPTION || '',
        // Add other menu item properties here
      });
    }
  }, [initialData]);

  const fetchMenuItem = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/items/${itemId}/`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMenuItem(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchMenuItem();
  }, [itemId]); // Include itemId in the dependency array to refetch data when it changes

  const handleChange = (e) => {
    setMenuItem({
      ...menuItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/items/${itemId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
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
          <label htmlFor="menu-item-name" className="col-form-label">
            Name
          </label>
          <input
            type="text"
            name="NAME"
            value={menuItem.NAME}
            onChange={handleChange}
            className="form-control"
            id="menu-item-name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="menu-item-price" className="col-form-label">
            Price
          </label>
          <input
            type="text"
            name="PRICE"
            value={menuItem.PRICE}
            onChange={handleChange}
            className="form-control"
            id="menu-item-price"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="menu-item-description" className="col-form-label">
            Description
          </label>
          <textarea
            name="DESCRIPTION"
            value={menuItem.DESCRIPTION}
            onChange={handleChange}
            className="form-control"
            id="menu-item-description"
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Update Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditItemForm;
