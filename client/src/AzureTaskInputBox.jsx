import React from 'react';

const AzureTaskInputBox = ({ word, className, text, updateWord }) => {
  const getUpdateWord = (event) => {
    updateWord(event.target.value);
  };

  return (
    <input value={word} className={className} placeholder={text} type={'text'} onChange={getUpdateWord}/>
  );
};

export default AzureTaskInputBox;
