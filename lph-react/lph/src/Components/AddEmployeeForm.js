import React, { useState } from 'react';

const AddEmployeeForm = ({ onSubmit }) => {
  const [newEmployee, setNewEmployee] = useState({
    POSITION: '',
    SALARY: '',
    FIRSTNAME: '',
    LASTNAME: '',
    // Add other employee properties here
  });

  const handleChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/employees/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the form after successful submission
      setNewEmployee({
        POSITION: '',
        SALARY: '',
        FIRSTNAME: '',
        LASTNAME: '',
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
          <label htmlFor="employee-position" className="col-form-label">
            Position
          </label>
          <input
            type="text"
            name="POSITION"
            value={newEmployee.POSITION}
            onChange={handleChange}
            className="form-control"
            id="employee-position"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employee-salary" className="col-form-label">
            Salary
          </label>
          <input
            type="text"
            name="SALARY"
            value={newEmployee.SALARY}
            onChange={handleChange}
            className="form-control"
            id="employee-salary"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employee-firstname" className="col-form-label">
            First Name
          </label>
          <input
            type="text"
            name="FIRSTNAME"
            value={newEmployee.FIRSTNAME}
            onChange={handleChange}
            className="form-control"
            id="employee-firstname"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employee-lastname" className="col-form-label">
            Last Name
          </label>
          <input
            type="text"
            name="LASTNAME"
            value={newEmployee.LASTNAME}
            onChange={handleChange}
            className="form-control"
            id="employee-lastname"
            required
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;