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
// import cx from 'classnames';



const initialState={
  list:[],
  pagingData:{
    page:1,
    total:10,
  },
  isLoading:false
}

function PageContainer(props) {
  const {
    sagas,
    success,
    failure,
    pending,
    page,
    total,
    matchUrl,
    paging,
    url} = props;
    const [values,setValues] = useImmer(initialState);
    const pagingData = values.pagingData;
    // const getUrlpage = props.match.params.list;
    // const {listing:listingReducer} = useSelector(state=>state);
    // const isTestPageSuccess  = listingReducer.test.success;
    // const updatePage = listingReducer.test.pagingData.page;

  // NOTE: paging click
  const handlePageChange = page=>{
    sagas(page);
  }

  useDidUpdateEffect(()=>{
    if(success){
      setValues(draft=>{
        draft.pagingData.page = page;
        draft.pagingData.total = total;
      })
      props.history.push(`${url}/${page}`);
    }
    if(failure){
      console.log('pagecontainer failure');
    }
    if(pending){
      console.log('pagecontainer pending');
    }
  },[success,failure,pending])

  // NOTE: url change
  useDidUpdateEffect(() => {
    if(props.history.action === 'POP'){
      sagas(matchUrl);
    }
  }, [matchUrl]);

  // NOTE: 초기
  useEffect( () => {
    sagas(matchUrl);
  }, []);

  return (
    <Styled.PageNationComponent>
      <Paging  
        config={paging}
        page={parseInt(pagingData.page)}
        total={pagingData.total}
        onChange={handlePageChange}
        countPerPage={1}
        getPageUrl={(i) => `/pageTest/${i}`}
      />
    </Styled.PageNationComponent>
  );
}

function Paging({
  page = 1,
  total = 1,
  onChange = () => {},
  getPageUrl = () => {},
  countPerPage = 10,
  pageLen = 5,
  config
}){
  return (
    <Styled.Pagination>
      <Pagination
        // hideNavigation
        // hideFirstLastPages
        
        activePage={page}
        totalItemsCount={total}
        onChange={onChange}
    
        itemsCountPerPage={countPerPage}
        pageRangeDisplayed={pageLen}

        getPageUrl={getPageUrl}

        innerClass="pagination"
        activeLinkClass="active"
    
        // firstPageText={<span className="page__list"><span className="txt">first</span></span>}
        prevPageText={<span className="page__list"><span className="txt">prev</span></span>}
        nextPageText={<span className="page__list"><span className="txt">next</span></span>}
        {...config}
        // lastPageText={<span className="page__list"><span className="txt">last</span></span>}
      />

    </Styled.Pagination>
  )
}


const Styled = {
  PageNationComponent:styled.div`
  `,
  Pagination:styled.div`
    & >{
      .pagination li{
        float:left;
        &.active{
          font-weight:bold;
        }
      }
      .pagination a{
        display:inline-block;
        padding:5px;
        border:1px solid #ececec;
        &:hover{
          background:#ececec;
        }
      }
    }
  `
}

export default withRouter(PageContainer);