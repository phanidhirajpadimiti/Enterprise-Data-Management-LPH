import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Navbar from './Navbar';
import Footer from './Footer';
import EditEmployeeModal from './EditEmployeeModal';
import DeleteModal from './DeleteModal';
import AddEmployeeModal from './AddEmployeeModal';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/employees/${employeeToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete employee (Status: ${response.status})`);
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.EMPLOYEEID !== employeeToDelete)
      );

      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
    setEmployeeToDelete(null);
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find((employee) => employee.EMPLOYEEID === employeeId);
    setEditEmployeeId(employeeId);
    setEditEmployee(employeeToEdit);
    setShowEditForm(true);
  };

  const handleAdd = () => {
    setShowAddForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/employees/');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
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
        <h1 className="content_title">Employees</h1>
        <button type="button" class="btn btn-success createbut" onClick={() => handleAdd()} style={{ color: '#FFD100' }}>Add Employee
        </button>
        <Table className="table">
          <thead className="table-light">
            <tr>
              <th>Employee ID</th>
              <th>Position</th>
              <th>Salary</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.EMPLOYEEID}>
                <td>{employee.EMPLOYEEID}</td>
                <td>{employee.POSITION}</td>
                <td>{employee.SALARY}</td>
                <td>{employee.FIRSTNAME}</td>
                <td>{employee.LASTNAME}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleEdit(employee.EMPLOYEEID)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(employee.EMPLOYEEID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Edit Form Modal */}
        <EditEmployeeModal
          show={showEditForm}
          onHide={handleCloseEditForm}
          EmployeeId={editEmployeeId}
          title="Edit Employee"
          initialData={editEmployee}
        />
        {/* Add Form Modal */}
        <AddEmployeeModal
          show={showAddForm}
          onHide={handleCloseAddForm}
          title="Add Employee"
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

export default Employees;
