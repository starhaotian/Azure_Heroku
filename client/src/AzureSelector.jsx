import React from 'react';

const AzureSelector = ({ optionNames, onChange ,index,status,isDisabled}) => {
    const selectOptions = optionNames.map( (element,index ) => {
  
      return (<option key={index} value={element} >{element} </option>);
    });
  
    return (
      <select className="user-status" onChange = {onChange} id ={index} value = {status} disabled = {isDisabled}>
          {selectOptions} 
      </select>
    );
  };

  export default AzureSelector;