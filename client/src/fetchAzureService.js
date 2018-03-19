
  export const addNewName = (toAdd) => {
    return fetch('/addUserName', {
    method: 'POST',
    body: JSON.stringify( toAdd )
  })
  .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
  .catch( () => Promise.reject('addName-fail') );
  };

  export const updateAllNameList = (toUpdate) => {
    return fetch('/updateAllNameList', {
      method: 'POST',
      body: JSON.stringify( toUpdate )
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('update-fail') );
  };


  export const getTaskList = ()=>{
    return fetch('/defaultTask')
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('addTask-fail') );
  };

  export const addTask = (singleTask)=>{
    return fetch('/addTask', {
      method: 'POST',
      body: JSON.stringify(singleTask)
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('addTask-fail') );
  };


  export const updateTaskNameToServer = (word, taskNumber)=>{
    return fetch('/updateTaskName', {
      method: 'POST',
      body: JSON.stringify({taskNumber: taskNumber, taskName: word})
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('updateTaskName-fail') );
  };


  export const deleteTaskInServer = (taskNumber)=>{
    return fetch('/deleteTask', {
      method: 'POST',
      body: JSON.stringify({taskNumber: taskNumber})
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('deleteTask-fail') );
  };

  export const changeTaskStatusInServer = (taskNumber,status,isStarted)=>{
    return fetch('/updateStatus', {
      method: 'POST',
      body: JSON.stringify({taskNumber: taskNumber, taskStatus:status, isStarted:isStarted})
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('updateStatus-fail') );
  };

  export const updateIsSuccessInServer = (taskNumber,isSuccess)=>{
    return fetch('/updateIsSuccess', {
      method: 'POST',
      body: JSON.stringify({taskNumber: taskNumber, isSuccess: isSuccess})
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('updateIsSuccess-fail') );
  };

  export const resetTask = (taskNumber)=>{
    return fetch('/resetTask', {
      method: 'POST',
      body: JSON.stringify({taskNumber: taskNumber})
    })
    .then( response => response.ok ? response.json() : Promise.reject(response.text()) )
    .catch( () => Promise.reject('resetTask-fail') );
  };
