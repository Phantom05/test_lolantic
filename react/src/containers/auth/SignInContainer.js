import React, { useEffect , useCallback} from 'react';
import { useSelector } from 'react-redux';
import { SignInForm } from 'components/common/form';
import { regEmail, regPassword } from 'lib/library';
import { Toastify } from 'components/common/toastify';
import { AUTH_SIGNIN_SAGAS } from 'store/actions';
import { withRouter } from 'react-router-dom';
import { storage, keys } from 'lib/library';
import { useImmer } from 'use-immer';
import { Actions } from "store/actionCreators";

import{
  AUTO_LOGIN_SAGAS,
} from 'store/actions';
// import {  ToastContainer } from 'react-toastify';
 

const SignInContainerState ={
  email: false,
  password: null,
  remember:null,
  auto:null,
}
function SignInContainer() {
  const { auth: authReducer } = useSelector(state => state);
  const { pending, isAutheticated, authCount, success } = authReducer.signIn;
  const [valid, setValid] = useImmer(SignInContainerState);

  const handleSubmit = useCallback(({ type, email, password, remember,auto }) => {
    if (type === 'user') {      
      if (!regEmail(email) || !regPassword(password)) { // 정규식 불통과
        setValid(draft=>{
          draft.email = false;
          draft.password = false;
        });
        setValid(draft=>{
          if(!regEmail(email)) draft.email = true;
          if(!regPassword(password)) draft.password = true;
        });

      } else { //정규식 통과
        setValid(draft=>{
            draft.email = false;
            draft.password = false
        });

        if (remember) {
          storage.set(keys.remember, email);
        } else {
          storage.remove(keys.remember);
        }

        if(auto){
          storage.set(keys.autoLogin, auto);
        }else{
          storage.remove(keys.autoLogin);
        }
        console.log("SD@@@@!!!!", auto);
        AUTH_SIGNIN_SAGAS({ email, password, auto })
      }
    } else if (type === 'customer') {
      AUTH_SIGNIN_SAGAS({email:'customer'})
      console.log('비회원 로그인');
    }

  },[setValid]);
  
  const initialize =useCallback(()=>{
    if (authCount > 0 && !isAutheticated) {
      setValid(draft=>{
          draft.email = true;
          draft.password = true;
      });
    }
  }) 

  useEffect(() => {
    initialize();
  }, [authCount, isAutheticated,setValid,initialize]);


  // auto login은 test server에 적용중.
  useEffect(() => {
    if(!authReducer.firstRender.value){
      AUTO_LOGIN_SAGAS();
      Actions.auth_first_render();
    }
  }, []);

  console.log(valid);

  return (
    <>
      <SignInForm
        onSubmit={handleSubmit}
        error={valid}
        pending={pending}
      />
      <Toastify
        type="error"
        show={ valid.password}
        text="아이디나 비밀번호를 확인해주세요."
      />
    </>
  );
}

export default withRouter(SignInContainer);