import React from 'react';
import styled from 'styled-components';
import { buttonBlue, font, color } from 'styles/__utils';
import { Link } from 'react-router-dom';
import { EscapeConvert } from 'components/base/helpers/convert';


function convertEscape(text) {
  return <EscapeConvert
    prev={'\n'}
    next={<br />}
    content={text}
  />
}

function ModalConfirmContent(props) {
  const { 
    // children, 
    okLink, 
    title, 
    subtitle ,
    okClick= ()=>{},
    cancelClick= ()=>{}
  } = props;
  // const infoText = children ? convertEscape(children) : '완료되었습니다.';
  const titleText = title ? convertEscape(title) : '완료!';
  const subtitleText = subtitle ? convertEscape(subtitle) : '';
  return (
    <Styled.ModalConfirmContent >
      <h1 className="title">{titleText}</h1>
      <p className="info">{subtitleText}</p>
      {okLink
        ? <Link to={okLink}>
          <button
            className="btn"
            onClick={props.okClick}
          >OK</button>
        </Link>
        : <button
          className="btn"
          onClick={props.okClick}
        >OK</button>
      }
       <button
          className="btn"
          onClick={props.cancelClick}
        >CANCEL</button>

    </Styled.ModalConfirmContent>
  );
}
const Styled = {
  ModalConfirmContent: styled.div`
    text-align:center;
    padding:50px 30px 30px 30px;
    .title{
      ${font(30, color.black_font)};
      font-weight:bold;
      margin-bottom:22px;
    }
    .info{
      ${font(16, color.gray_font)};
      margin-bottom:30px;
      line-height:22px;
    }
    .btn{
      ${buttonBlue};
      min-width:100px;
      margin-right:8px;
      &:last-child{
        margin-right:0;
      }
    }
  `
}

export default ModalConfirmContent;