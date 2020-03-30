import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useImmer} from 'use-immer';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import { 
  INFO_CASE_LOAD_SAGAS,
  // LISTING_WORKS_SEARCH_SAGAS,
  // INFO_CASE_DELETE_SAGAS,
} from 'store/actions';
import {storage} from 'lib/library';
// import {PlainModal , ModalComplete,ModalConfirmContent} from 'components/common/modal';


const intialState ={
  modal:{
    title:"",
    subtitle:"",
    type:"confirm",
    isShow:false
  },
  index:0
}
function ModalIndicationContent(props) {
  const [values,setValues] = useImmer(intialState);
  const storageCurrentCode = storage.get('worksCurrentCode') || false;
  const currentCode = storageCurrentCode && storageCurrentCode.currentCode;

  const {
    // listing:listingReducer,
    auth:authReducer,
    info:infoReducer
  } = useSelector(state=>state);

  const userCode = authReducer.signIn.profile.userCode;
  const handleClick = config =>{
    const {type} = config;
    if(type === 'load'){
      setValues(draft=>{
        draft.index = draft.index+1
      })
      const loadConf ={
        "userCode" : userCode,
        "caseCode" : currentCode
      }
      INFO_CASE_LOAD_SAGAS(loadConf);
    }
  }

  // NOTE: Case Load
  const isCaseLoadSuccess = infoReducer.case.load.success;
  const isCaseLoadFailure = infoReducer.case.load.failure;
  useEffect(()=>{
    const initIdx = values.index !== 0;
    if(isCaseLoadSuccess && initIdx){
      props.history.push('/case');
    }
    if(isCaseLoadFailure && initIdx){
      setValues(draft=>{
        draft.modal.type= 'alert';
        draft.modal.isShow = true;
        draft.modal.title = '로드 실패';
        draft.modal.subtitle = '잠시 후 다시 시도해주세요.';
      });
    }
  },[isCaseLoadSuccess,isCaseLoadFailure]);

  return (
    <Styled.ModalIndicationContent>
        <h3>Indication</h3>
        <button onClick={()=>handleClick({type:"load"})}>GO SETTING</button>
    </Styled.ModalIndicationContent>
  );
}

const Styled ={
  ModalIndicationContent:styled.div`
    padding:15px;
    &{

    }
  `
}

export default withRouter(ModalIndicationContent);