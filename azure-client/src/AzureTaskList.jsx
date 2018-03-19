import React from 'react';
import AzureSingleTask from './AzureSingleTask';

const AzureTaskList = ({ tasks, deleteTask, changeTaskStatus, updateTaskStatus }) => {

  const taskList = tasks.map((element, index) => {
    let mode
    if (element != null) {
      if (element.taskStatus === 'pending' || element.isSuccess === true) {
        mode = true;
      } else {
        mode = false;
      }
      return (
        <li key={index}>
          <AzureSingleTask singleTask={element} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus} onUpdateTaskStatus={updateTaskStatus} buttonMode={mode} />
        </li>
      )
    }
  }
  );



  return (

    <div className='task-list'>
      <ol>
        {taskList}
      </ol>
    </div>
  );
};

export default AzureTaskList;
