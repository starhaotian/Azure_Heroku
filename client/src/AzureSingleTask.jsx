import React, { Component } from 'react';

import AzureImage from './AzureImage'
import AzureStatusSelector from './AzureStatusSelector'
import AzureTaskInputBox from './AzureTaskInputBox'
import AzureButton from './AzureButton'

import AzureNameTool from './AzureNameTool';
import AzureNameDisplay from './AzureNameDisplay';

import {updateTaskNameToServer, deleteTaskInServer, addNewName, updateAllNameList} from './fetchAzureService'

import getCurrentDate from './getCurrentDate';


class AzureSingleTask  extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
        number: this.props.singleTask.number,
        taskName: this.props.singleTask.taskName,
        nameList : this.props.singleTask.nameList,
        taskStatus : this.props.singleTask.taskStatus,
        isStartedBefore : this.props.isStartedBefore,
        mode: 'Display',
        isSuccess: this.props.singleTask.isSuccess,

        name:'',
        date:'',
        status: 'Pending',

        buttonMode: this.props.buttonMode,
        // buttonName:'add-task-disabled'
    }

    this.updateTaskName = this.updateTaskName.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.displayTask = this.displayTask.bind(this);
    this.changeStatus = this.changeStatus.bind(this);

    this.generateList= this.generateList.bind(this);
    this.getName = this.getName.bind(this);
    this.getDate = this.getDate.bind(this);
    this.switchStatus = this.switchStatus.bind(this);
    this.updateFailStatus = this.updateFailStatus.bind(this);
    this.updateSucStatus = this.updateSucStatus.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateTaskStatus = this.updateTaskStatus.bind(this);
    // this.switchButtonMode = this.switchButtonMode.bind(this);
  }


    getName(name){
      this.setState({
        name
      });
    }

    getDate(date){
      this.setState({
        date
      });
    }


    generateList() {
      // const currentDate = getCurrentDate();
      let date = this.state.date;
      if (date === '') {
        date = getCurrentDate();
      }

      const body = {
        userId: this.state.nameList.length,
        userName: this.state.name,
        userDate: date,
        userStatus: this.state.status,
        taskNumber: this.state.number
      }
      console.log(body);
      this.setState({
        name: '',
        date: ''
      })
      // console.log(body);
      addNewName(body)
        .then(singleTask => {
          console.log(singleTask.nameList);
          this.setState({
            nameList: singleTask.nameList
          })
          console.log(this.state.nameList);

        });
    }


    updateFailStatus(optionValue,index){
       const newNameList = this.state.nameList;
      //  console.log(newNameList[index]);
       newNameList[index].userStatus = 'Failed';
      //  console.log(newNameList[index]);

       const body = {
        nameList: newNameList,
        taskNumber: this.state.number
       }
       updateAllNameList(body)
       .then(singleTask =>{
        this.setState({
          nameList: singleTask.nameList
        })
       });

    }

    updateSucStatus(optionValue,index){
      const newNameList = this.state.nameList;
      newNameList[index].userStatus = 'Success';

      for (let i=0; i<newNameList.length;i++ ){
         if(i !== parseInt(index)){
           newNameList[i].userStatus = 'Failed';
         }
      }

      const body = {
        nameList: newNameList,
        taskNumber: this.state.number
       }
       updateAllNameList(body)
       .then(singleTask =>{
        this.setState({
          nameList: singleTask.nameList,
          isSuccess: true,
          buttonMode: true
        })
        this.updateTaskStatus(this.state.number, this.state.isSuccess);
       });

    }

    updateTaskStatus(number, isSuccess){
      this.props.onUpdateTaskStatus(number,isSuccess);
    }

    switchStatus(optionValue,index){
       if(optionValue === 'Failed'){
         console.log(index)
          this.updateFailStatus(optionValue,index);
       }else if(optionValue === 'Success'){
          this.updateSucStatus(optionValue,index);
       }
     }

     updateName(name,index){
      const newNameList = this.state.nameList;
       console.log(newNameList[index]);
       newNameList[index].userName = name;
        console.log(newNameList[index]);

       const body = {
        nameList: newNameList,
        taskNumber: this.state.number
       }
       updateAllNameList(body)
       .then(singleTask =>{
        this.setState({
          nameList: singleTask.nameList
        })
       });
     }

     updateDate(date,index){
      // const currentDate = getCurrentDate();
      // if(date.isAfter(currentDate)){
      //   date = currentDate;
      // }
      
      const newNameList = this.state.nameList;
      //  console.log(newNameList[index]);
       newNameList[index].userDate = date;
      //  console.log(newNameList[index]);

       const body = {
        nameList: newNameList,
        taskNumber: this.state.number
       }
       updateAllNameList(body)
       .then(singleTask =>{
        this.setState({
          nameList: singleTask.nameList
        })
       });

     }


  updateTaskName(word){
    updateTaskNameToServer(word, this.state.number)
    .then(taskList => {
      console.log(taskList);
      this.setState({
        taskName: taskList[this.state.number-1].taskName
      });
    });
  }

  deleteTask(){
    deleteTaskInServer(this.state.number)
    .then(taskList=>{
      console.log(taskList);
      this.props.deleteTask(taskList);
    });
  }

  displayTask(){
    if(this.state.mode==='Hidden'){
     this.setState({
       mode:'Display'
     });
    }
    else{
      this.setState({
        mode:'Hidden'
      });
    }
  }

  changeStatus(){
    if(this.state.taskStatus === 'pending'){
      this.setState({
        taskStatus: 'started',
        buttonMode: false
      });
      if(this.state.isStartedBefore === false){
        this.props.changeTaskStatus(this.state.number,'started',true,false);
      }
      else{
        this.props.changeTaskStatus(this.state.number,'started',this.state.isStartedBefore,false);
      }
    }
    else{
      this.setState({
        taskStatus: 'pending',
        buttonMode: true,
        nameList: [],
        isSuccess: false
      });
      this.props.changeTaskStatus(this.state.number,'pending',this.state.isStartedBefore,false);
    }

  }

  // switchButtonMode(){
  //   if(event === 'pending'){
  //     this.setState({
  //       buttonMode: true
  //     })
  //   }else{
  //     this.setState({
  //       buttonMode: false
  //     })
  //   }
  // }


  render() {
    let buttonName = '';
    if(this.state.buttonMode === true || this.state.isSuccess === true){
      buttonName = 'add-name-disabled';
    }else{
      buttonName = 'add-name';
    }

    console.log(this.state.isSuccess);
    if(this.state.mode === 'Hidden'){
    return (
      <div className='singleTask'>
       <div className='singleTask-manageTool'>
          <AzureImage isSuccess = {this.state.isSuccess}/>
          <AzureStatusSelector onChangeStatus={this.changeStatus}
                            status={this.state.taskStatus}/>
          <AzureTaskInputBox word={this.state.taskName}
                         className={'show-taskName'}
                         text={''}
                         updateWord={this.updateTaskName} />
          <AzureButton className={'deleteTask-button'} onClick={this.deleteTask} text={'Delete'}/>
          <AzureButton className={'displayTask-button'} onClick={this.displayTask} text={this.state.mode}/>
       </div>
       <div className='singleTask-nameList'>
         <AzureNameTool
            name={this.state.name}
            date={this.state.date}
            onGetName={this.getName}
            onGetDate={this.getDate}
            generateList={this.generateList}
            buttonMode = {this.state.buttonMode}
            buttonName = {buttonName} 
            />
          <AzureNameDisplay
            nameList={this.state.nameList}
            onUpdateName={this.updateName}
            onUpdateDate={this.updateDate}
            onSwitchStatus={this.switchStatus}
            edit={this.edit}
            onSave={this.save} />
        </div>
      </div>
    );
  }
  else {
    return(
      <div className='singleTask'>
       <div className='singleTask-manageTool'>
         <AzureImage isSuccess = {this.state.isSuccess}/>
          <AzureStatusSelector onChangeStatus={this.changeStatus}
                            status={this.state.taskStatus}/>
          <AzureTaskInputBox word={this.state.taskName}
                         className={'show-taskName'}
                         text={''}
                         updateWord={this.updateTaskName} />
          <AzureButton className={'deleteTask-button'} onClick={this.deleteTask} text={'Delete'}/>
          <AzureButton className={'displayTask-button'} onClick={this.displayTask} text={this.state.mode}/>
       </div>
       </div>
    )
  }
  }

}

export default AzureSingleTask;
