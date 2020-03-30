import React from 'react';
import {AlertListItem } from 'components/common/item';

function AlertList(props) {
  const {
    list,
    checkedId,
    handleCheck,
    handleClick
  } = props;

  let alertList = [];

  alertList = list.map((i, index) => {
    return <AlertListItem 
      key={index}
      data={i}
      checked={checkedId}
      handleCheck={handleCheck}
      handleClick={handleClick}
    />
  });

  return (
    <div>
      {alertList}
    </div>
  );
}

export default AlertList;