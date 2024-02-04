import React from 'react';
import { Modal as BootstrapModal, Table, Button } from 'react-bootstrap';

const CustomersModal = ({ show, onClose, data }) => {
  return (
    <BootstrapModal show={show} onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Best Customers</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>CustomerID</th>
              <th>FirstName</th>
              <th>LastName</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr key={customer.CustomerID}>
                <td>{customer.CustomerID}</td>
                <td>{customer.FirstName}</td>
                <td>{customer.LastName}</td>
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

export default CustomersModal;
