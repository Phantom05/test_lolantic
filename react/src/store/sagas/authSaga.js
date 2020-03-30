
import {all, takeEvery,call, take} from 'redux-saga/effects';
import {keys,AlertFn,storage} from 'lib/library';
import { createPromiseSaga } from 'lib/utils';
import { ENV_MODE_DEV } from 'lib/setting';
import {Actions} from 'store/actionCreators';
import {
  AUTH_TOKEN_SAGAS,
  AUTO_LOGIN_SAGAS,
  AUTH_SIGNIN_SAGAS,
  AUTH_LOGOUT_SAGAS,
  AUTH_SIGNUP_SAGAS,
  AUTH_VERIFY_EMAIL_SAGAS,
  AUTH_RESET_VERIFY_EMAIL_SAGAS,
  AUTH_VERIFY_CODE_SAGAS,
  AUTH_RESETPASS_SAGAS,
  AUTH_CHANGEPASS_SAGAS,
} from 'store/actions';


/**
 * 
 * @param {*} param0 
 */
function* handleSignIn({payload}){
  AlertFn(handleSignIn.name);
  if(payload.email === 'customer'){ // 비회원 로그인
    const profileObj ={
      email:"customer",
      company:null,
      name:"비회원",
      type:3
    }
    AUTH_SIGNIN_SAGAS.success(profileObj);
  }else{ // 일반 로그인
    if(ENV_MODE_DEV){
      // NOTE: development
      AUTH_SIGNIN_SAGAS.pending();
      const {data,error} =yield call(AUTH_SIGNIN_SAGAS.request,payload);
      if(data && !error){
        if(data.result === 1){
          storage.set('email',payload.email);
          storage.set('password',payload.password);
          AUTH_SIGNIN_SAGAS.success(data);
        }else{
          AUTH_SIGNIN_SAGAS.failure();
        }
      }else{
        AUTH_SIGNIN_SAGAS.failure();
      }
    }else{
      // NOTE: production
      AUTH_SIGNIN_SAGAS.pending();
      const {data,error} =yield call(AUTH_SIGNIN_SAGAS.request,payload);
      
      if(data && !error){
        if(data.result === 1){
          sessionStorage.setItem(keys.token, JSON.stringify(data.token));
          AUTH_SIGNIN_SAGAS.success(data);
        }else{
          AUTH_SIGNIN_SAGAS.failure();
        }
      }else{
        AUTH_SIGNIN_SAGAS.failure();
      }      
    }

  }
}



/**
 * 
 * @param {*} param0 
 */
function* handleToken({payload}){
  AlertFn(handleToken.name);
  AUTH_TOKEN_SAGAS.pending();
  if(ENV_MODE_DEV){
    // NOTE: develope
    const tmpPaylod ={
      email:storage.get('email'),
      password:storage.get('password')
    }
    if(!tmpPaylod.email || !tmpPaylod.password){
      Actions.auth_init('signIn');
      Actions.base_exit_landing();
      return;
    }
      const {data,error} =yield call(AUTH_SIGNIN_SAGAS.request,tmpPaylod);
      if(data && !error){
        if(data.result === 1 ){
          AUTH_SIGNIN_SAGAS.success(data);
          Actions.base_exit_landing();
        }else{
          AUTH_SIGNIN_SAGAS.failure();
          Actions.base_exit_landing();
        }
      }else{
        AUTH_SIGNIN_SAGAS.failure();
        Actions.base_exit_landing();
      }
  }else{
    //NOTE: production
    storage.remove('email');
    storage.remove('password');
    const {data,error} =yield call(AUTH_TOKEN_SAGAS.request,payload);
    if(data && !error){
      if(data.result === 1 && data.authCheck){
        AUTH_TOKEN_SAGAS.success(data);
        sessionStorage.setItem(keys.token, JSON.stringify(data.token));
        Actions.base_exit_landing();
      }else{
        AUTH_TOKEN_SAGAS.failure();
        Actions.base_exit_landing();
      }
    }else{
      AUTH_TOKEN_SAGAS.failure();
      Actions.base_exit_landing();
    }
  }
}

/**
 * 
 * @param {*} param0 
 */
function* handleLogOut({payload}){
  AlertFn(handleLogOut.name);
  AUTH_LOGOUT_SAGAS.pending();
  const {data,error} =yield call(AUTH_LOGOUT_SAGAS.request);
  if(data && !error){
    if(data.result ===1){
      AUTH_LOGOUT_SAGAS.success();
      
    }else{
      AUTH_LOGOUT_SAGAS.failure();
    }
    console.log(data);
  }else{
    console.log(data);
  }
}


/**
 * 
 * @param {*} param0 
 */
const handleSignUp= createPromiseSaga({
  type:AUTH_SIGNUP_SAGAS,
  tag:'handleSignUp',
});


/**
 * 
 * @param {*} param0 
 */
const handleVerifyEmail= createPromiseSaga({
  type:AUTH_VERIFY_EMAIL_SAGAS,
  tag:'handleVerifyEmail',
});

/**
 * 
 * @param {*} param0 
 */
const handleResetVerifyEmail= createPromiseSaga({
  type:AUTH_RESET_VERIFY_EMAIL_SAGAS,
  tag:'handleResetVerifyEmail',
});


/**
 * 
 * @param {*} payload  
 */
const handleVerifyCode= createPromiseSaga({
  type:AUTH_VERIFY_CODE_SAGAS,
  tag:'handleVerifyCode',
});

/**
 * 
 * @param {*} payload object
 * 비밀번호 변경요청 
 */
function* handleResetPass({payload}){
  AUTH_RESETPASS_SAGAS.pending();
  const {data, error} = yield call(AUTH_RESETPASS_SAGAS.request, payload);
  if(data && !error){
    if(data.result === 1){
      AUTH_RESETPASS_SAGAS.success();
    }else{
      AUTH_RESETPASS_SAGAS.failure(data);
    }
    console.log(data);
  }else{
    console.log(data);
  }
}

/**
 * 
 * @param {*} payload object
 * 비밀번호 변경요청 (로그인 후) 
 */
function* handleChangePass({payload}){
  AUTH_CHANGEPASS_SAGAS.pending();
  const {data, error} = yield call(AUTH_CHANGEPASS_SAGAS.request, payload);
  if(data && !error){
    if(data.result === 1){
      AUTH_CHANGEPASS_SAGAS.success();
    }else{
      console.log("!@!@!@!@!@!");
      AUTH_CHANGEPASS_SAGAS.failure(data);
    }
    console.log(data);
  }else{
    console.log(data);
  }
}


/**
 * 
 * @param {*} payload object
 * 자동 로그인 
 */
function* handleAutoLogin({payload}){
  AUTO_LOGIN_SAGAS.pending();
  if(ENV_MODE_DEV){
    // NOTE: develope
    // const tmpPaylod ={
    //   email:storage.get('email'),
    //   password:storage.get('password')
    // }
    // if(!tmpPaylod.email || !tmpPaylod.password){
    //   Actions.auth_init('signIn');
    //   Actions.base_exit_landing();
    //   return;
    // }
    //   const {data,error} =yield call(AUTH_SIGNIN_SAGAS.request,tmpPaylod);
    //   if(data && !error){
    //     if(data.result === 1 ){
    //       AUTH_SIGNIN_SAGAS.success(data);
    //       Actions.base_exit_landing();
    //     }else{
    //       AUTH_SIGNIN_SAGAS.failure();
    //       Actions.base_exit_landing();
    //     }
    //   }else{
    //     AUTH_SIGNIN_SAGAS.failure();
    //     Actions.base_exit_landing();
    //   }
  }else{
    // NOTE: production
    const {data, error} = yield call(AUTO_LOGIN_SAGAS.request, payload);
    if(data && !error){
      if(data.result === 1){
        AUTO_LOGIN_SAGAS.success(data);
      }else{
        AUTO_LOGIN_SAGAS.failure(data);
      }
      console.log(data);
    }else{
      console.log(data);
    }
  }
}



export default function* AuthSaga(){
  yield all([
    takeEvery(AUTH_SIGNIN_SAGAS.index,handleSignIn),
    takeEvery(AUTH_TOKEN_SAGAS.index,handleToken),
    takeEvery(AUTO_LOGIN_SAGAS.index,handleAutoLogin),  
    takeEvery(AUTH_LOGOUT_SAGAS.index,handleLogOut),
    takeEvery(AUTH_SIGNUP_SAGAS.index,handleSignUp),
    takeEvery(AUTH_VERIFY_EMAIL_SAGAS.index,handleVerifyEmail),
    takeEvery(AUTH_RESET_VERIFY_EMAIL_SAGAS.index,handleResetVerifyEmail),
    takeEvery(AUTH_VERIFY_CODE_SAGAS.index,handleVerifyCode),
    takeEvery(AUTH_RESETPASS_SAGAS.index,handleResetPass),
    takeEvery(AUTH_CHANGEPASS_SAGAS.index,handleChangePass),
  ])
}