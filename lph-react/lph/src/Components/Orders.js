import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import EditOrderModal from './EditOrderModal';
import DeleteModal from './DeleteModal';
import AddOrderModal from './AddOrderModal';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${orderToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete order (Status: ${response.status})`);
      }

      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.OrderID !== orderToDelete)
      );

      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setOrderToDelete(null);
  };

  const handleEdit = (orderId) => {
    const orderToEdit = orders.find((order) => order.OrderID === orderId);
    setEditOrderId(orderId);
    setEditOrder(orderToEdit);
    setShowEditForm(true);
  };

  const handleAdd = () => {
    setShowAddForm(true);
  }

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/orders/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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
        <h1 className="content_title">Orders</h1>
        <button type="button" class="btn btn-success createbut" onClick={() => handleAdd()} style={{ color: '#FFD100' }}>Add Order
        </button>
        <Table className="table">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.OrderID}>
                <td>{order.OrderID}</td>
                <td>{order.OrderDate}</td>
                <td>{order.TotalAmount}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(order.OrderID)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(order.OrderID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Edit Form Modal */}
        <EditOrderModal
          show={showEditForm}
          onHide={handleCloseEditForm}
          orderId={editOrderId}
          title="Edit Order"
          initialData={editOrder}
        />
        {/* Add Form Modal */}
        <AddOrderModal
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

export default Orders;
