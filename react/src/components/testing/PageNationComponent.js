import React , { useEffect } from 'react';
import {useImmer} from 'use-immer';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import Pagination from "react-js-pagination";
import { useDidUpdateEffect } from 'lib/utils'
import { useSelector } from 'react-redux';
import {
  LISTING_TEST_LIST_SAGAS
} from 'store/actions';
// import PageContainer from './paging/PageContainer';
// import ArrowPageContainer from './paging/ArrowPageContainer';
import {ArrowPageContainer} from 'containers/pagination';

// import cx from 'classnames';


function PageNationComponent(props) {
  const {listing:listingReducer,auth:authReducer} = useSelector(state=>state);
  const isTestPageSuccess  = listingReducer.test.success;
  // const updatePage = listingReducer.test.pagingData.page;
  const pagingData = listingReducer.test.pagingData;
  const getUrlpage = props.match.params.list;
  const userCode = authReducer.signIn.profile.userCode;
  console.log(getUrlpage);

  const searchConf={
    "userCode" : userCode,
	  "page":getUrlpage,
	  "sort": 1,
	  "search" :"",
    "type" : "sender"
  };

  if(isTestPageSuccess){
    console.log(listingReducer.test,'listingReducer.test');
  }

  return (
    <Styled.PageNationComponent>

      <ArrowPageContainer 
        sagas={(config)=>LISTING_TEST_LIST_SAGAS({...searchConf,...config})}
        success={isTestPageSuccess}
        failure={listingReducer.test.failure}
        pending={listingReducer.test.pending}
        page={pagingData.page}
        url={'/pageTest'}
        matchUrl={props.match.params.list}
        pagingData={pagingData}
        paging={{
          prevPageText:'<',
          nextPageText:'>'
        }}
      /> 

      
      {
        listingReducer.test.list.map((item,idx)=>{
         return <div key={idx} className="box">
           <div>{item.caseCode}</div>
         </div>
        })
      }
      
      {/* <PageContainer 
        sagas={LISTING_TEST_LIST_SAGAS}
        success={isTestPageSuccess}
        failure={listingReducer.test.failure}
        pending={listingReducer.test.pending}
        page={pagingData.page}
        total={10}
        url={'/pageTest'}
        matchUrl={props.match.params.list}
        paging={{
          hideFirstLastPages:true,
          prevPageText:'<',
          nextPageText:'>'
        }}
      /> */}
    </Styled.PageNationComponent>
  );
}



const Styled = {
  PageNationComponent:styled.div`
  & >{
    .box{
      padding:10px;
      border:1px solid #ececec;
    }
  }
  `,

}


export default PageNationComponent;