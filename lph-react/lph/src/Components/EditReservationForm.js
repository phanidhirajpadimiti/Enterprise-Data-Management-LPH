import React, { useState, useEffect } from 'react';
import moment from 'moment';

const EditReservationForm = ({ reservationId, initialData }) => {

  console.log("id:", reservationId);
  console.log("initialData:", initialData);

  const [reservation, setReservation] = useState({
    RESERVATIONTIME: '',
    PARTYSIZE: '',
    PREFERENCE: '',
    CONTACTPHONE: '',
    // Add other reservation properties here
  });

  useEffect(() => {
    const formattedDate = new Date(initialData.RESERVATIONTIME).toISOString().slice(0, 16);

    // Use the ISO 8601 formatted date string directly from initialData
    setReservation({
      ...initialData,
      RESERVATIONTIME: formattedDate,
      // Ensure RESERVATIONTIME is assigned as is
    });
  }, [initialData]);

  const fetchReservation = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/reservations/${reservationId}/}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setReservation(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/reservations/${initialData.RESERVATIONID}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
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

  useEffect(() => {
    fetchReservation();
  }, [reservationId]); // Include reservationId in the dependency array to refetch data when it changes

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reservation-time" className="col-form-label">
            Reservation Time
          </label>
          <input
            type="datetime-local"
            name="RESERVATIONTIME"
            value={reservation.RESERVATIONTIME}
            onChange={handleChange}
            className="form-control"
            id="reservation-time"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="party-size" className="col-form-label">
            Party Size
          </label>
          <input
            type="text"
            name="PARTYSIZE"
            value={reservation.PARTYSIZE}
            onChange={handleChange}
            className="form-control"
            id="party-size"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preference" className="col-form-label">
            Preference
          </label>
          <input
            type="text"
            name="PREFERENCE"
            value={reservation.PREFERENCE}
            onChange={handleChange}
            className="form-control"
            id="preference"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-phone" className="col-form-label">
            Contact Phone
          </label>
          <input
            type="text"
            name="CONTACTPHONE"
            value={reservation.CONTACTPHONE}
            onChange={handleChange}
            className="form-control"
            id="contact-phone"
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Update Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReservationForm;
