import React from 'react';
import AzureSelector from './AzureSelector'

import getCurrentDate from './getCurrentDate'

const AzureNameList = ({ nameList, updateName, updateDate,switchStatus, readable }) => {
    const options = ["Pending", "Failed", "Success"];


   

    const nameListContents = nameList.map((element, index) => {
        let textStyle ={
            textDecorationLine: ''
        };
    
        let isDisabled = false;

        if(element.userStatus === 'Failed'){
            textStyle = {
                textDecorationLine: "line-through"
            }
            isDisabled = true;
        }else if(element.userStatus === 'Success'){
            // textStyle = {
            //     textDecorationLine: ""
            // }
            isDisabled = true;
        }
        return (<li key={index}>
            <input  defaultValue={element.userName} id={index} type='text' onChange={updateName} readOnly={readable} style={textStyle} className="userName"/>
            <input  defaultValue={element.userDate} id={index} type='date' onChange={updateDate} readOnly={readable} max = {getCurrentDate()}className="userDate"/>
            <AzureSelector optionNames={options} onChange={switchStatus} index = {index} status = {element.userStatus} isDisabled ={isDisabled}/>

        </li>);

    });

    return (
        <ol className="ol-list">
            {nameListContents}
        </ol>

    )

}

export default AzureNameList;
