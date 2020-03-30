import React,{useEffect} from 'react';

import {Route, withRouter} from 'react-router-dom';
import {RefreshForward} from 'components/base/helpers/refresh';



// const Refresh = ({ path = '/' }) => (
//   <Route
//       path={path}
//       component={({ history, location, match }) => {
//           history.replace({
//               ...location,
//               pathname:location.pathname.substring(match.path.length)
//           });
//           return null;
//       }}
//   />
// );

function Refresh(props){

  const urlName = props.location.pathname;
  let urlParse;
  const index = urlName.lastIndexOf("/");
  if(index != -1){
    urlParse = urlName.substring(urlName.length, index )
  }
  
  useEffect(()=>{
    console.log('useEffect');
    
  },[]);
  props.history.push(urlParse);
  return (
    <>
    Refresh
    {/* <RefreshForward path={}/> */}
    </>
  )
}


export default withRouter(Refresh);