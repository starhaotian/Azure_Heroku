import React from 'react';

const AzureButton = ({ className, onClick, text }) => {
  return (
    <button className={className} onClick={onClick}>{text}</button>
  );
};

export default AzureButton;
