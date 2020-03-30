import React from 'react';
import moment from 'moment';

/**
 * <DateConverter 
      timestamp={dueDate}
      format="YYYY-MM-DD"
    />
 * @param {*} props 
 */
function DateConverter(props) {
  const {
    date = new Date(),
    timestamp,
    format ='YYYY-MM-DD' 
  }  = props;

  if(timestamp){
    return moment.unix(timestamp).format(format);
  }

  if(date){
    return moment(date).format(format);
  }
  
  return (
    <></>
  );
}

export default DateConverter;