import React from 'react';
import AzureButton from './AzureButton';
import AzureTaskInputBox from './AzureTaskInputBox';

const AzureAddTask = ({ word, setTaskName, setNewSingleTask}) => {

  const updateNewTask = (word)=>{
    setTaskName(word);
  };


  return (
    <div className='azure-addTask'>
      <AzureTaskInputBox word={word} className={'taskName-input'} text={'New Task Name'} updateWord={updateNewTask}/>
      <AzureButton className={'addTask-button'} onClick={setNewSingleTask} text={'ADD'}/>
    </div>
  );
};

export default AzureAddTask;
