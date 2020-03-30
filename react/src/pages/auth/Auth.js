// import React,{ useState,useMemo,useCallback,useRef } from 'react';
import React  from 'react';
import { Switch, Route,withRouter } from 'react-router-dom';
import {Logout} from 'components/base/helpers/auth';
import AuthSignIn from 'pages/auth/AuthSignIn';
import AuthSignUp from 'pages/auth/AuthSignUp';
import AuthResetPassword from 'pages/auth/AuthResetPassword';
import { NotFound } from 'components/base/helpers/error';

function Auth(props){
  const {match} = props;
  return(
  <Switch>
     <Route path={`${match.path}/signin`} component={AuthSignIn} />
     <Route path={`${match.path}/signup`} component={AuthSignUp} />
     <Route path={`${match.path}/reset/password`} component={AuthResetPassword} />
     <Route path={`${match.path}/logout`} component={Logout} />
     <Route component={NotFound} /> 
  </Switch>
  )
}

export default withRouter(Auth);
