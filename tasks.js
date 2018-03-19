let taskList =[];
let currentTask = null;

const tasks = {
	all: function(){
		return taskList;
	},

	addTask: function(curr_task){
		taskList.push(curr_task);
	},

	resetTask: function(taskNumber){
		taskList[taskNumber-1].nameList = [];   //may need modify
	},

	deleteTask:function(taskNumber){
		delete taskList[taskNumber-1];
	},

	updateTaskName: function(taskInfo){
		let curr_task = taskList[taskInfo.taskNumber-1];//get task information by the taskNumber
		if (curr_task.taskName != null) {
			curr_task.taskName = taskInfo.taskName;
		}
		else{
			console.log(error);
		}
	},

	updateTaskStatus: function(taskNumber, status, isStarted,isSuccess){
		taskList[taskNumber-1].taskStatus = status;
		taskList[taskNumber-1].isStartedBefore = isStarted;
		taskList[taskNumber-1].isSuccess = isSuccess;
	},

	updateIsSuccess: function(taskNumber,isSuccess){
		taskList[taskNumber-1].isSuccess = isSuccess;
	},
	
	updateTaskStartTime: function(taskNumber, startTime){
		taskList[taskNumber-1].startTime = startTime;
	},

	updateNameList: function(curr_task, taskNumber){
		if (curr_task.taskName) {
			taskList[taskNumber-1].taskName = curr_task.taskName;
		}

		if (curr_task.taskStatus) {
			taskList[taskNumber-1].taskStatus = curr_task.taskStatus;
		}

	},

	addUserName: function(newUserInfo, taskNumber){
		taskList[taskNumber-1].nameList.push(newUserInfo);
	},

	updateNameList: function(userInfo, userId, taskNumber){
		let curr_userInfo = taskList[taskNumber-1].nameList[userId];//get task information from the user
		if (userInfo.userStatus) {
			curr_userInfo.userStatus = userInfo.userStatus;
		}
		if (userInfo.userName) {
			curr_userInfo.userName = userInfo.userName;
		}
		if (userInfo.userDate) {
			curr_userInfo.userDate = userInfo.userDate;
		}
	},

	updateAllNameList: function(nameList, taskNumber){
		//get name information from the taskNumber
		taskList[taskNumber-1].nameList = nameList;
	},

	updateCurrentTask: function(taskName){
		currentTask = taskName;
	},

	sendCurrentTask: function(){
		return currentTask;
	}
};


module.exports = tasks;
