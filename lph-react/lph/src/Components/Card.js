import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cardGus from '../images/card_1.jpg'
import CustomersModal from './CustomersModal';
import SalaryModal from './SalaryModal';
import DeliveryModal from './DeliveryModal';

const CardFunction = () => {
    const [showSalaryModal, setShowSalaryModal] = useState(false);
    const [showCustomersModal, setShowCustomersModal] = useState(false);
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [SalaryData, setSalaryData] = useState([]);
    const [bestCustomersData, setBestCustomersData] = useState([]);
    const [DeliveryData, setDeliveryData] = useState([]);
  
    const handleSalaryClick = async () => {
      fetch('http://localhost:8000/api/salary-analysis/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSalaryData(data) // This should now contain your parsed JSON data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      setShowSalaryModal(true);

  };
    
    const handleCustomersClick = async () => {
        fetch('http://localhost:8000/api/best-customers/')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setBestCustomersData(data) // This should now contain your parsed JSON data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

        setShowCustomersModal(true);

    };

    const handleDeliveryClick = async () => {
      fetch('http://localhost:8000/api/delivery-summary/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDeliveryData(data) // This should now contain your parsed JSON data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      setShowDeliveryModal(true);

  };
  
    const handleCloseModal = () => {
      setShowSalaryModal(false);
      setShowCustomersModal(false);
      setShowDeliveryModal(false);
    };

  return (
    <>
    <div className='card_rows'>
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={cardGus} />
        <Card.Body>
          <Card.Title>Salary Analysis</Card.Title>
          <Card.Text>
            Get a quick overview of average, maximum, and minimum salaries, along with employee counts
          </Card.Text>
          <Button variant="primary" onClick={handleSalaryClick}>Explore</Button>
        </Card.Body>
    </Card>
    <SalaryModal show={showSalaryModal} onClose={handleCloseModal} data={SalaryData}/>

  <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src= {cardGus} />
      <Card.Body>
          <Card.Title>Best Customers</Card.Title>
          <Card.Text>
            Identify our best customers by purchases over $50 and feedback ratings above 4.5
          </Card.Text>
          <Button variant="primary" onClick={handleCustomersClick}>Explore</Button>
      </Card.Body>
      </Card>
  <CustomersModal show={showCustomersModal} onClose={handleCloseModal} data={bestCustomersData}/>

  <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src= {cardGus} />
        <Card.Body>
          <Card.Title>Delivery Summary</Card.Title>
          <Card.Text>
          Review our weekly delivery summary, detailing daily delivery counts and total order values
          </Card.Text>
          <Button variant="primary" onClick={handleDeliveryClick}>Explore</Button>
        </Card.Body>
      </Card>
  <DeliveryModal show={showDeliveryModal} onClose={handleCloseModal} data={DeliveryData}/>
      </div>
    </>
  );
}

export default CardFunction;