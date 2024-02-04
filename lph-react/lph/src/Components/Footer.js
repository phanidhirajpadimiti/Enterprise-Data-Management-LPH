import React from 'react';
import mainLogo from '../images/Los_Pollos_Hermanos_logo.png';

const Footer = () => {
  return (
//     <footer class="py-3 my-4">
//     <ul class="nav justify-content-center border-bottom pb-3 mb-3">
//       <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
//       <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
//       <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
//       <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
//       <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
//     </ul>
//     <p class="text-center text-muted">© 2023 Los Pollos Hermanos, Inc</p>
//   </footer>

<footer class="d-flex flex-wrap justify-content-between align-items-center py-3 border-top color footer_space">
    <p class="col-md-4 mb-0 nav-name">© 2023 Los Pollos Hermanos, Inc</p>
    <a href="/" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
    <img
        src= {mainLogo}
        width="50"
        height="50"
        className="d-inline-block align-top"
        alt="logo"
    />
    </a>
    <ul class="nav col-md-4 justify-content-end">
      <li class="nav-item"><a href="#" class="nav-link px-2 ">Home</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 ">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 ">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 ">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 ">About</a></li>
    </ul>
  </footer>
  );
};

export default Footer;
