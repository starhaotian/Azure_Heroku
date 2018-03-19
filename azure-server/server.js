(() => {
	const express = require('express');
	const bodyParser = require('body-parser');
	const app = express();
	const PORT = 3100;
	const tasks = require('./tasks');
	let position = tasks.all().length-1;//current index of last task in data
	const users = [{userId : 1, userName: 'Young'},{userId : 2, userName:'Zhou'},{userId : 3, userName: 'Lance'}];//fake user Information
	let turn = 0;
	app.use( express.static('public') );
	app.use( bodyParser.json({ extended: true, type: '*/*' }) );


	app.get('/defaultTask', (request, response ) =>  {
	  response.send( JSON.stringify(tasks.all()) );
	});

	//return user Id
	app.post('/getUserLogin', (request, response ) =>  {
	  let curr = turn % 3;//recircle user
	  const currUser = {
	    userId: users[curr].userId,
	    userName: users[curr].userName
	  };
	  turn++;
	  response.send( JSON.stringify(currUser) );
	});

	//addTask request
	app.post('/addTask', (request, response) => {
		tasks.addTask( request.body );
		response.send( JSON.stringify( tasks.all() ));
	});

	//update Task Name request
	app.post('/updateTaskName', (request, response) => {
		const taskNumber = request.body.taskNumber;
		const taskName = request.body.taskName;
		console.log(request.body);
		tasks.updateTaskName( {
			taskNumber: taskNumber,
			taskName: taskName
		});
		response.send( JSON.stringify( tasks.all())); //返回所有task
	});

	//update status
	app.post('/updateStatus', (request, response) => {
		const currTaskNumber = request.body.taskNumber;
		const taskStatus = request.body.taskStatus;
		const isStarted = request.body.isStarted;
		const isSuccess = request.body.isSuccess
		tasks.updateTaskStatus(currTaskNumber, taskStatus, isStarted, isSuccess);
		console.log(tasks.all());
		response.send( JSON.stringify( tasks.all() )); //返回所有task
	});

	app.post('/updateIsSuccess', (request, response) => {
		const currTaskNumber = request.body.taskNumber;
		const isSuccess = request.body.isSuccess;
		tasks.updateIsSuccess(currTaskNumber, isSuccess);
		console.log(tasks.all());
		response.send( JSON.stringify( tasks.all() )); //返回所有task
	});

	app.post('/updateStartTime', (request, response) => {
		const currTaskNumber = request.body.taskNumber;
		const startTime = request.body.startTime;
		tasks.updateTaskStartTime(currTaskNumber, startTime);
		console.log(tasks.all());
		response.send( JSON.stringify( tasks.all() )); //返回所有task
	});

	//update task
	app.post('/resetTask', (request, response) => {
		const currTaskNumber = request.body.taskNumber;
		console.log(currTaskNumber);
		tasks.resetTask(currTaskNumber);
		response.send( JSON.stringify( tasks.all() )); //返回所有task
	});


	//delete Task request
	app.post('/deleteTask', (request, response) => {
		const currTaskNumber = request.body.taskNumber;
		console.log(currTaskNumber);
		tasks.deleteTask(request.body.taskNumber);
		response.send( JSON.stringify( tasks.all() )); //返回所有task
	});


	//addName request
	app.post('/addUserName', (request, response) => {
		const userId = request.body.userId; // add by Xiaoxiao
		const userName = request.body.userName;
		const userDate = request.body.userDate;
		const userStatus = request.body.userStatus;
		const taskNumber = request.body.taskNumber;
		console.log(request.body);
		tasks.addUserName( {
			userId:userId, // add by Xiaoxiao
		  	userName: userName,
		  	userDate: userDate,
		  	userStatus: userStatus
		} , taskNumber);//第一个参数就是整个新建的user信息
		console.log(JSON.stringify( tasks.all()[taskNumber-1] ));
		response.send( JSON.stringify( tasks.all()[taskNumber-1] ));
	});

	//update name-list
	app.post('/updateNameList', (request, response) => {
		const userStatus = request.body.userStatus;
		const userName = request.body.userName;
		const userDate = request.body.userDate;
		const userId = request.body.userId
		const taskNumber = request.body.taskNumber;
		console.log(request.body);
		tasks.updateNameList( {
			userStatus: userStatus,
			userName:userName,
			userDate:userDate
		} , userId, taskNumber);
		response.send( JSON.stringify( tasks.all()[taskNumber-1] ));
	});

	//update all the name-list of a task
	app.post('/updateAllNameList', (request, response) => {
		const nameList = request.body.nameList;
		const taskNumber = request.body.taskNumber;
		console.log(request.body);
		tasks.updateAllNameList( nameList, taskNumber);
		response.send( JSON.stringify( tasks.all()[taskNumber-1] ));
	});

	app.post('/updateSelectedTask', (request, response) => {
		const taskName = request.body.currentTask;
		tasks.updateCurrentTask( taskName );
		response.send( JSON.stringify( 'done' ));
	});

	app.get('/sendCurrentTask', (request, response ) =>  {
	  response.send( JSON.stringify(tasks.sendCurrentTask()) );
	});

	app.listen(PORT, () => {  // this will start the server waiting for incoming requests
	  console.log(`Server listening at http://localhost:${PORT}`);
	  console.log('use Ctrl-C to stop this server');
	});
})();
