import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FullScreenLoading} from 'components/base/loading';

// <LRoute path="/auth" component={Auth} token/>
// token이 있을때 보이면 안되는 페이지
function LRoute({component:Component,...rest}) {
  const {base,auth} = useSelector(state=>state);
  const {landing} = base;
  const {isAutheticated} = auth.signIn;

  return (
    <Route {...rest} render={props=>{
      const isLogOutPage = props.location.pathname !==`${props.match.path}/logout`;
      if(landing){
        return <FullScreenLoading visible={true}/>
      }else if(rest.token && isAutheticated){
        return isLogOutPage? <Redirect to="/"/> : <Component {...props}/>;
      }else {
        return <Component {...props}/>;
      }
    }} />
  );
}

export default LRoute;