import React from 'react';

const AzureStatusSelector = ({onChangeStatus, status}) => {
  return (
    <select className={'taskStatus-selector'} onChange={onChangeStatus} value={status}>
      <option className={'pending-status'}>pending</option>
      <option className={'started-status'}>started</option>
    </select>
  );
};

export default AzureStatusSelector;