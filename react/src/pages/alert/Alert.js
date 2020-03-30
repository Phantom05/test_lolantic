import React  from 'react';
import { Switch, Route,withRouter } from 'react-router-dom';
import AlertList from './AlertList';


function Alert(props){
  const {match} = props;
  return(
  <Switch>
     <Route path={`${match.path}/list/:list`} component={AlertList} />
  </Switch>)
}

export default withRouter(Alert);

