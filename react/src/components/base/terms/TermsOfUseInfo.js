import React from 'react';
import styled from 'styled-components';
import { font, color } from 'styles/__utils';
import { PlainModal,ModalTerms } from 'components/common/modal';
import {useImmer} from 'use-immer';

function TermsOfUseInfo() {
  const [values,setValues] = useImmer({
    current:''
  })
  const onClick = (name) => e => {
    if(name !== 'dim'){
      setValues(draft=>{
        draft.current = name;
      });
    }else{
      setValues(draft=>{
        draft.current = "";
      });
    }
  }

  const modalObj={
    launcher: <ModalTerms type={"launcher"}/>,
    finance: <ModalTerms type={"finance"}/>,
    collection: <ModalTerms type={"collection"}/>,
    offer: <ModalTerms type={"offer"}/>,
  }

  let currentModal = modalObj[values.current];
  if(!currentModal){
    currentModal= null
  }

  return (
    <>
      <PlainModal
        
        isOpen={!!currentModal}
        onClick={onClick('dim')}
        content={currentModal}
        width={500}
      />
      <Styled.TermsOfUseInfo className="term__info box">
        <p className="term__info text">
          본인은 만
          <span className="term__info bold"> 14세 이상</span> 이며,
          <span className="term__info underline">
            <span className="link" onClick={onClick('launcher')} >DOF Launcher 이용약관,</span>
          </span>
          <span className="term__info underline">
            <span className="link" onClick={onClick('finance')} >전자금융거래이용약관,</span>
          </span><br />
          <span className="term__info underline">
            <span className="link" onClick={onClick('collection')} >개인정보 수집 및 이용,</span>
          </span>
          <span className="term__info underline">
            <span className="link" onClick={onClick('offer')} >개인정보 제공 내용을</span>
          </span>확인 하였으며,
      <span className="term__info bold">동의합니다</span>.
    </p>
      </Styled.TermsOfUseInfo>
    </>
  )
}

const Styled = {
  TermsOfUseInfo: styled.div`
  text-align:center;
  .term__info{
      ${font(12, color.black_font)};
      line-height:18px;
      letter-spacing:.2px;
      &.underline{
        text-decoration:underline;
        text-underline-position: under;
        margin-right:5px;
      }
      &.bold{
        font-weight:bold;
      }
      &.text{
        display:inline-block;
      }
    }
    .link{
      cursor: pointer;
    }
  `
}
export default TermsOfUseInfo;