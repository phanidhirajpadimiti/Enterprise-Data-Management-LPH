import React, { useState, useEffect } from 'react';

const EditEmployeeForm = ({ EmployeeId, initialData }) => {
  const [employee, setEmployee] = useState({
    POSITION: '',
    SALARY: '',
    FIRSTNAME: '',
    LASTNAME: '',
    // Add other employee properties here
  });

  useEffect(() => {
    // Populate the form fields with the data from initialData
    if (initialData) {
      setEmployee({
        POSITION: initialData.POSITION || '',
        SALARY: initialData.SALARY || '',
        FIRSTNAME: initialData.FIRSTNAME || '',
        LASTNAME: initialData.LASTNAME || '',
        // Add other employee properties here
      });
    }
  }, [initialData]);

  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/employees/${EmployeeId}/`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setEmployee(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [EmployeeId]); // Include employeeId in the dependency array to refetch data when it changes

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/employees/${EmployeeId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
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
          <label htmlFor="employee-position" className="col-form-label">
            Position
          </label>
          <input
            type="text"
            name="POSITION"
            value={employee.POSITION}
            onChange={handleChange}
            className="form-control"
            id="employee-position"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employee-salary" className="col-form-label">
            Salary
          </label>
          <input
            type="text"
            name="SALARY"
            value={employee.SALARY}
            onChange={handleChange}
            className="form-control"
            id="employee-salary"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employee-firstname" className="col-form-label">
            First Name
          </label>
          <input
            type="text"
            name="FIRSTNAME"
            value={employee.FIRSTNAME}
            onChange={handleChange}
            className="form-control"
            id="employee-firstname"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="employee-lastname" className="col-form-label">
            Last Name
          </label>
          <input
            type="text"
            name="LASTNAME"
            value={employee.LASTNAME}
            onChange={handleChange}
            className="form-control"
            id="employee-lastname"
          />
        </div>
        <div className="mb-3 submit_button">
          <button type="submit" className="btn btn-success">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
