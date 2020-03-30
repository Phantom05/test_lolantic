import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useDidUpdateEffect } from 'lib/utils';
import { color, font } from 'styles/__utils';
import cx from 'classnames';
import _ from 'lodash';
// import {useSelector} from 'react-redux';
// import {makeQuerySelector} from 'lib/reselector';
// import { useImmer } from 'use-immer';
// import Pagination from "react-js-pagination";

/**
 * <ArrowPageContainer
    sagas={(config) => LISTING_WORKS_SEARCH_SAGAS({ ...searchConfig, ...config })}
    success={listingReducer.works.success}
    failure={listingReducer.works.failure}
    pending={listingReducer.works.pending}
    page={listingReducer.works.pagingData.page}
    url={'/works'}
    matchUrl={props.match.params.list}
    pagingData={listingReducer.works.pagingData}
    paging={{
      prevPageText: <ArrowBackIosIcon
        disabled={isEndPrevPage}
        className={cx("Arrow__btn_svg", { disabled: isEndPrevPage })}
      />,
      nextPageText: <ArrowForwardIosIcon
        disabled={isEndNextPage}
        className={cx("Arrow__btn_svg", { disabled: isEndNextPage })}
      />
    }}
  />
 */
// const initialState = {
//   list: [],
//   pagingData: {
//     page: 1,
//     total: 10,
//   },
//   isLoading: false
// }

function ArrowPageContainer(props) {
  const {
    sagas,
    success,
    page,
    matchUrl,
    paging,
    pagingData: propsPagingData,
    url,
  } = props;
  
  // NOTE: paging click
  const handlePageClick = config => {
    const { e, value } = config;
    e.preventDefault();
    sagas({ page: page + value });
  }

  useEffect(() => {
    if (success) {
      if(url !== '/works'){
        props.history.push(`${url}/${page}`);
      }
    }
  }, [page]);

  // NOTE: url change
  useDidUpdateEffect(() => {
    if (props.history.action === 'POP') {
      sagas(matchUrl);
    }
  }, [matchUrl]);

  return (
    <Paging
      config={paging}
      onClick={handlePageClick}
      countPerPage={1}
      getPageUrl={`${url}`}
      pagingData={propsPagingData}
    />
  );
}

function Paging({
  onClick = () => { },
  config,
  pagingData,
  getPageUrl
}) {

  return (
    <Styled.Pagination>
      <div className="pagination">
        {pagingData.totalPage !== 0 && 
          <span className="page__view">
            {pagingData.page} /  {pagingData.totalPage}
          </span>
        }
        <a
          className={cx("Arrow__btn", { unActive: !pagingData.prevCheck })}
          href={`${getPageUrl}/${pagingData.page - 1}`}
          onClick={(e) => onClick({ type: "prev", value: -1, e })}>
          {config.prevPageText || "prev"}
        </a>
        <a
          className={cx("Arrow__btn", { unActive: !pagingData.nextCheck })}
          href={`${getPageUrl}/${pagingData.page + 1}`}
          onClick={(e) => onClick({ type: "prev", value: 1, e })}>
          {config.nextPageText || "next "}
        </a>
      </div>

    </Styled.Pagination>
  )
}


const Styled = {
  PageNationComponent: styled.div`
  `,
  Pagination: styled.div`
    &:after{
      display:block;
      content:"";
      clear: both;
    }
    & > .pagination{
      .page__view{
        position:relative;
        float:left;
        ${font(16,color.gray_text)};
        padding-left:25px;
        top:10px;
      }
      .Arrow__btn{
        position:relative;
        display:inline-block;
        /* top:15px; */
        cursor: pointer;
        padding:3px;
        font-size:30px;
        color:${color.black};
        transition:.3s;
        &:hover{
          color:${color.blue};
        }
        &.unActive{
          color:gray;
          opacity:.5;
          pointer-events:none;
          &:hover{
            color:gray;
          }
        }
      }
    }
    
  `
}

export default withRouter(ArrowPageContainer);