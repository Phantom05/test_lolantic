import React from 'react';
import { PartnerListSearchForm } from 'components/common/form';
import styled from 'styled-components';
import { color, font } from 'styles/__utils';

function ModalPartnerChangeContent(props) {
  const { list = [], onSubmit=()=>{} } = props;
  
  return (
    <Styled.ModalPartnerChangeContent>
      <h3 className="title">Partners List</h3>
      <PartnerListSearchForm 
        list={list} 
        selectOption="onlySelect"
        option="my"
        onSubmit={onSubmit}
      />
    </Styled.ModalPartnerChangeContent>
  );
}

const Styled = {
  ModalPartnerChangeContent: styled.div`
    padding:30px;
      .title{
      margin-bottom:30px;
      text-align:center;
      ${font(22, color.black_font)};
      font-weight:bold;
    }
  `
}

export default ModalPartnerChangeContent;