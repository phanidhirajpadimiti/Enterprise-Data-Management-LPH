import React from 'react';

const Spacer = ({ height, width }) => {
  const spacerStyle = {
    height: height || 'auto',
    width: width || 'auto',
  };

  return <div style={spacerStyle}></div>;
};

export default Spacer;
