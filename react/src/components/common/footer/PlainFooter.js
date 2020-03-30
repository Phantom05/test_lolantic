import React from 'react';
import styled from 'styled-components';
import {font,color} from 'styles/__utils';
import {
  floatClear,
  positionHeightCenter
} from 'styles/__utils';
import {useImmer} from 'use-immer';
import {PlainModal,ModalTerms} from 'components/common/modal';

const initialStage ={
  modal:{
    isShow:false,
    type:""
  }
}
function PlainFooter(props) {
  const [values, setValues] = useImmer(initialStage);
  const handleClick = config =>{
    const {type} = config;
    if(type === 'dim'){
      setValues(draft=>{
        draft.modal.isShow = false;
  
      })
    }else{
      setValues(draft=>{
        draft.modal.isShow = true;
        if(type === 'personal'){
          draft.modal.type="process";
        }
        if(type === 'term'){
          draft.modal.type="launcher"; 
        }
      })
    }
  }

  return (
    <Styled.Footer>
      <PlainModal 
       type = "caseLoad" // 있으면 지정 없으면 plain
        isOpen={values.modal.isShow}
        content={<ModalTerms
          type={values.modal.type}
        />}
        onClick={()=>handleClick({type:"dim"})}
        dim={true}
        width={500} // 있으면 지정 없으면 360
      />
      <div className="footer__con">
        <div className="footer__box link bold">
          <span onClick={()=>handleClick({type:"term"})}>이용 약관</span>
        </div>
        <div className="footer__box link bold">
        <span onClick={()=>handleClick({type:"personal"})}>개인정보 처리방침</span>
        </div>
        <div className="footer__box copyright">
          Copyright © DOF Inc. All rights reserved.
        </div>
      </div>
      
    </Styled.Footer>
  );
}

const Styled={
  Footer:styled.div`
    font-size:14px;
    color:#777;
    width:100%;
    text-align:center;
    .footer__con{
      ${floatClear}
      display:inline-block;
    }
    .footer__box{
      position: relative;
      float:left;
      margin-right:10px;
      padding-right:10px;
      ${font(12,color.black_font)};
      &:after{
        ${positionHeightCenter}
        content:'';
        width:1px;
        height:14px;
        right:0;
        background:#C4C4C4;
      }
      &:last-child{
        margin-right:0;
        padding-right:0;
      }
      &:last-child:after{
        display:none
      }
      &.link{
        cursor: pointer;
      }
      &.link:hover{
        text-decoration:underline;
      }
      &.bold{
        font-weight:bold;
      }
      &.copyright{
        color:${color.gray_font};
      }
    }
  `
}

export default PlainFooter;