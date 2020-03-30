import React from 'react';
import {withRouter} from 'react-router-dom';

function RefreshForward(props){
  console.log(props);
  console.log(props.location);

  const urlName = props.location.pathname;
  let urlParse;
  const index = urlName.lastIndexOf("/");
  if(index != -1){
    urlParse = urlName.substring(urlName.length, index )
  }
  
  console.log(urlParse);
  console.log(urlName.split('/'));


  return(
    <>
    </>
  )
}
export default withRouter(RefreshForward);