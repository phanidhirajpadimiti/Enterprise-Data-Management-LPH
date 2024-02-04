import HomePage from './Components/HomePage.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Orders from './Components/Orders.js';
import Reservations from './Components/Reservations.js';
import Employees from './Components/Employees.js';
import MenuItems from './Components/MenuItems.js';
import Promotions from './Components/Promotions.js';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/items" element={<MenuItems />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/promotions" element={<Promotions />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
