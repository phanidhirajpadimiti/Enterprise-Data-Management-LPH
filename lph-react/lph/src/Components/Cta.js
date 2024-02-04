import React from 'react';

const Cta = ({ title, description, buttonText, link }) => (
  <section className="cta">
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <button onClick={() => window.location.href = link}>
      {buttonText}
    </button>
  </section>
);

export default Cta;
