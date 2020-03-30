import React from 'react';
import styled from 'styled-components';
import {font,color,buttonBlue} from 'styles/__utils';

function ModalWorksContent(props) {
  const {children, onClick,type} = props;
  let titleTx,content ;
  if(type === 'load'){
    titleTx = '로드 실패';
    content = '케이스를 선택해주세요.';
  }
  if(type === 'delete_cancel'){
    titleTx = '삭제 실패';
    content = '케이스를 선택해주세요.';
  }
  if(type === 'delete_ok'){
    titleTx = '삭제하시겠습니까?';
    content = '삭제 된 케이스를 복구할 수 없습니다.'
  }
  const isDeleteConfirm = type === 'delete_ok';
  return (
    <Styled.ModalWorksContent>
        <h2 className="ModalWorksContent__title">{titleTx}</h2>
        <p className="ModalWorksContent__info">{content}</p>
        <div className="ModalWorksContent__btn_box">
        <button className="ModalWorksContent__btn" onClick={()=>onClick('ok')}>확인</button>
        {isDeleteConfirm &&
          <button className="ModalWorksContent__btn" onClick={()=>onClick('cancel')}>취소</button>
        }
        </div>
    </Styled.ModalWorksContent>
  );
}

const Styled = {
  ModalWorksContent:styled.div`
  padding:30px;
  padding-top:50px;
  .ModalWorksContent__title{
    text-align:center;
    margin-bottom:15px;
    ${font(30,color.black_font)};
    font-weight:bold;
  }
  .ModalWorksContent__info{
    text-align:center;
    ${font(16,color.gray_font)};
    margin-bottom:30px;
  }
  .ModalWorksContent__btn_box{
    text-align:center;
  }
  .ModalWorksContent__btn{
    ${buttonBlue};
    margin-right:10px;
    &:last-child{
      margin-right:0;
    }
  }
  
  `
}

export default ModalWorksContent;