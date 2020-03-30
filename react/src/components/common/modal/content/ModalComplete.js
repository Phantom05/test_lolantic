import React from 'react';
import styled from 'styled-components';
import { buttonBlue, font, color } from 'styles/__utils';
import { Link } from 'react-router-dom';
import { EscapeConvert } from 'components/base/helpers/convert';


function convertEscape(text){
  return <EscapeConvert
  prev={'\n'}
  next={<br />}
  content={text}
/>
}

function ModalComplete(props) {
  const { children, okLink, title } = props;
  const infoText = children ? convertEscape(children) : '완료되었습니다.';
  const titleText = title ? convertEscape(title)       : '완료!';

  return (
    <Styled.ModalComplete >
      <h1 className="title">{titleText}</h1>
      <p className="info">{infoText}</p>
      {okLink
        ? <Link to={okLink}>
          <button
            className="btn"
            onClick={props.onClick}
          >OK</button>
        </Link>
        : <button
          className="btn"
          onClick={props.onClick}
        >OK</button>
      }

    </Styled.ModalComplete>
  );
}
const Styled = {
  ModalComplete: styled.div`
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
    }
  `
}

export default ModalComplete;