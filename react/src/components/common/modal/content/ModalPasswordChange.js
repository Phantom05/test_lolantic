import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {useImmer} from 'use-immer';
import {AUTH_CHANGEPASS_SAGAS} from 'store/actions';
import {useDidUpdateEffect} from 'lib/utils';
import {  color, font, buttonBlue, buttonWhite } from 'styles/__utils';
import cx from 'classnames';
import { PlainModal,ModalComplete} from 'components/common/modal';


import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  icon_key,
  icon_check,
} from 'components/base/images';

import {regEmail, regPassword} from 'lib/library';
import { initialState } from '../../../../store/modules/auth';


function ModalPasswordChange(props) {
  const {title, onClick: fnOpenModal} = props;
  const classes = useStyles();
  const {mypage: mypageReducer, auth: authReducer} = useSelector(state => state);
  const initState = {
    password: {
      value: '',
      show: false,
      regPassword: null
    },
    changePassword: {
      value: '',
      show: false,
      regPassword: null
    },
    checkPassword: {
      value: '',
      show: false,
      regPassword: null
    },
    check: {
      password: null,
      changePassword: null,
      checkPassword: null,
      attempt: 0
    },
    modal: {
      current : null,
      passwordChangeFail: false,
    }
  }

  const [values, setValues] = useImmer(initState);
  const {
    password:{value: passwordVal, regPassword: isRegPass, show: passwordShow},
    changePassword:{value: changePasswordVal, regPassword: isChangeRegPass, show: changePasswordShow},
    checkPassword:{value: checkPasswordVal, regPassword: isRegCheckPass, show: checkPasswordShow},
  } = values;


  const handleMouseDownPassword = useCallback(event => {
    event.preventDefault();
  },[]);

  const iconPasswordVisible = value => { 
        return values[value].show
      ? <Visibility className={classes.eyeIcon} />
      : <VisibilityOff className={classes.eyeIcon} />
  }

  // input change 이벤트 관리
  const handleChange = useCallback(prop => e => {
    const inputType = (prop === 'remember' || prop === 'auto') ? 'checked' : 'value';
    const targetValue = e.target[inputType];
    setValues(draft => {
      if(['password','changePassword','checkPassword'].indexOf(prop) !== -1){
        draft[prop].regPassword = null;
        draft.check[prop] = initState.check[prop];
        draft[prop].value = targetValue;
      }
    });
  },[]);

  // password show on/off 버튼 관리
  const handleClick = useCallback((config) =>{
    const {type,value} = config;
    if(type === 'eyeIcon'){
      setValues(draft => {
        draft[value].show = !draft[value].show;
      });
    }
  },[]);

  // password change ok 버튼 이벤트 관리
  const handleSubmit = useCallback(() => {
    // console.log("click OK",
    // regPassword(passwordVal),
    //   checkPasswordVal,
    //   changePasswordVal
    // );
    if(passwordVal && regPassword(passwordVal)){
      setValues(draft => {
        draft.check.password = true;
      });
      
      if(regPassword(changePasswordVal)){
        setValues(draft => {
          draft.check.changePassword = true;
          draft.changePassword.regPassword = true;
        });
      }else{
        setValues(draft => {
          draft.check.changePassword = false;
          draft.changePassword.regPassword = false;
        });
      }

      if(changePasswordVal === checkPasswordVal){
        setValues(draft => {
          draft.check.checkPassword = true;
          draft.checkPassword.regPassword = true;
        });
      }else{
        setValues(draft => {
          draft.check.checkPassword = false;
          draft.checkPassword.regPassword = false;
        });
      }
    }else{
      setValues(draft => {
        draft.password.regPassword = false;
        draft.check.password = false;
      })
    }
  },[passwordVal,changePasswordVal, checkPasswordVal]);

  const openModal = (value) => {
    // console.log("open modal", value);
    if(value === 'passwordChangeFail'){
      setValues(draft => {
        draft.modal.passwordChangeFail = !draft.modal.passwordChangeFail;
        draft.modal.current = 'passwordChangeFail';
      })
    }
    if(value === 'passwordChangeSuccess'){
      setValues(draft => {
        draft.modal.passwordChangeSuccess = !draft.modal.passwordChangeSuccess;
        draft.modal.current = 'passwordChangeSuccess';
      })
    }
  }

  const typeModalCurrent = values.modal.current;
  const typeModalBool = !!values.modal[typeModalCurrent];
  const innerfnOpenModal = (fn=null, op=null)=>{
    openModal(typeModalCurrent);
    if(typeof fn === 'function'){
      fn(op);
    }
  };
  const modalObj={
    'passwordChangeSuccess': <ModalComplete onClick={() => innerfnOpenModal(fnOpenModal, false)} title="업데이트 성공" children="업데이트를 성공했습니다."/>,
    'passwordChangeFail': <ModalComplete onClick={innerfnOpenModal} title="업데이트 실패" children="업데이트를 실패했습니다."/>,
  }
  const modalContent = modalObj[typeModalCurrent];


  useDidUpdateEffect(() => {
    if(values.check.password && values.check.changePassword && values.check.checkPassword){
      let sagaConf = {
        email: mypageReducer.myinfo.userInfo.email,
        oldPass: passwordVal,
        newPass: changePasswordVal
      }
      // console.log("success change form", sagaConf);
      AUTH_CHANGEPASS_SAGAS(sagaConf);
    }

  },[values.check.password, values.check.changePassword, values.check.checkPassword]);

  useDidUpdateEffect(() => {
    if(authReducer.changePass.success){
      // console.log("password change success");
      openModal('passwordChangeSuccess');
    }else if(authReducer.changePass.failure){
      // console.log("password change fail");
      openModal('passwordChangeFail');
    }
  }, [authReducer.changePass]);

  return (
    <>
      <Styled.ChangePasswordForm>
        <h2 className="form_title">{title}</h2>
        <form action="" className={classes.root}>
          <Grid container>
            <Grid item xs={3}>
              <label htmlFor="password" className="input__label">
                {/* <span className="label__img_box">
                  <img src={icon_key} alt="icon_key"/>
                </span> */}
                <span>
                  현재 비밀번호
                </span>
              </label>  
            </Grid>
            <Grid item xs={9}>
            <OutlinedInput
                // error={errorPassword}
                id="password"
                type={passwordShow ? 'text' : 'password'}
                value={passwordVal}
                onChange={handleChange('password')}
                className={classes.input}
                autoComplete="off"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>handleClick({type:"eyeIcon",value:`password`})}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      className={classes.eyeIcon}
                    >
                      {iconPasswordVisible(`password`)}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={0}
              />
              <div className={cx(`input__info password`)}>
                <span className={cx(`input__info text`,{active:(isRegPass===false)})}>
                * 잘못된 비밀번호입니다. 
                </span>
              </div>
            </Grid>
          </Grid>

          <Grid container>
              <Grid item xs={3}>
                <label htmlFor="changePassword" className="input__label">
                  {/* <span className="label__img_box">
                    <img src={icon_key} alt="icon_key"/>
                  </span> */}
                  <span>
                    변경할 비밀번호
                  </span>
                </label>  
              </Grid>
              <Grid item xs={9}>
              <OutlinedInput
                  // error={errorPassword}
                  id="changePassword"
                  type={changePasswordShow ? 'text' : 'password'}
                  value={changePasswordVal}
                  onChange={handleChange('changePassword')}
                  className={classes.input}
                  autoComplete="off"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle changePassword visibility"
                        onClick={()=>handleClick({type:"eyeIcon",value:`changePassword`})}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        className={classes.eyeIcon}
                      >
                        {iconPasswordVisible(`changePassword`)}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={0}
                />
                <div className={cx(`input__info changePassword`)}>
                  <span className={cx(`input__info text`,{active:(isChangeRegPass===false)})}>
                  * 8자 이상 16자 이하의 문자, 숫자 및 특수 문자를 조합하여 설정해주세요.
                  </span>
                </div>
              </Grid>
            </Grid>

            <Grid container >
              <Grid item xs={3}>
                <label htmlFor="checkPassword" className="input__label">
                  {/* <span className="label__img_box">
                    <img src={icon_check} alt="icon_check"/>
                  </span> */}
                  <span>
                  비밀번호 확인
                  </span>
                </label>  
              </Grid>
              <Grid item xs={9}>
              <OutlinedInput
                  // error={errorPassword}
                  id="checkPassword"
                  type={checkPasswordShow ? 'text' : 'password'}
                  value={checkPasswordVal}
                  onChange={handleChange('checkPassword')}
                  className={classes.input}
                  autoComplete="off"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={()=>handleClick({type:"eyeIcon",value:`checkPassword`})}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        className={classes.eyeIcon}
                      >
                        {iconPasswordVisible(`checkPassword`)}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={0}
                />
                <div className={cx(`input__info checkPassword`)}>
                  <span className={cx(`input__info text`,{active:(isRegCheckPass===false)})}>
                  * 비밀번호가 일치하지 않습니다.
                  </span>
                </div>
              </Grid>
            </Grid>
        </form>
        <div className="btnGnb">
            <button className="okBtn" onClick={handleSubmit}>OK</button>
            <button className="cancelBtn" onClick={fnOpenModal}>Cancel</button>
        </div>
      </Styled.ChangePasswordForm>
      <PlainModal
        isOpen={typeModalBool}
        content={modalContent}
        onClick={fnOpenModal}
        dim={false}
      />
    </>
  );
}


const useStyles = makeStyles(theme => ({
  root:{
    '& input:valid:focus + fieldset': {
    borderColor: `${color.blue}`,
  },
    width:'100%'
  },
  
  textField: {
    width: '100%',
    marginBottom: 25,
  },
  btn: {
    display: 'inline-block',
    margin: 'auto',
    border: `1px solid ${color.blue}`,
    boxShadow:'none',
    '&.bold': {
      fontWeight: 'bold'
    },
    '&:hover': {
      border: `1px solid ${color.blue}`,
    },
    '&.signup': {
      width: `300px`,
      background: `${color.blue}`,
      '&:hover': {
        boxShadow:'none',
        background: `${color.blue_hover}`
      },
    },
    '&.blue': {
      color:`white`,
      background: `${color.blue}`,
      '&:hover': {
        boxShadow:'none',
        background: `${color.blue_hover}`
      },
    },
  },
  formControl:{
    width:`100%`
  },
  input: {
    height: 35,
  },
  label: {
    fontSize: 14,
    top: `-17%`,
  },
  eyeIcon: {
    fontSize: 15
  },
}));

const Styled ={
  ChangePasswordForm:styled.div`
    width:600px;
    height: 360px;
    padding: 46px;
    padding-top: 30px;
    padding-bottom: 30px;

    .form_title{
      font-size: 22px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 40px;
    }
    
    .btnGnb{
      text-align: center;

      button{
        display: inline-block;
        width: 80px;
        height: 30px;
        text-align: center;
      }
      .okBtn{
        ${buttonBlue}
      }
      .cancelBtn{
        ${buttonWhite}
        padding: 0;
      }
      button + button{
        margin-left: 5px;
      }
    }

    .input__info{
      line-height: 8px;
      height: 26px;
      &.text{
        transition:.3s;
        opacity:0;
        ${font(11,color.blue_font)};
        color:${color.blue};
        &.active{
          opacity:1;
        }
      }
    }
    .label__img_box{
      margin-right:5px;
      opacity:0;
      &>img{
        position:relative;
        top:2px;
        width:14px;
        height:16px;
      }
    }
    .input__label{
      position:relative;
      top:10px;
      display:block;
      ${font(14,color.black_font)};
      font-weight:bold;
    }
    .MuiSelect-outlined.MuiSelect-outlined{
      padding:10px ;
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
      border-color: ${color.blue};
    }
    .MuiCheckbox-colorPrimary.Mui-checked{
      color:${color.blue}
    }
    .MuiOutlinedInput-root{
      border-radius: 3px;
    }
    .makeStyles-btn-3{
      border-radius: 3px;
    }
  `
}

export default ModalPasswordChange;