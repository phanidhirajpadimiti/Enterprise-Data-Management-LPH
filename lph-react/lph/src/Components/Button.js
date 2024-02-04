import React from 'react';
import './Button.css';

function Button({ primary, icon, text, link }) {
  return (
    <a href={link} className={`button ${primary ? 'primary' : ''}`}>
      {icon && <span className="material-icons">{icon}</span>}
      {text}
    </a>
  );
}

export default Button;
