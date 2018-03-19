import React from 'react';

const AzureImage = ({isSuccess }) => {

  if(isSuccess===true){
    console.log('success');
    return (
    <div className={'display-successTask'}></div>
    );
  }
  else{
    console.log('failed');
    return (
    <div className={'display-failedTask'}></div>
    );
  }
};

export default AzureImage;
