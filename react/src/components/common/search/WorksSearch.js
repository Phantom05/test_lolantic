import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { font, color } from 'styles/__utils';
import CachedIcon from '@material-ui/icons/Cached';
import cx from 'classnames';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { storage } from 'lib/library';
import _ from 'lodash';
import { mapper } from 'lib/mapper';
import {WorksFilter} from 'components/common/filter';
// import {useDidUpdateEffect} from 'lib/utils';
// import { useDidUpdateEffect } from 'lib/utils';

let initialState = {
  search: {
    sort: '1',
    type: "",
    search: "",
    first: true,
    isLoad: false
  },
  refresh: {
    active: false
  }
}



function WorksSearch(props) {
  const [values, setValues] = useImmer(initialState);
  const typeSelectRef = useRef(null);
  const { onSearch, onClick, type } = props;
  const { listing: listingReducer, auth: authReducer } = useSelector(state => state);
  const userCode = authReducer.signIn.profile.userCode;
  const getStorageCurrenctCode = storage.get('worksCurrentCode');
  const isTypeSender = getStorageCurrenctCode && getStorageCurrenctCode.currentSenderCode === userCode
  const isCompleteCard = listingReducer.works.currentCardStage === 5;
  const searchValue = values.search;
  const rListingSearch = listingReducer.works.search;


  const handleChange = config => {
    const { e, type } = config;
    const targetValue = e.target.value;
    const typeList = ['sort', 'search'];
    const realTimeList = ['type'];

    if (typeList.indexOf(type) !== -1) {
      setValues(draft => {
        draft.search[type] = targetValue;
      });
    }
    if (realTimeList.indexOf(type) !== -1) {
      setValues(draft => {
        draft.search.sort = '1';
        draft.search.search = "";
        draft.search.first = true;
        draft.search[type] = targetValue;
      });
    }
  }
  const handleKeyUp = config => {
    const { e } = config;
    if (e.key === 'Enter') {
      onSearch && onSearch(values.search)
    }
  }

  const handleSumbit = _.debounce(config => {
    onSearch && onSearch({ ...values.search, first: true })
  }, 200)


  const handleClick = _.debounce(config => {
    const { type } = config;
    if (type === 'refresh') {
      setValues(draft => {
        draft.refresh.active = true;
      });
    }
    onClick && onClick({ type, value: values.search });
  }, 200);

  // NOTE: listing search 하는데 Redux에 search 데이터 있을때 내부 스테이트 업데이트,
  useEffect(() => {
    // useDidUpdateEffect(()=>
    if (rListingSearch.search) {
      setValues(draft => {
        draft.search = rListingSearch;
      })
    }
    setValues(draft => {
      draft.refresh.active = false;
    });
  }, [rListingSearch]);

  useEffect(() => {
    if(typeSelectRef.current === document.activeElement){
      onSearch && onSearch(values.search);
    }
  }, [values.search.type]);


  const deleteAble = isTypeSender && !isCompleteCard;
  return (
    <Styled.WorksSearch>
      <div className="WorksSearch__row">
        <div className="WorksSearch__search_box">
          <select
            name="case"
            className="WorksSearch__select"
            value={searchValue.sort}
            onChange={(e) => handleChange({ type: 'sort', e })}>
            <option value="1">Patient Name</option>
            <option value="2">{mapper.sender} Name</option>
            <option value="3">{mapper.receiver} Name</option>
            <option value="4">Case Id</option>
          </select>
          <input
            type="text"
            className="WorksSearch__input"
            value={searchValue.search}
            onKeyUp={(e) => handleKeyUp({ type: "search", e })}
            onChange={(e) => handleChange({ type: "search", e })}
          />
          <button className="WorksSearch__btn" onClick={handleSumbit}>Seach</button>
        </div>

        <WorksFilter
          className="WorksSearch__btn"
          content="Filter Test"
          // popover={<div>Hello</div>}
        />

        <div className="WorksSearch__sort_box">
          <select
            ref={typeSelectRef}
            name="case"
            className="WorksSearch__select type"
            value={searchValue.type}
            onChange={(e) => handleChange({ type: 'type', e })}>
            <option value="">All</option>
            <option value="sender">{mapper.sender}</option>
            <option value="receiver">{mapper.receiver}</option>
          </select>
          <button
            className={cx("WorksSearch__btn", "load")}
            onClick={(e) => handleClick({ type: "load", e })}>
            Load
          </button>
          <button
            className={cx("WorksSearch__btn", "hidden")}
            onClick={(e) => handleClick({ type: "hide", e })}>
            HIDDEN
          </button>

          <span className={cx("WorkSearch__btn_box", { disabled: !deleteAble })}>
            <button
              disabled={!deleteAble}
              className={cx("WorksSearch__btn", "delete")}
              onClick={(e) => handleClick({ type: "delete", e })}>DELETE</button>
          </span>

          <button
            className={cx(`WorksSearch__refresh_btn`, { active: values.refresh.active })}
            onClick={(e) => handleClick({ type: "refresh", e })}
          ><CachedIcon style={{ fontSize: 30 }} /></button>
        </div>
      </div>

    </Styled.WorksSearch>
  );
}


const Styled = {
  WorksSearch: styled.div`
  &  {
    .WorkSearch__btn_box{
      position:relative;
      top: 9px;
      display:inline-block;
      /* width:0; */
      /* transition:.5s; */
      overflow:hidden;
      &.isShow{
        width:70px;
      }
      &.disabled{
        opacity:.5;
        pointer-events: none;
      }
    }
    .WorksSearch__row{
      position: relative;
    }

    .WorksSearch__search_box{
      display: inline-block;
      margin-bottom: 15px;
    }

    .WorksSearch__sort_box{
      position: absolute;
      top: -10px;
      right: 0;
      display: inline-block;
    }

    .WorksSearch__select,
    .WorksSearch__input {
      padding: 3px;
      border: 1px solid ${color.gray_font};
      border-radius: 2px;
      ${font(14, color.gray_font)};
      margin-right: 5px;
    }

    .WorksSearch__input {
      padding: 4px;
    }
    .WorksSearch__btn {
      text-transform: uppercase;
      padding: 5px 10px;
      background: ${color.blue};
      ${font(14, color.white)};
      border-radius: 2px;
      margin-right: 5px;
      border: none;
      cursor: pointer;
      transition: all .2s;

      &:hover{
        background: ${color.blue_hover};
      }
      &.isShow{
        visibility:visible;
      }
      &.delete {
        text-transform: none;
      }
    }

    .WorksSearch__refresh_btn{
      position: relative;
      top: 8px;
      border: none;
      background: none;
      color: ${color.blue};
      cursor: pointer;
      transition: all .2s;
      outline:none;
      &:hover{
        color: ${color.blue_hover};
      }
      &.active{
        transform:rotate(-360deg);
        transition:.7s;
      }
    }
  }

  
  `
}

export default WorksSearch;


{/* {isTypeSender &&
  <button 
  className={cx("WorksSearch__btn", "delete")} 
  onClick={(e)=>handleClick({type:"delete",e})}>DELETE</button>
} */}


// useEffect(() => {
  // const defaultConfig = {
  //   sort: +searchValue.sort,
  //   search: searchValue.search,
  //   type: searchValue.type,
  //   first: true
  // };

  // if(!listingReducer.works.search.isLoad){
  //   // onSearch && onSearch(defaultConfig);
  // }
// }, []);
