import React from 'react';
import { Modal as BootstrapModal, Table, Button } from 'react-bootstrap';

const SalaryModal = ({ show, onClose, data }) => {
  return (
    <BootstrapModal show={show} onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Salary Analysis</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Position</th>
              <th>Average Salary</th>
              <th>Max Salary</th>
              <th>Min Salary</th>
              <th>Employee Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee) => (
              <tr key={employee.position}>
                <td>{employee.position}</td>
                <td>{employee.AverageSalary}</td>
                <td>{employee.MaxSalary}</td>
                <td>{employee.MinSalary}</td>
                <td>{employee.EmployeeCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default SalaryModal;
