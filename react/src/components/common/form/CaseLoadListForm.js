import React from 'react';
import styled from 'styled-components';
import { color, font } from 'styles/__utils';
import {CaseLoadList} from 'components/common/listing';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
// import {LoadingCircle} from 'components/base/loading'
import { Toastify } from 'components/common/toastify';
import {
  LISTING_CASE_LOAD,
  LISTING_CASE_LOAD_SAGAS
} from 'store/actions';

import {InfiniteScroll} from 'components/base/scroll';
// import { Scrollbars } from 'react-custom-scrollbars';

function CaseLoadListForm(props) {
  const {onSubmit} = props;
  const { listing:listingReducer,auth:authReducer } = useSelector(state=>state);
  const {case:caseList} = listingReducer;
  
  const [values , setValues] = useImmer({
    result:null,
    isNotSelected:false,
    errorCount:0
  });

  const handleClick = value => config =>{
    if(value === 'list'){
      setValues(draft=>{{
        draft.result = config;
        draft.isNotSelected = false;
      }});
    }
    if(value === 'load'){
      if(!values.result){
        setValues(draft=>{{
          draft.isNotSelected = false;
        }});
        setValues(draft=>{{
          draft.isNotSelected = true;
        }});
      }else{
        onSubmit && onSubmit(values.result)
      }
      
    }
  };


  const loadConfig ={
    userCode:authReducer.signIn.profile.userCode,
    page:caseList.page
  }
  // console.log(loadConfig,'loadConfig');
  // console.log(caseList.isEnd,'ei');
  // console.log(caseList,'caseList');
  const isEnd = caseList.isEnd;
  
  return (
    <Stlyed.CaseLoadListForm>
      <div className="caseLoad__toastify_box">
        <Toastify
          type="info"
          show={values.isNotSelected}
          text="Please, select case."
        />
      </div>

      <h1 className="caseload__title">Load Case</h1>
      <div className="caseload__con_box">

        <InfiniteScroll
          isEnd={isEnd}
          maxDataLength={30}
          dataLength={caseList.load.length}
          next={()=>LISTING_CASE_LOAD_SAGAS(loadConfig)}
          unMount={()=>LISTING_CASE_LOAD.init()}
          height={425}
        >
          <CaseLoadList 
            list={caseList.load}
            onChange={handleClick('list')}
          />
        </InfiniteScroll>
 
      </div>
      <div className="caseload__button_box">
        <button 
          onClick={handleClick('load')}
          className="caseload__button caseload__button-blue"
          >LOAD</button>
      </div>
    </Stlyed.CaseLoadListForm>
  );
}

const Stlyed = {
  CaseLoadListForm: styled.div`
    padding:30px;
    .cassload__info{
      ${font(14)};
    }
    .MuiGrid-grid-xs-1 {
      max-width: 7%;
      flex-basis: 7%;
    }
    .caseload__con_box{
      /* max-height:425px; */
      /* overflow-y:auto; */
      /* padding-right:30px; */
    }
    .caseload__title{
      text-align:center;
      ${font(22, color.black_font)};
      margin-bottom:20px;
      font-weight: 600;
    }
    .caseload__button_box{
      background:white;
      text-align:right;
      padding-top:15px;
    }
    .caseload__button{
      ${font(16)};
      box-shadow:none;
      border-radius:3px;
      cursor: pointer;
      padding:8px 20px;

      &-blue{
        border:none;
        background:${color.blue};
        color:white;
        transition: all .3s;
        &:hover{
          background:${color.blue_hover};
          box-shadow:none;
        }
      }
      &-white{
        border:2px solid ${color.blue};
        background:white;
        color:${color.blue};
        &:hover{
          background:white;
          box-shadow:none;
        }
      }
    }
    .align__center{
      text-align:center;
    }
    .caseLoad__toastify_box{
      ${font(14)};
      text-align:center;
      .Toastify__toast{
        background: white;
        color: black;
        box-shadow: 5px 5px 5px rgba(0,0,0,.2);
        border-radius:5px;
      }
      .Toastify__close-button{
        color:black;
      }

    }
  `
}

export default CaseLoadListForm;