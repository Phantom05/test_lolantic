import React, { useEffect } from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { floatClear, color, font } from 'styles/__utils';
import { ENV_MODE_DEV } from 'lib/setting';
import { LoadingCircle } from 'components/base/loading';
import { useImmer } from 'use-immer';
import {storage,keys} from 'lib/library';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {VisibleEyes} from 'components/common/icon';



function SignInForm({ onSubmit, error, pending,info }) {
  const classes = useStyles();
  const [values, setValues] = useImmer({
    email: '',
    password: '',
    showPassword: false,
    remember: true,
    auto:false,
  });
  const { email: errorEmail, password: errorPassword } = error;

  const handleChange = prop => event => {
    const inputType = (prop ==='remember' || prop ==='auto')?'checked':'value';
    const targetValue = event.target[inputType];
    setValues(draft => {
      draft[prop] = targetValue;
    });
  };

  const handleClickShowPassword = () => {
    setValues(draft => {
      draft.showPassword = !draft.showPassword;
    });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
    
  const handleSubmit = (e) => {
    onSubmit({...values,type:e.currentTarget.name});
  }

  const handleKeyUp = prop=>(e) =>{
    if(e.key === 'Enter'){
      onSubmit({...values,type:'user'});
    }
  }
  // NOTE: 개발용 아이디 비밀번호
  const devInsertAccount = (value) => {
    if(value === 'sender'){
      setValues(draft => {
        draft.email = "sender@doflab.com";
        draft.password = "dof0070!";
      })
    }
    if(value === 'receiver'){
      setValues(draft => {
        draft.email = "receiver@doflab.com";
        draft.password = "dof0070!";
      })
    }
    
  };

  // 마지막 로그인시 저장해둔 storage email값 가져오기 키이름은 remember
  useEffect(()=>{
    const getRemember = storage.get(keys.remember);
    if(getRemember){
      setValues(draft=>{
        draft.email = getRemember;
        draft.remember = true;
      });
    }
  },[setValues]);

  return (
    <Styled.SignInForm>
      <h1 className="signin__title">DOF Launcher</h1>
      {ENV_MODE_DEV && <div>
        <Button
          variant="contained"
          color="inherit"
          style={{ marginBottom: 20 ,marginRight:10}}
          onClick={()=>devInsertAccount('sender')}>Sender Login</Button>
          <Button
          variant="contained"
          color="inherit"
          style={{ marginBottom: 20 }}
          onClick={()=>devInsertAccount('receiver')}>Receiver Login</Button>
      </div>}
      <form action="" className={classes.root}>
        <FormGroup aria-label="position" row>
          <FormControl className={cx(classes.margin, classes.textField)} variant="outlined">
            <InputLabel htmlFor="email" className={classes.label}>Email Address</InputLabel>
            <OutlinedInput
              error={errorEmail}
              autoComplete="off"
              id="email"
              type={'text'}
              value={values.email}
              onChange={handleChange('email')}
              onKeyUp={handleKeyUp('keyup')}
              labelWidth={70}
              className={classes.input}
            />
          </FormControl>
        </FormGroup>

        <FormGroup aria-label="position" row>
          <FormControl className={cx(classes.margin, classes.textField, classes.password)} variant="outlined">
            <InputLabel htmlFor="password" className={classes.label}>Password</InputLabel>
            <OutlinedInput
              error={errorPassword}
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              onKeyUp={handleKeyUp('keyup')}
              className={classes.input}

              // errorEmail

              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    className={classes.eyeIcon}
                  >
                    <VisibleEyes show={values.showPassword} />
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
        </FormGroup>

        <FormGroup aria-label="position" row className="form__cash_box">
          <Grid container justify="space-between">
            <Grid item xs={6}>
            <FormControlLabel
                value="auto"
                checked={values.auto}
                control={<Checkbox color="primary" />}
                onChange={handleChange('auto')}
                label={<span className="remember_label">자동 로그인</span>}
                labelPlacement="end"
              />
              {/* <FormControlLabel
                value="remember"
                checked={values.remember}
                control={<Checkbox color="primary" />}
                onChange={handleChange('remember')}
                label={<span className="remember_label">Remember me</span>}
                labelPlacement="end"
              /> */}
            </Grid>
            <Grid item xs={6}>
              <Link to="/auth/reset/password" className="form__cash_tx">비밀번호 재설정</Link>
            </Grid>
          </Grid>
        </FormGroup>

        <FormGroup aria-label="position" row>
          <Button
            variant="contained"
            color="primary"
            className={cx(classes.btn, 'login bold')}
            name="user"
            onClick={handleSubmit}>
            {pending ? <LoadingCircle className="loading__bar" size={20} /> : '로그인'}
          </Button>
        </FormGroup>

        <FormGroup aria-label="position" row>
          <Button
            variant="outlined"
            color="primary"
            name="customer"
            className={cx(classes.btn, 'customer bold')}
            onClick={handleSubmit}>
            비회원 접속
          </Button>
        </FormGroup>

        <FormGroup aria-label="position" row>
          <p className="form__link_box">
            <Link to="/auth/signup" className="form__link_btn signup">DOF Launcher 계정 만들기</Link>
          </p>
        </FormGroup>

      </form>
    </Styled.SignInForm>
  )
}


const useStyles = makeStyles(theme => ({
  root: {
    '& input:valid:focus + fieldset': {
      borderColor: `${color.blue}`,
    },
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
    marginBottom: 25,
  },
  password:{
    marginBottom: 5,
  },
  btn: {
    display: 'inline-block',
    width: `300px`,
    margin: 'auto',
    height: '40px',
    // letterSpacing: `1px`,
    boxShadow: `none`,
    border: `1px solid ${color.blue}`,
    '&:hover': {
      border: `1px solid ${color.blue}`,
      boxShadow: `none`,
    },
    '&.login': {
      background: `${color.blue}`,
      '&:hover': {
        background: `${color.blue_hover}`
      },
    },
    '&.customer': {
      marginTop: 10,
      color: `${color.blue}`,
    },
    '&.bold': {
      fontWeight: 'bold'
    },
  },
  input: {
    height: 40,
    '&.error:focus':'border:1px solid red'
  },
  label: {
    fontSize: 14,
    top: `-17%`,
  },
  eyeIcon: {
    fontSize: 15
  },
  remember_label: {
    fontSize: 12
  }
}));

const Styled = {
  SignInForm: styled.div`
    width:400px;
    .form__group{
      ${floatClear}
    }
    .form__link_box{
      width:100%;
      text-align:center;
      margin-top:20px;
    }
    .form__link_btn{
      color:${color.blue};
      font-size:16px;
      &:hover{
        text-decoration:underline;
      }
    }
    .form__cash_box{
      margin-bottom:60px;
    }
    .signin__title{
      margin-bottom:150px;
      ${font(36, color.black_font)};
      font-weight:bold;
      text-align:center;
    }
    .remember_label{
      ${font(14, color.black_font)};
    }
    .form__cash_tx{
      position:relative;
      float:right;
      top:13px;
      ${font(14, color.black_font)};
      &:hover{
        text-decoration:underline;
      }
    }
    .loading__bar{
      position:relative;
      top:5px;
      margin-left:5px;
    }
    .MuiCircularProgress-colorPrimary{
      color:white;
    }
    .btn__box{
      text-align:center;
    }

    .MuiInputLabel-root.Mui-focused{
      color:${color.blue}; 
      border-color:${color.blue};
      &.error{
        border-color:${color.red};
      }
    }
    .MuiOutlinedInput-root{
      border-radius: 3px;
    }

    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline{
      border-color:${color.blue}
    }
    .MuiCheckbox-colorPrimary.Mui-checked{
      color:${color.blue}
    }
    .MuiButton-root{
      border-radius: 3px;
    }
    
    /* .MuiOutlinedInput-root:hover{
      border:1px solid red !important;
    } */

  `
}


export default SignInForm;
