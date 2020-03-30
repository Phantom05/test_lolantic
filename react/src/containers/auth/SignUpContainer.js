import React,{ useEffect, useCallback } from 'react';
import { useImmer } from 'use-immer';
import { SignUpForm } from 'components/common/form';
import { PlainModal,ModalComplete } from 'components/common/modal';
import {ModalSendVerifyCode} from 'components/common/modal';
import {useSelector} from 'react-redux';
import {FullScreenLoading} from 'components/base/loading';
import {regEmail,regPassword} from 'lib/library';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import {
  AUTH_VERIFY_EMAIL_SAGAS,
  AUTH_VERIFY_CODE_SAGAS,
  AUTH_SIGNUP_SAGAS,
  AUTH_INIT,
  LISTING_COUNTRY_SAGAS,
  LISTING_LOCATION_SAGAS
} from 'store/actions';

import {initReducer} from 'lib/utils';


const SignupState ={
  error: {
    nickname:{
      regNickName:null
    },
    manager:{
      regManagerName:null
    },
    email:{
      isVaild:false,
      regEmail:null,
      isVaildAttempt:null,
    },
    password: {
      isVaild:false,
      regPassword:null
    },
    checkPassword: {
      isVaild:false,
    },
    verifyCode: {
      isVaild:false,
      regVerifyCode:null,
      isVaildAttempt:null,
    },
    country:{
      isVaild:null,
    },
    city:{
      isVaild:null,
    },
    manager:{
      regManagerName:null
    },
    license:{
      isVaild:null
    }
  },
  country: {
    current: "",
    list: []
  },
  city: {
    current: "",
    list: []
  },
  modal: {
    current:null,
    email:false,
    verifyCode:false,
    success:false,
  }
}

function SignUpContainer() {
  const {auth:authReducer,listing:listingReducer} = useSelector(state=>state);
  const {signUp,verify} = authReducer;
  const {email,code} = verify;  
  const [values, setValues] = useImmer(SignupState);

  const onSubmit = _.debounce(value => {
    const {
      password,
      checkPassword,
      nickname,
      manager,
      email:emailVal,
      verificationCode,
      licenseCode,
      licenseDate,
      userType,
      license
    } = value;
    
    const hasNickName         = !!nickname.length;
    const hasManagerName      = !!manager.length;
    const reqEmail            = regEmail(emailVal.value);
    const hasVerificationCode = !!verificationCode.value.length;
    const reqPassword         = regPassword(password.value);
    const equalPassword       = password.value === checkPassword.value;
    const activeCountry       = values.country.current !== "";
    const activeCity          = values.city.current !== "";
    const reqArea             = activeCountry && activeCity;
    const requireLicense      = value.license;
    const reqLicense          = licenseCode.value.length > 0 && licenseDate.value.length > 0;
    

    const isAllTrue = [
      // hasNickName,
      hasManagerName,
      reqEmail,
      hasVerificationCode,
      reqPassword,
      equalPassword,
      reqArea];
      
      console.log(licenseCode.value,'licenseCode');
      console.log(licenseDate.value,'licenseDate');

    setValues(draft => {

      draft.error.nickname.regNickName     = hasNickName;
      draft.error.manager.regManagerName   = hasManagerName;
      draft.error.email.regEmail           = reqEmail;
      draft.error.verifyCode.regVerifyCode = hasVerificationCode;
      draft.error.password.regPassword     = reqPassword;
      draft.error.checkPassword.isVaild    = !equalPassword;
      draft.error.country.isVaild          = reqArea;
      draft.error.city.isVaild             = reqArea;
      if(requireLicense){
        draft.error.license.isVaild          = reqLicense;
      }
      
    });

    console.log(value);
    if(isAllTrue.every(x=>x)){
      const dataConfig = {
        "jsonType"  : "join.req.json" ,
        "visibility": value.isPublicCheck,
        "company"   : value.storeName,
        "manager"   : value.manager,
        "country"   : values.country.current,
        "location"  : values.city.current,
        "email"     : value.email.value,
        "password" : value.password.value,
        "type":{
          "clinic": userType.clinic,
          "lab": userType.lab,
          "milling": userType.milling
        },
        "licenseData":{
          licenseCode: value.licenseCode.value,
          licenseDate: value.licenseDate.value
        }
        // "name"      : value.nickname,
      }
      if(!requireLicense){
        dataConfig.licenseData.licenseCode = "";
        dataConfig.licenseData.licenseDate = ""
      }

      console.log(dataConfig,'dataConfig');

      AUTH_SIGNUP_SAGAS(dataConfig);
    }
  },300)

  const onChange = (config) => {
    const { type, value } = config;
    if (type === 'country') {
      LISTING_LOCATION_SAGAS({value});
      setValues(draft => {
        draft.country.current = value;
        draft.city.current ="";
      })
    }
    if (type === 'city') {
      setValues(draft => {
        draft.city.current = value;
      })
    }
  };

  const onClick =(config)  =>{
    const {type,name,value} = config;
    if(type === 'verify'){
      if(name === 'email'){
        if(regEmail(value.email)){
          AUTH_VERIFY_EMAIL_SAGAS({email:value.email});
          setValues(draft=>{
            draft.modal.current = name;
            draft.error.email.regEmail = true;
          });
        }else{ // 정규식 불통과
          setValues(draft=>{
            draft.error.email.regEmail = false;
          });
        }
      }
      if(name === 'verifyCode'){
        if(!!value.verifyCode.length){
          AUTH_VERIFY_CODE_SAGAS(value)
          setValues(draft=>{
            draft.modal.current = name;
            draft.error.verifyCode.regVerifyCode = true;
          });
        }else{ //코드 글자수 불통과
          setValues(draft=>{
            draft.error.verifyCode.regVerifyCode = false;
          });
        }
      }
    }
  };
  
  const openModal = useCallback(config => {
    // const { type, value, name} = config;
    if(config=== 'email'){
      setValues(draft => {
        draft.modal.email = !draft.modal.email;
      });
    }
    if(config === 'verifyCode'){
      setValues(draft => {
        draft.modal.verifyCode = !draft.modal.verifyCode;
      });
    }
    if(config === 'success'){
      setValues(draft=>{
        draft.modal.current = config;
        draft.modal.success = !draft.modal.success;
      })
    }
  },[setValues]); 

  useEffect(()=>{
    const emailResult = {
    0:'notAuth', // 아무것도 안됬을때,
    1:'success', // 성공
    2:'aleadyExist',// 중복
    3:"sendFail" , // 이메일 보내는거 실패
    4:"notMatched" , // 인증 코드가 틀렸을때
    5:"expired" ,// 인증시간 오류
    6:"isSendNotVerify" // 인증코드는 보냈는데 인증버튼을 안누름
  }
    if(signUp.success){ 
      openModal('success')
    }
    if(signUp.failure){
      const errorType = emailResult[signUp.result.emailResult];
      console.log('흠..');
      console.log(signUp.result);
      console.log(errorType);
      if(errorType === 'notAuth'){
        setValues(draft=>{
          draft.error.email.isVaildAttempt = true;
          draft.error.email.isVaild = false;
        });
      }
      if(errorType === 'aleadyExist'){
        setValues(draft=>{
          draft.error.email.isVaildAttempt = false;
          draft.error.email.isVaild = true;
        });
      }
      if(errorType === 'isSendNotVerify'){
        setValues(draft=>{
          draft.error.email.isVaildAttempt = false;
          draft.error.email.isVaild = false;
          draft.error.verifyCode.isVaild = true;
        });
      }
    }
  },[signUp,setValues,openModal]);

  useEffect(()=>{
    if(email.success){
      openModal('email');
      setValues(draft=>{
        draft.error.email.isVaild = false;
      });
    }
    if(email.failure){
      setValues(draft=>{
        draft.error.email.isVaild = true;
      });
    }
  },[email,setValues,openModal]);

  useEffect(()=>{
    if(code.success){
      openModal('verifyCode');
      setValues(draft=>{
        draft.error.verifyCode.isVaild = false;
      });
    }
    if(code.failure){
      setValues(draft=>{
        draft.error.verifyCode.isVaild = true;
      })
    }
  },[code,setValues,openModal]);

  useEffect(()=>{
    setValues(draft=>{
      draft.country.list = listingReducer.country;
      draft.city.list = listingReducer.location;
    })
  },[listingReducer,setValues]);

  // 처음 로딩, 마운트 해제
  useEffect(()=>{
    // 나라 통신
    LISTING_COUNTRY_SAGAS();
    return ()=>{
      initReducer({ type: AUTH_INIT, payload:'signUp' });
      initReducer({ type: AUTH_INIT, payload:'verify' });
      AUTH_SIGNUP_SAGAS.init();  
    }
  },[]);


  useEffect(()=>{
    if(listingReducer.country[0]){
      const value = listingReducer.country[0].id;
      LISTING_LOCATION_SAGAS({value});

      setValues(draft=>{
        draft.country.current = listingReducer.country[0].id;
        draft.city.current ="";
      });
    }
  },[listingReducer.country])


  
  const typeModalCurrent = values.modal.current;
  const typeModalBool = !!values.modal[typeModalCurrent];
  const fnOpenModal = ()=>openModal( typeModalCurrent);
  
  const modalObj={
    'email'      : <ModalSendVerifyCode onClick={fnOpenModal}/>,
    'verifyCode' : <ModalComplete title="완료되었습니다." onClick={fnOpenModal} children="인증이 완료되었습니다."/>,
    'success'    : <ModalComplete onClick={fnOpenModal} okLink={'/auth/signIn'} title={"계정 생성 완료!"} children={"확인 버튼을 누르면 \n 로그인 페이지로 이동합니다."}/>,
  };
  
  const modalContent = modalObj[typeModalCurrent];
  return (
    <>
    {(email.pending || code.pending||signUp.pending) && <FullScreenLoading size={26}/>}
      <PlainModal
        isOpen={typeModalBool}
        content={modalContent}
        onClick={fnOpenModal}
        dim={false}
      />
      <SignUpForm
        countryData={values.country}
        cityData={values.city}
        onChange={onChange}
        onSubmit={onSubmit}
        onClick={onClick}
        error={values.error}
        openModal={fnOpenModal}
      />
    </>
  );
}

export default withRouter(SignUpContainer);