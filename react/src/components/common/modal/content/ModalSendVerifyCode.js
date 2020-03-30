import React from 'react';
import styled from 'styled-components';
import {buttonBlue,font,color} from 'styles/__utils';

function ModalSendVerifyCode(props) {
  return (

    <Styled.ModalSendVerifyCode>
      
      <h1 className="title">인증코드 전송 완료</h1>
      <p className="info">메일로 전송된 인증코드를 입력하세요.</p>
      <button 
        className="btn"
        onClick={props.onClick}
      >OK</button>
      
    </Styled.ModalSendVerifyCode>
  );
}

const Styled ={
  ModalSendVerifyCode:styled.div`
    text-align:center;
    padding:50px 30px 30px 30px;
    .title{
      ${font(30,color.black_font)};
      font-weight:bold;
      margin-bottom:10px;
    }
    .info{
      ${font(16,color.gray_font)};
      margin-bottom:30px;
    }
    .btn{
      ${buttonBlue};
      min-width:100px;
    }
  `
}

export default ModalSendVerifyCode;