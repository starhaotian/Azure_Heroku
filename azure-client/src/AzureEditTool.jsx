import React from 'react';
// import AzureButton from './AzureButton';

const AzureEditTool = ({ edit, save }) => {
    // const id = singleTask.number;
    return (
        <div className = 'edit-bar'> 
        <button className='edit' onClick={edit} >{'edit'}</button>
        <button className='save' onClick={save} >{'save'}</button>
      </div>
    )
  };
  
  export default AzureEditTool;
  