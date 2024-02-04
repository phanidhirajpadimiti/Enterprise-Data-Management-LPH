import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import EditReservationModal from './EditReservationModal';
import AddReservationModal from './AddReservationModal';
import DeleteModal from './DeleteModal';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editReservationId, setEditReservationId] = useState(null);
  const [editReservation, setEditReservation] = useState(null);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/reservations/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleDelete = (reservationId) => {
    // Show the Delete Confirmation Modal
    setReservationToDelete(reservationId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reservations/${reservationToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required (e.g., authentication token)
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete reservation (Status: ${response.status})`);
      }

      // Update reservations state after successful deletion
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.RESERVATIONID !== reservationToDelete)
      );

      // Close the Delete Confirmation Modal
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting reservation:', error);
      // Optionally, you can handle errors here, e.g., show an error message
    }
  };

  const handleDeleteCancel = () => {
    // Close the Delete Confirmation Modal without performing delete
    setShowDeleteConfirmation(false);
    setReservationToDelete(null);
  };

  const handleEdit = (reservationId) => {
    const ReservationToEdit = reservations.find((reservation) => reservation.RESERVATIONID === reservationId);
    setEditReservationId(reservationId);
    setEditReservation(ReservationToEdit);
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

  console.log(editReservationId);

  return (
    <div>
      <Navbar />
      <div className="content_wrapper">
        <h1 className="content_title">Reservations</h1>
        <button type="button" class="btn btn-success createbut" onClick={() => handleAdd()} style={{ color: '#FFD100' }}>Add Reservation
        </button>
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>ReservationID</th>
              <th>ReservationTime</th>
              <th>PartySize</th>
              <th>Preference</th>
              <th>ContactPhone</th>
              <th>Actions</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.RESERVATIONID}>
                <td>{reservation.RESERVATIONID}</td>
                <td>{reservation.RESERVATIONTIME}</td>
                <td>{reservation.PARTYSIZE}</td>
                <td>{reservation.PREFERENCE}</td>
                <td>{reservation.CONTACTPHONE}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm delbut"
                    onClick={() => handleEdit(reservation.RESERVATIONID)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm delbut"
                    onClick={() => handleDelete(reservation.RESERVATIONID)}
                  >
                    Delete
                  </button>
                </td>
                {/* Add more cells for additional columns */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Edit Form Modal */}
        <EditReservationModal
          show={showEditForm} // Corrected prop name
          onHide={handleCloseEditForm} // Corrected prop name
          tableType="reservation" // You might need to adjust this based on your use case
          itemId={editReservationId}
          title="Edit"
          initialData={editReservation}
        />
        {/* Add Form Modal */}
        <AddReservationModal
          show={showAddForm} // Corrected prop name
          onHide={handleCloseAddForm} // Corrected prop name
          tableType="reservation" // You might need to adjust this based on your use case
          title="Add"
        />
      {/* ... (existing code) */}
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

export default Reservations;
