import React from 'react';
// import AzureButton from './AzureButton';
 
import getCurrentDate from './getCurrentDate';
 



const AzureNameTool = ({ name, date, onGetName, onGetDate,generateList,buttonMode,buttonName}) => {
    const getName = (event) => {
       onGetName(event.target.value); 
      };

    const getDate = (event) => {
        let date = event.target.value;
        if(date === ''){
            date = getCurrentDate();
        }
       onGetDate(date); 
      };

     
    
     
   
    
    return (
        <div className = 'name-tool'> 
        <input value={name} className='input-userName' placeholder='User Name' type='text' onChange = {getName} />
        <input value={date} className='input-date' type='date' onChange = {getDate} max={getCurrentDate()}/>
        <button className={buttonName} onClick={generateList} disabled = {buttonMode}>{'add'}</button>
      </div>
    )
  };
  
  export default AzureNameTool;
  

  