import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

//import AzureUserMessage from './AzureUserMessager';
import AzureAddTask from './AzureAddTask';
import AzureTaskList from './AzureTaskList';
import UserInfo from './UserInfo';

import {addTask, getTaskList, changeTaskStatusInServer, updateIsSuccessInServer,resetTask} from './fetchAzureService';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      singleTask: {
        number: 1,
        taskName: '',
        nameList : [],
        taskStatus : 'pending',
        isStartedBefore : false,
        isSuccess: false
//        startTime: {}
      },
      totalTaskNumber: 1,
      user: ''
//      timeID: 0
    };
    this.getUserLogin();
    this.setTaskName = this.setTaskName.bind(this);
    this.updateTasksArray = this.updateTasksArray.bind(this);
    this.setNewSingleTask = this.setNewSingleTask.bind(this);
    this.fetchTaskList = this.fetchTaskList.bind(this);
    this.handleList = this.handleList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.changeTaskStatus = this.changeTaskStatus.bind(this);
    this.clearTaskContent = this.clearTaskContent.bind(this);
    this.onUpdateTaskStatus = this.onUpdateTaskStatus.bind(this);
  }
  getUserLogin(){
    fetch('/getUserLogin', {
      method: 'POST',
    })
    .then( r => r.json() )
    .then( j => {this.changeLogin(j);
    });
  }

  changeLogin(user){
    this.setState({
      user: user.userName
    });
  }

  componentWillMount() {
    this.fetchTaskList();
  }

  fetchTaskList() {
    getTaskList()
    .then( taskList => {
      console.log(taskList);
      this.handleList(taskList);
    });
  }

  handleList(taskList) {
    this.setState({
      tasks: taskList,
      singleTask: Object.assign({},this.state.singleTask,{number: taskList.length +1}),
      totalTaskNumber: taskList.length +1
     });
     console.log(this.state.singleTask)
  }

  setTaskName(word){
    this.setState({
      singleTask: Object.assign({},this.state.singleTask,{taskName: word})
    });
  }

  setNewSingleTask(){
    console.log(this.state.singleTask);
    addTask(this.state.singleTask)
    .then(taskList=>{
      console.log(taskList);
      this.updateTasksArray(taskList[this.state.totalTaskNumber-1]);
    })
  }

  updateTasksArray(singleTask){
    console.log(this.state.tasks);
    if( !singleTask ) {
      return;
    }
    let currentTaskNumber = this.state.totalTaskNumber+1;
    this.setState({
      tasks: [...this.state.tasks, singleTask],
      singleTask: {
        number: currentTaskNumber,
        taskName: '',
        nameList : [],
        taskStatus : 'pending',
        isStartedBefore : false
//        startTime: {}
      },
      totalTaskNumber: currentTaskNumber
    });
    console.log(this.state.tasks);
  }

  deleteTask(taskList){
    console.log(taskList);
    this.setState({
      tasks: taskList
    });
  }

  changeTaskStatus(number, status, isStarted,isSuccess){
    console.log(isStarted);
    changeTaskStatusInServer(number, status, isStarted,isSuccess)
    .then(taskList=>{
      console.log(taskList);
      if(status==='pending'){
        this.clearTaskContent(number);
      }
      else{
        this.setState({
          tasks: taskList
        });
      }
    })
  }

  clearTaskContent(number){
    resetTask(number)
    .then(taskList=>{
      this.setState({
        tasks: taskList
      });
    });
  }

  onUpdateTaskStatus(taskNumber,isSuccess){
    updateIsSuccessInServer(taskNumber,isSuccess)
    .then(taskList =>{
      this.setState({
        tasks: taskList
      });
    });
  }

  render() {

    console.log('render');

    return (
      <div className="Azure">
        <header className="Azure-header">
          <div className="Azure-title">Daily Competitive Tasks</div>
          <UserInfo user = {this.state.user}/>
        </header>
        <div className ="content">
        <AzureAddTask word={this.state.singleTask.taskName}
                      setTaskName={this.setTaskName}
                      setNewSingleTask={this.setNewSingleTask}/>
        <AzureTaskList tasks={this.state.tasks}
                       deleteTask={this.deleteTask}
                       changeTaskStatus={this.changeTaskStatus}
                       updateTaskStatus={this.onUpdateTaskStatus}/>
        </div>
      </div>
    );
  }
}

export default App;
