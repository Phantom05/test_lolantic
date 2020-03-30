import React, {useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import { regEmail, regPassword } from 'lib/library';
import {useDidUpdateEffect} from 'lib/utils';
import {useImmer} from 'use-immer';
import {AUTH_RESETPASS_SAGAS, AUTH_RESET_VERIFY_EMAIL_SAGAS, AUTH_VERIFY_CODE_SAGAS} from 'store/actions';
import {ResetPasswordForm} from 'components/common/form';
import moment from 'moment';

import { PlainModal,ModalComplete } from 'components/common/modal';
import {ModalSendVerifyCode} from 'components/common/modal';
import {FullScreenLoading} from 'components/base/loading';
import { withTheme } from 'styled-components';


function ResetPasswordContainer(props) {
  const {auth: authReducer} = useSelector(state => state);
  const {
    pending:resetPending,
    success:resetSucc,
    failure: resetFail,
    emailResult: resetEmailR
  } = authReducer.resetPass;
  const {email:authEmail, code:authCode} = authReducer.verify;
  const [valid, setValid] = useImmer({
    check:{
      email: null,
      password: null,
      checkPassword: null,
      validEmail: null,
      attempt:0
    },
    modal: {
      current:null,
      email:false,
      verifyCode:false,
      success:false,
      failEmail: false,
      failCode: false,
      failReset: false,
      noneEmail: false,
    },
    resetValue: {
      email: '',
      newPass: '',
    },
    timer:{
      setTime: "05:00",
      overTime: false,
      viewTime: '',
      active: false,
      timerIns: null
    }
  });

  /**
   * Timer 모듈
   * config
   * @param {*} timer time string ex)"03:00" 
   * @param {*} interval * int 
   * @param {*} setValue * setState // timer에 따른 상태값을 관리할 수 있도록 상태관리 권한부여- useImmer사용 
   *            
   */
  const startTimer = (config) => {
    console.log("timer");
    const {
      timer,
      interval,
      setValue
    } = config;

    const start = moment(timer, "mm:ss").valueOf();
    let duration = moment.duration(start, 'milliseconds');

    class Timer{
      constructor(duration, interval, setValue){
        
        this.duration = duration;
        this.interval = interval;
        this.viewTime = '';
        this.timeIns = null;
      }

      start(){
        const _self = this;
        setValue(draft => {
          draft.timer.active = true;
          draft.timer.overTime = false;
        });
        this.timeIns = setInterval(function(){
          _self.duration = moment.duration(_self.duration - _self.interval, 'milliseconds');
          _self.viewTime = `${moment(_self.duration._milliseconds).format('mm:ss')}`;
          
          if(!_self.duration.minutes() && !_self.duration.seconds()){
            _self.viewTime = '';
            clearInterval(_self.timeIns);
            setValue(draft => {
              draft.timer.viewTime = draft.timer.setTime;
              draft.timer.active = false;
              draft.timer.overTime = true;
            });
          }
          setValue(draft => {
            draft.timer.viewTime = _self.viewTime;

          });
        }, this.interval);
      }

      viewTime(){
        console.log("view time", this.viewTime);
        return this.viewTime;
      }

      getIns(){
        return this.timeIns;
      }

      end(){
        console.log("timer clear");
        clearInterval(this.timeIns);
        setValue(draft => {
          draft.timer.viewTime = draft.timer.setTime;
          draft.timer.active = false;
        });
      }
    }
    const _Timer = new Timer(duration, interval, setValue);
    return _Timer;
  }


  const handleSubmit = useCallback(({type, name, email, password, inputAuthCode, checkPassword}) => {
    if(type === 'sendEmail'){
      if(regEmail(email)){
        const verifyForm = {
          email: email
        }

        AUTH_RESET_VERIFY_EMAIL_SAGAS(verifyForm);
        setValid(draft => {
          draft.modal.current = name;
          draft.timer.overTime = false;
          draft.timer.viewTime = valid.timer.setTime;
          draft.check.validEmail = true;
        });
        
      }else{
        setValid(draft => {
          draft.check.email = false;
          draft.modal.current = 'failEmail';
          draft.check.validEmail = false;
        });
      }
    }else if(type === 'authCode'){
      const verifyForm = {
        email: email,
        verifyCode: inputAuthCode
      }
      if(!valid.timer.overTime){
        AUTH_VERIFY_CODE_SAGAS(verifyForm);
        // console.log(`autCodeSucc: ${authCode.success} - inputAuthCode: ${inputAuthCode}`);
        setValid(draft => {
          draft.modal.current = name;
        });
      }else{
        openModal('timeOut');
      }

    }else if(type === 'confirm'){
      // console.log("confirm");

      if(regEmail(email) && regPassword(password)) {
        setValid(draft => {
          draft.check.email = true;
          draft.check.password = true;
        });
        
        if(password === checkPassword){
          setValid(draft => {
            draft.check.checkPassword = true;
          });
        }else{
          setValid(draft => {
            draft.check.checkPassword = false;
          });
        }

        // console.log('if')
        setValid(draft => {
          draft.resetValue.email = email;
          draft.resetValue.newPass = password;
          draft.modal.current = name;
          draft.check.attempt =  draft.check.attempt+1
        });
        
      } else {
        // console.log("fail");
        setValid(draft => {
          draft.check.email = false;
          draft.check.password = false;
        });
      }
    }
  },[]);

  // timer 상태에 따른 modal 관리
  useDidUpdateEffect(() => {
    if(valid.timer.overTime){
      openModal('timeOut');
    }
  },[valid.timer.active]);

  // 모든 reset form 조건이 완성되면 reset 요청을 보냄
  useDidUpdateEffect(() =>{
    if(valid.check.validEmail && valid.check.password && valid.check.checkPassword){
      // console.log("gogo", valid.resetValue);
      AUTH_RESETPASS_SAGAS({email: valid.resetValue.email, newPass: valid.resetValue.newPass});
      
    }
  },[valid.check.attempt]);

  // reset 결과에 따른 modal 관리
  useDidUpdateEffect(() => {
    if(resetSucc){
      openModal(valid.modal.current);
    }else{
      if(resetEmailR === 4){
        openModal('noneEmail');
      }else{
        openModal('failReset');
      }
    }
  }, [resetSucc, resetEmailR]);

  // 메일 전송 결과에 따른 modal 관리 및 timer 인스턴스 생성
  useDidUpdateEffect(()=> {
    if(authEmail.success){
      openModal(valid.modal.current);
      setValid(draft => {
        draft.check.email = true;
        draft.timer.timerIns = startTimer({timer: valid.timer.setTime, interval: 1000, setValue: setValid});
      });
      if(valid.timer.timerIns){
        valid.timer.timerIns.end();
      }
      
    }else if(!authEmail.pending && !authEmail.success){
      openModal('failEmail');
    }
  }, [authEmail.success, authEmail.failure, setValid]);

  // timer 인스턴스 생성시 timer 작동
  useDidUpdateEffect(() => {
    if(valid.timer.timerIns){
      valid.timer.timerIns.start();
    }

  }, [valid.timer.timerIns]);

  // 인증 결과에 따른 modal 관리 및 성공시 timer 종료
  useDidUpdateEffect(()=> {
    if(authCode.success){
      openModal(valid.modal.current);
      setValid(draft => {
        draft.check.validEmail = true;
      });
      if(valid.timer.timerIns){
        valid.timer.timerIns.end();
      }
    }else if(!authCode.pending && !authCode.success){
      openModal('failCode');
    }
  }, [authCode.success, authCode.failure]);

  const openModal = useCallback(value => {
    if(value === 'email'){
      setValid(draft => {
        draft.modal.email = !draft.modal.email;
      });
    }
    if(value === 'verifyCode'){
      setValid(draft => {
        draft.modal.verifyCode = !draft.modal.verifyCode;
      });
    }
    if(value === 'success'){
      setValid(draft=>{
        draft.modal.success = !draft.modal.success;
      })
    }
    if(value === 'failEmail'){
      setValid(draft=>{
        draft.modal.failEmail = !draft.modal.failEmail;
        draft.modal.current = 'failEmail';
      })
    }
    if(value === 'failCode'){
      setValid(draft=>{
        draft.modal.failCode = !draft.modal.failCode;
        draft.modal.current = 'failCode';
      })
    }
    if(value === 'failReset'){
      setValid(draft=>{
        draft.modal.failReset = !draft.modal.failReset;
        draft.modal.current = 'failReset';
      })
    }
    if(value === 'noneEmail'){
      setValid(draft=>{
        draft.modal.noneEmail = !draft.modal.noneEmail;
        draft.modal.current = 'noneEmail';
      })
    }
    if(value === 'timeOut'){
      setValid(draft =>{
        draft.modal.timeOut = !draft.modal.timeOut;
        draft.modal.current = 'timeOut';
      })
    }
  },[]);
  
  const typeModalCurrent = valid.modal.current;
  const typeModalBool = !!valid.modal[typeModalCurrent];
  const fnOpenModal = useCallback(()=>openModal( typeModalCurrent),[typeModalCurrent]);
  
  const modalObj={
    'email':<ModalSendVerifyCode onClick={fnOpenModal}/>,
    'verifyCode':<ModalComplete onClick={fnOpenModal} children="인증이 완료되었습니다."/>,
    'success':<ModalComplete onClick={fnOpenModal} okLink={'/auth/signIn'} children="로그인 페이지로 이동."/>,
    'failEmail':<ModalComplete onClick={fnOpenModal} title="이메일 인증" children="이메일 인증에 실패했습니다."/>,
    'failCode':<ModalComplete onClick={fnOpenModal} title="인증코드 인증" children="인증 코드 인증에 실패했습니다."/>,
    'failReset':<ModalComplete onClick={fnOpenModal} title="비밀번호 초기화" children="비밀번호 초기화에 실패했습니다."/>,
    'noneEmail': <ModalComplete onClick={fnOpenModal} title="비밀번호 초기화 실패" children="가입이 안되어 있는 이메일 입니다."/>,
    'timeOut': <ModalComplete onClick={fnOpenModal} title="이메일 인증 실패" children="인증 시간이 초과되었습니다."/>
  };

  const modalContent = modalObj[typeModalCurrent];

  return (
    <div>
      {
        (authCode.pending || resetPending) && <FullScreenLoading size={26}/>
      }
      
      <ResetPasswordForm
        onSubmit={handleSubmit} 
        check={valid}
        resetPass={authReducer.resetPass}
        authEmail={authReducer.authEmail}
        timer={valid.timer}
        />

      <PlainModal
        isOpen={typeModalBool}
        content={modalContent}
        onClick={fnOpenModal}
        dim={false}
      />
    </div>
  );
}

export default ResetPasswordContainer;