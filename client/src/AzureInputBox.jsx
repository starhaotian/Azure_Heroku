import React from 'react';

const AzureInputBox = ({ word, className, text, getUpdateWord }) => {
  const updateWord = (event) => {
    getUpdateWord(event.target.value);
  };

  return (
    <input value={word} className={className} placeholder={text} type={'text'} onChange={updateWord}/>
  );
};

export default AzureInputBox;
