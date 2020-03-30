import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import TestPartnerSearch from './TestPartnerSearch';
import {
  LISTING_PARTNERS_SEARCH_SAGAS,
  LISTING_PARTNERS_INFO
} from 'store/actions';

// DEBUG: 연구해야함.  사가를 컨테이너에서만 요청해보도록 노력
// DEBUG: 컨테이너에서는 useState를 쓰지 않도록 노력
// DEBUG: 
function PartnerListSearchContainer(props) {
  const {
    auth: authReducer,
    listing: listingReducer,
  } = useSelector(state => state);
  const { partners, partnersType } = listingReducer;

  const handleSearch = config => {
    console.log('>>handleSearch');
    console.log(config);

    const initConfig = {

      userCode : config.useCode,
      page     : config.page,
      codeType : config.codeType,
      type     : config.type,
      keyword  : config.keyword,
      first    : config.first

    }
    LISTING_PARTNERS_SEARCH_SAGAS(initConfig)
  }

  return (
    <Styled.Test>
      <TestPartnerSearch
        page={partners.page}
        userCode={authReducer.signIn.profile.userCode}
        onSearch={handleSearch}
        height={500}
      />
    </Styled.Test>
  );
}

const Styled = {
  Test: styled.div`
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    width:800px;
    background:white;
    border:1px solid #ececec;
    padding:30px;
    box-shadow:5px 5px 5px rgba(0,0,0,.5);
    z-index:50;
    
  `
}

export default PartnerListSearchContainer;

 