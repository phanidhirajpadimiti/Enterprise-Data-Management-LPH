import React, { useState, useEffect } from 'react';
import { Table} from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import EditItemModal from './EditItemModal';
import AddItemModal from './AddItemModal';
import DeleteModal from './DeleteModal';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuItemToDelete, setMenuItemToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editItemId, setEditMenuItemId] = useState(null);
  const [editItem, setEditMenuItem] = useState(null);
  const [showEditForm, setShowEditItemForm] = useState(false);
  const [showAddForm, setShowAddItemForm] = useState(false);

  const handleDelete = (itemId) => {
    setMenuItemToDelete(itemId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/items/${menuItemToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required (e.g., authentication token)
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete menu item (Status: ${response.status})`);
      }

      setMenuItems((prevMenuItems) =>
        prevMenuItems.filter((menuItem) => menuItem.ITEMID !== menuItemToDelete)
      );

      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setMenuItemToDelete(null);
  };

  const handleEdit = (itemId) => {
    const menuItemToEdit = menuItems.find((menuItem) => menuItem.ITEMID === itemId);
    setEditMenuItemId(itemId);
    setEditMenuItem(menuItemToEdit);
    setShowEditItemForm(true);
  };

  const handleAdd = () => {
    setShowAddItemForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditItemForm(false);
  };

  const handleCloseAddForm = () => {
    setShowAddItemForm(false);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/items/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Sort menu items or perItemForm any other pre-processing as needed
        setMenuItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Navbar/>
      <div className='content_wrapper'>
      <h1 className='content_title'>Menu Items</h1>
      <button type="button" class="btn btn-success createbut" onClick={() => handleAdd()} style={{ color: '#FFD100' }}>Add Item
      </button>
      <Table className="table">
        <thead className="table-light">
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.ITEMID}>
              <td>{item.ITEMID}</td>
              <td>{item.NAME}</td>
              <td>{item.PRICE}</td>
              <td>{item.DESCRIPTION}</td>
              <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm delbut"
                    onClick={() => handleEdit(item.ITEMID)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm delbut"
                    onClick={() => handleDelete(item.ITEMID)}
                  >
                    Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Edit Form Modal */}
      <EditItemModal
          show={showEditForm} // Corrected prop name
          onHide={handleCloseEditForm} // Corrected prop name
          tableType="item" // You might need to adjust this based on your use case
          itemId={editItemId}
          title="Edit"
          initialData={editItem}
        />
        {/* Add Form Modal */}
        <AddItemModal
          show={showAddForm} // Corrected prop name
          onHide={handleCloseAddForm} // Corrected prop name
          tableType="item" // You might need to adjust this based on your use case
          title="Add"
        />
      {/* ... (existing code) */}
      <DeleteModal
        show={showDeleteConfirmation}
        onHide={handleDeleteCancel}
        onConfirm={handleDeleteConfirmation}
      />
      </div>
      <Footer/>
    </div>
  );
};

export default MenuItems;
