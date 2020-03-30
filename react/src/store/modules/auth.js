import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import produce from 'immer';
import _ from 'lodash';


export const initialState = {
  firstRender: {
    value: false
  },
  authToken: {
    value: false
  },
  signIn:{
    pending: false,
    isAutheticated: false,
    authCount:0,
    token:'',
    grade:0,
    profile:{},
  },
  autoLogin: {
    pending: false,
    success: false,
    failure: false,
  },
  logout:{
    pending:false,
    success:false,
    failure:false,
  },
  signUp:{
    pending:false,
    success:false,
    failure:false,
    result:null
  },
  verify:{
    email:{
      pending:false,
      success:false,
      failure:false,
    },
    code:{
      pending:false,
      success:false,
      failure:false,
      result:null
    }
  },
  resetPass:{
    pending:false,
    success:false,
    failure:false,
    isAutheticated: false,
    authCount: 0,
    emailResult: 0,
  },
  changePass:{
    pending:false,
    success:false,
    failure:false,
    authCount: 0,
  }
  
}


export default handleActions({
  // NOTE: AUTH_INIT
  [actions.AUTH_INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const key = diff;
      draft[key] = initialState[key]
    })
  },
  [actions.AUTH_RENDER]: (state, { payload : diff }) => {
    console.log("signin first render");
    return produce(state, draft => {
      const {firstRender} = draft;
      firstRender.value = true;
    });
  },
  // NOTE: SIGN IN , TOKEN
  [actions.AUTH_SIGNIN.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {signIn} = draft;
      signIn.pending = true;
      signIn.isAutheticated = false;
      signIn.token='';
      signIn.grade = 0;
    })
  },
  [actions.AUTH_SIGNIN.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {signIn} = draft;
      signIn.pending = false;
      signIn.isAutheticated = true;
      // console.log(diff,'authSignIn!!!!!');
      
      if(diff.type && diff.type === 3){
        signIn.profile = diff;
        signIn.grade = 3;
      }else{
        const customDiff = _.omit(diff,'result');
        signIn.token = diff.token;
        signIn.profile = customDiff;
        signIn.profile.company = customDiff.companyName;
        signIn.grade = 1;
      }

    })
  },
  [actions.AUTH_SIGNIN.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {signIn} = draft;
      signIn.pending = false;
      signIn.isAutheticated = false;
      signIn.token='';
      signIn.authCount+=1;
      signIn.grade = 0;
    })
  },
  
  // NOTE: SIGN OUT
  [actions.AUTH_LOGOUT.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('logout pending');
      const {logout} = draft;
      logout.pending = true;
      
    })
  },
  [actions.AUTH_LOGOUT.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('logout success');
      const {logout} = draft;
      logout.pending = false;
      logout.failure = false;
      logout.success = true;

      draft.signIn = initialState.signIn;
      draft.autoLogin = initialState.autoLogin;
    })
  },
  [actions.AUTH_LOGOUT.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('logout failure');
      const {logout} = draft;
      logout.pending = false;
      logout.failure = true;
      logout.success = false;
    })
  },


  //NOTE: SIGN UP
  [actions.AUTH_SIGNUP.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`AUTH_SIGNUP_SAGAS init`);
      const {signUp} = draft;
      draft.signUp = initialState.signUp;
      
    })
  },
  [actions.AUTH_SIGNUP.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`AUTH_SIGNUP_SAGAS pending`);
      const {signUp} = draft;
      signUp.pending = true;
      signUp.failure = false;
      signUp.success = false;
    })
  },
  [actions.AUTH_SIGNUP.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`AUTH_SIGNUP_SAGAS success`);
      const {signUp} = draft;
      signUp.pending = false;
      signUp.failure = false;
      signUp.success = true;
      signUp.result = diff;
    })
  },
  [actions.AUTH_SIGNUP.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`AUTH_SIGNUP_SAGAS failure`);
      const {signUp} = draft;
      signUp.pending = false;
      signUp.failure = true;
      signUp.success = false;
      signUp.result = diff;
    })
  },

  //NOTE: VERIFY EMAIL 회원가입 인증메일 요청
  [actions.AUTH_VERIFY_EMAIL.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {verify:{email:emailVerify}} = draft;
      emailVerify.pending = true;
      emailVerify.failure = false;
      emailVerify.success = false;
    })
  },
  [actions.AUTH_VERIFY_EMAIL.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {verify:{email:emailVerify}} = draft;
      emailVerify.pending = false;
      emailVerify.failure = false;
      emailVerify.success = true;
    })
  },
  [actions.AUTH_VERIFY_EMAIL.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {verify:{email:emailVerify}} = draft;
      emailVerify.pending = false;
      emailVerify.failure = true;
      emailVerify.success = false;
    })
  },
  //NOTE: VERIFY EMAIL 비밀번호변경 인증메일 요청
  [actions.AUTH_RESET_VERIFY_EMAIL.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {verify:{email:emailVerify}} = draft;
      emailVerify.pending = true;
      emailVerify.failure = false;
      emailVerify.success = false;
    })
  },
  [actions.AUTH_RESET_VERIFY_EMAIL.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {verify:{email:emailVerify}} = draft;
      emailVerify.pending = false;
      emailVerify.failure = false;
      emailVerify.success = true;
    })
  },
  [actions.AUTH_RESET_VERIFY_EMAIL.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {verify:{email:emailVerify}} = draft;
      emailVerify.pending = false;
      emailVerify.failure = true;
      emailVerify.success = false;
    })
  },
  //NOTE: RESET_PASSWORD 비밀번호 변경 요청
  [actions.AUTH_RESETPASS.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {resetPass} = draft;
      resetPass.pending = true;
      resetPass.failure = false;
      resetPass.success = false;
      resetPass.authCount = 0;
    })
  },
  [actions.AUTH_RESETPASS.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {resetPass} = draft;
      resetPass.pending = false;
      resetPass.failure = false;
      resetPass.success = true;
      resetPass.authCount += 1;
    })
  },
  [actions.AUTH_RESETPASS.FAILURE]: (state, { payload: diff }) => {
    console.log("SDFSDFSDFAIL", diff);
    return produce(state, draft => {
      const {resetPass} = draft;
      resetPass.pending = false;
      resetPass.failure = true;
      resetPass.success = false;
      resetPass.authCount = 0;
      resetPass.emailResult = diff.emailResult;
    })
  },

  //NOTE: CHANGE_PASSWORD 비밀번호 변경 요청 (로그인 후)
  [actions.AUTH_CHANGEPASS.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {changePass} = draft;
      changePass.pending = true;
      changePass.failure = false;
      changePass.success = false;
      changePass.authCount = 0;
    })
  },
  [actions.AUTH_CHANGEPASS.SUCCESS]: (state, { payload: diff }) => {
    console.log("AUTH_CHANGEPASS_SAGAS");
    return produce(state, draft => {
      const {changePass} = draft;
      changePass.pending = false;
      changePass.failure = false;
      changePass.success = true;
      changePass.authCount += 1;
    })
  },
  [actions.AUTH_CHANGEPASS.FAILURE]: (state, { payload: diff }) => {
    console.log("SDFSDFSDFAIL", diff);
    return produce(state, draft => {
      const {changePass} = draft;
      changePass.pending = false;
      changePass.failure = true;
      changePass.success = false;
      changePass.authCount = 0;
    })
  },


   //NOTE: VERIFY CODE 회원가입 인증 코드 확인
   [actions.AUTH_VERIFY_CODE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`AUTH_VERIFY_CODE pending`);
      const {verify:{code:codeVerify}} = draft;
      codeVerify.pending = true;
      codeVerify.failure = false;
      codeVerify.success = false;
      codeVerify.result = null;
    })
  },
  [actions.AUTH_VERIFY_CODE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`AUTH_VERIFY_CODE success`);
      const {verify:{code:codeVerify}} = draft;
      codeVerify.pending = false;
      codeVerify.failure = false;
      codeVerify.success = true;
      codeVerify.result = diff;
    })
  },
  [actions.AUTH_VERIFY_CODE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`AUTH_VERIFY_CODE failure`);
      const {verify:{code:codeVerify}} = draft;
      console.log(diff);
      codeVerify.pending = false;
      codeVerify.failure = true;
      codeVerify.success = false;
      codeVerify.result = diff;
    })
  },

  

// NOTE: TOKEN
  [actions.AUTH_TOKEN.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {signIn} = draft;
      console.log("token pending");
      signIn.pending = true;
      signIn.isAutheticated = false;
      signIn.token='';
      signIn.grade = 0;
    })
  },
  [actions.AUTH_TOKEN.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {signIn, authToken} = draft;
      signIn.pending = false;
      signIn.isAutheticated = true;
      authToken.value = true;
      
      if(diff.type && diff.type === 3){
        signIn.profile = diff;
        signIn.grade = 3;
      }else{
        const customDiff = _.omit(diff,'result');
        signIn.token = diff.token;
        signIn.profile = customDiff;
        signIn.profile.company = customDiff.companyName;
        signIn.grade = 1;
      }

    })
  },
  [actions.AUTH_TOKEN.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {signIn, authToken} = draft;
      console.log("token fail");
      signIn.pending = false;
      signIn.isAutheticated = false;
      signIn.token='';
      signIn.authCount+=1;
      signIn.grade = 0;
      authToken.value = false;
    })
  },

  // NOTE: Auto login
  [actions.AUTO_LOGIN.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {autoLogin, signIn} = draft;
      console.log("auto login pending");
      autoLogin.pending = true;
      autoLogin.success = false;
      autoLogin.failure = false;
    })
  },
  [actions.AUTO_LOGIN.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {autoLogin, signIn} = draft;
      autoLogin.pending = false;
      autoLogin.success = true;
      autoLogin.failure = false;
      signIn.isAutheticated = true;
      console.log(diff,'authSignIn!!!!!');
      
      if(diff.type && diff.type === 3){
        signIn.profile = diff;
        signIn.grade = 3;
      }else{
        const customDiff = _.omit(diff,'result');
        signIn.token = diff.token;
        signIn.profile = customDiff;
        signIn.profile.company = customDiff.companyName;
        signIn.grade = 1;
      }

    })
  },
  [actions.AUTO_LOGIN.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {autoLogin, signIn} = draft;
      console.log("auto login fail");
      autoLogin.pending = false;
      autoLogin.success = false;
      autoLogin.failure = true;
      signIn.token='';
      signIn.grade = 0;
    })
  },

}, initialState);




