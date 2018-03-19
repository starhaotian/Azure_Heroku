import React, { Component } from 'react';

import AzureEditTool from './AzureEditTool'
import AzureNameList from './AzureNameList'


class AzureNameDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readable: true,
     
  }
    this.switchStatus = this.switchStatus.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    
  }

// componentWillMount(){
  
// }

switchStatus(event){
   this.props.onSwitchStatus(event.target.value, event.target.id); 
}

updateName(event){
  this.props.onUpdateName(event.target.value, event.target.id)
}

updateDate(event){
  this.props.onUpdateDate(event.target.value, event.target.id)
}


edit(){
  this.setState({
    readable:false
  })
}

save(){
this.setState({
  readable:true
})

}

render(){
  console.log(this.props.nameList);
  if(this.props.nameList.length === 0){
    return (
    <div className="name-content">
    <AzureNameList 
    nameList = {this.props.nameList}
    updateName={this.updateName}
    updateDate={this.updateDate}
    switchStatus={this.switchStatus}
    readable = {this.state.readable}
   />
</div>
    )
}
  return (
    
    <div className="name-content">
      <AzureNameList 
      nameList = {this.props.nameList}
      updateName={this.updateName}
      updateDate={this.updateDate}
      switchStatus={this.switchStatus}
      readable = {this.state.readable}
     />
 
      <AzureEditTool edit={this.edit} save={this.save} />
 </div>

  );
}
}


export default AzureNameDisplay;
