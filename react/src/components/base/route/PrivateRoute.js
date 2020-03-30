import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FullScreenLoading} from 'components/base/loading';

// <PrivateRoute path="/project" component={Project} to="/auth/signup"/>
function PrivateRoute({component:Component,...rest}) {
  const {auth,base} = useSelector(state=>state);
  const {signIn} = auth;
  const {landing} = base;
  const isRedirect = rest.redirect;
  return (
    <Route {...rest} render={props=>{
      if(landing){
        return <FullScreenLoading visible={true}/>
      }else if(!signIn.isAutheticated){
        return <Redirect to={rest.to? rest.to : '/auth/signin'}/>
      }else if(rest.redirect){
        return <Redirect to={isRedirect}/>
      }else{
        return <Component {...props}/>
      }
    }} />
  );
}

export default PrivateRoute;