import React from 'react';
import { Modal as BootstrapModal, Table, Button } from 'react-bootstrap';

const DeliveryModal = ({ show, onClose, data }) => {
  return (
    <BootstrapModal show={show} onHide={onClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Delivery Summary</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Weekday</th>
              <th>Number of Deliveries</th>
              <th>Total Value of Orders</th>
            </tr>
          </thead>
          <tbody>
            {data.map((delivery) => (
              <tr key={delivery.Weekday}>
                <td>{delivery.Weekday}</td>
                <td>{delivery.NumberOfDeliveries}</td>
                <td>{delivery.TotalValueOfOrders}</td>
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

export default DeliveryModal;
