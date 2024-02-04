import React, { useState } from 'react';

const AddReservationForm = ({ onSubmit }) => {
  const [newReservation, setNewReservation] = useState({
    RESERVATIONTIME: '',
    PARTYSIZE: '',
    PREFERENCE: '',
    CONTACTPHONE: '',
    // Add other reservation properties here
  });

  const handleChange = (e) => {
    setNewReservation({
      ...newReservation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/reservations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the form after successful submission
      setNewReservation({
        RESERVATIONTIME: '',
        PARTYSIZE: '',
        PREFERENCE: '',
        CONTACTPHONE: '',
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
          <label htmlFor="reservation-time" className="col-form-label">
            Reservation Time
          </label>
          <input
            type="datetime-local"
            name="RESERVATIONTIME"
            value={newReservation.RESERVATIONTIME}
            onChange={handleChange}
            className="form-control"
            id="reservation-time"
            required // Ensure that the input is required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="party-size" className="col-form-label">
            Party Size
          </label>
          <input
            type="text"
            name="PARTYSIZE"
            value={newReservation.PARTYSIZE}
            onChange={handleChange}
            className="form-control"
            id="party-size"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="preference" className="col-form-label">
            Preference
          </label>
          <input
            type="text"
            name="PREFERENCE"
            value={newReservation.PREFERENCE}
            onChange={handleChange}
            className="form-control"
            id="preference"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact-phone" className="col-form-label">
            Contact Phone
          </label>
          <input
            type="text"
            name="CONTACTPHONE"
            value={newReservation.CONTACTPHONE}
            onChange={handleChange}
            className="form-control"
            id="contact-phone"
            required
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Add Reservation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReservationForm;
