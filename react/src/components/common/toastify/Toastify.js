import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {color} from 'styles/__utils';
// import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
// import {compareProp} from 'lib/library';
/**
 *  <Toastify
        type="error"
        show={vaild.error || vaild.password}
        text="아이디나 비밀번호를 확인해주세요."
      />
 * @param {*} props 
 */
// const Toastify = React.memo();

function Toastify(props) {
  const {type,show,text,close} = props;

  if(!show) return null;
  if(type === 'error'){
    
    toast.error(
    <>
    {/* <ErrorOutlineIcon className="error_icon"/> */}
    {text}
    </>, {
      
      position: "top-center",
      autoClose: 2000,
      // hideProgressBar: false,
      // closeOnClick: true,
      pauseOnHover: false,
      // draggable: true,
    });
  }
  if(type === 'info'){
    toast.info(text, {
      position: "top-center",
      autoClose: 3000,
      // hideProgressBar: false,
      // closeOnClick: true,
      pauseOnHover: false,
      // draggable: true,
  });;
  }
  if(type === 'success'){
    toast.success(text, {
      position: "top-center",
      autoClose: 3000,
      // hideProgressBar: false,
      // closeOnClick: true,
      pauseOnHover: false,
      // draggable: true,
  });;
  }
  if(type === 'warning'){
    toast.warn(text, {
      position: "top-center",
      autoClose: 3000,
      // hideProgressBar: false,
      // closeOnClick: true,
      pauseOnHover: false,
      // draggable: true,
  });;
  }
  if(type === 'default'){
    toast(text, {
      position: "top-center",
      autoClose: 3000,
      // hideProgressBar: false,
      // closeOnClick: true,
      pauseOnHover: false,
      // draggable: true,
  });;
  }
  return (
    <Styled.Toastify>
      <ToastContainer />
    </Styled.Toastify>
  );
}



const Styled ={
  Toastify:styled.div`
    .Toastify__toast-container {
      width: 320px;
    }
    .Toastify__toast--default {
        background: #fff;
        color: #aaa;
    }
      .Toastify__toast--info {
        background: #3498db;
    }
      .Toastify__toast--success {
        background: #07bc0c;
    }
      .Toastify__toast--warning {
        background: #f1c40f;
    }
      .Toastify__toast--error {
        background: ${color.grayText};
        border-radius:5px;
        background:#ececec;
        color:black;
        .Toastify__progress-bar--animated{
          background:#afafaf;
        }
    }
    .Toastify__close-button{
      color:black;
    }
    .error_icon{
      position: relative;
      color: orange;
      top: 5px;
      margin-right:7px;
    }
  `
}

export default Toastify;