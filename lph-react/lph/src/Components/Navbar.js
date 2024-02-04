import { NavLink, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import mainLogo from '../images/Los_Pollos_Hermanos_logo.png';

function NavbarFunction() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  }

  const handleOrdersClick = () => {
    navigate('/orders');
  }

  const handleItemsClick = () => {
    navigate('/items');
  }

  const handleReservationsClick = () => {
    navigate('/reservations');
  }

  const handleEmployeesClick = () => {
    navigate('/employees');
  }

  const handlePromotionsClick = () => {
    navigate('/promotions');
  }

  return (
    <Navbar expand="lg" className="color">
      <Container className='Navbar_Container'>
        <Navbar.Brand to="/" onClick={handleHomeClick}>
        <img
              src= {mainLogo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/orders">
            <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
            </NavLink>
            <NavLink to="/orders">
              <Nav.Link onClick={handleOrdersClick}>Orders</Nav.Link>
            </NavLink>
            <NavLink to="/items">
              <Nav.Link onClick={handleItemsClick}>Menu Items</Nav.Link>
            </NavLink>
            <NavLink to="/reservations">
              <Nav.Link onClick={handleReservationsClick}>Reservations</Nav.Link>
            </NavLink>
            <NavLink to="/employees">
              <Nav.Link onClick={handleEmployeesClick}>Employees</Nav.Link>
            </NavLink>
            <NavLink to="/promotions">
              <Nav.Link onClick={handlePromotionsClick}>Promotions</Nav.Link>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarFunction;