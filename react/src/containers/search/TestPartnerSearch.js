import React, { useEffect,useRef } from 'react';
import styled from 'styled-components';
import { color, font, buttonBlue, dotdotdot } from 'styles/__utils';
import { useImmer } from 'use-immer';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { PartnersList } from 'components/common/listing';
import { PartnersSearch } from 'components/common/search';
import { useSelector } from 'react-redux';
import {
  LISTING_PARTNERS_SEARCH_SAGAS,
  // LISTING_PARTNERS_INFO
} from 'store/actions';

import InfiniteScroll from "react-infinite-scroll-component";

function PartnerListSearchForm(props) {
  const {
    auth: authReducer,
    listing: listingReducer,
  } = useSelector(state => state);
  const infinoteRef = useRef();

  const { partners, partnersType:{list:typeList} } = listingReducer;
  const { list: partnersList,pending } = partners;
  let hasMore = true, listMax = 100;
  if (partnersList.length > listMax) hasMore = false;
  const [values, setValues] = useImmer({
    searchRadioBox: {
      value: "1"
    },
    companySelected: {
      value: ""
    },
    partnerList:[],
    reset:false,
    search:{
      userCode: '',
      page: 1,
      codeType : '',
      type : '',
      keyword : '',
      first:''
    }
  });

  
  useEffect(()=>{

  },[]);

  const {onSearch} = props;
  const { searchRadioBox, companySelected } = values;

  const loadConfig = {
    userCode: authReducer.signIn.profile.userCode,
    page: partners.page,
    codeType : partners.codeType,
    type : partners.type,
    keyword : partners.keyword,
  }
  
  // 고유번호, 업체명 셀렉
  const handleChange = (config) => e => {
    const targetValue = e && e.target.value;
    if (config === 'searchRadioBox') {
      setValues(draft => {
        draft.searchRadioBox.value = targetValue;
      })
    }
  };

  // 아이템 클릭, change버튼 클릭
  const handleClick = config => e => {
    const { type } = config;
    console.log(config,'click');
    if (type === 'selected') {
      if (e.component === "PartnersList") {
        setValues(draft => {
          draft.companySelected = e;
        })
      }
    }

    if (type === 'change') {
      // props.onSubmit && props.onSubmit(values);
    }
  };

  // Partners List Search Submit
  const onSubmit = (config) => {
    const searchConfig = {
      userCode: props.userCode,
      page: props.page,
      codeType : values.searchRadioBox.value,
      type : config && config.selectedType,
      keyword : config && config.keyword,
      first:true
    }
    onSearch(searchConfig);
  };

  useEffect(()=>{
    if(values.reset === true){
      infinoteRef.current.el.scrollTo(0,0);
      setValues(draft=>{
        draft.reset = false
      })
    }
  },[values.reset]);

  useEffect(()=>{
    onSubmit()
  },[]);

  console.log('ren p');

  return (
    <Styled.PartnerListSearchForm searchDivtype={props.searchDivtype}>
        <div className="partenrs__row">
        <RadioGroup 
            aria-label="position"
            name="position"
            value={searchRadioBox.value}
            onChange={handleChange(`searchRadioBox`)} row>
            <FormControlLabel
              value="1"
              control={<Radio color="primary" size="small" />}
              label={<span className="signup__input public text">고유번호</span>}
              labelPlacement="end"
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" size="small" />}
              label={<span className="signup__input public text">업체명</span>}
              labelPlacement="end"
            />
          </RadioGroup>
          <PartnersSearch
            onSubmit={onSubmit}
          />
        </div>
      <div className="partenrs__row">
        <InfiniteScroll
          {...props}
          ref={infinoteRef}
          next={() =>  LISTING_PARTNERS_SEARCH_SAGAS(loadConfig) }
          dataLength={partnersList.length}
          hasMore={hasMore}
          loader={
            <div className="align__center">
              <p className="cassload__loading">
                Loading..
            </p>
            </div>
          }
          endMessage={
            <div className="align__center">
              <p className="cassload__info">
                리스트는 {listMax} 까지만 보여집니다.
              </p>
            </div>
          }
        >
        <PartnersList
          list={partnersList}
          info={companySelected}
          typeList={typeList}
          onClick={(result) => handleClick({ type: "selected" })(result)}
        />
        </InfiniteScroll>
      </div>

      <div className="partenrs__row">
          <div className="list__btn_box">
            <Button
              onClick={handleClick({ type: "change" })}
              variant="contained"
              className="partnerss__btn"
              component="span">CHANGE</Button>
          </div>
        </div>

    </Styled.PartnerListSearchForm>
  );
}

const Styled = {
  PartnerListSearchForm: styled.div`
    .partenrs__row{
      display: flex;
      flex-flow: column nowrap;
      margin-bottom:10px;
    }
    .partenrs__column{
      display: flex;
      margin-bottom: 10px;
    }
    .list__control .MuiFormGroup-root{
      flex-wrap:nowrap;
    }

    .list__control{
      /* height:400px;
      overflow:auto; */
    }

    .MuiSelect-outlined.MuiSelect-outlined{
      padding:10px ;
    }
    .partnerss__btn{
      ${buttonBlue};
      box-shadow:none;
      &:hover{
        box-shadow:none;
      }
    }
    .list__box_tx{
      &.tx{
        padding:0 5px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        ${font(14, color.black_font)};
        ${dotdotdot};
        width:100%;
      }
      &.bold{
        font-weight:600;
      }
    }
    .list__box_item{
      position:relative;
      height:40px;
      border-right:1px solid ${color.gray_border6};
      text-align:center;
      &:last-child{
        border-right:0;
      }
      &.th{
        background:${color.gray_bg1};
      }
      &.td{

      }
    }
    .list__btn_box{
      /* border-top:1px solid ${color.gray_border6}; */
      text-align:right;
      padding-top:15px;
    }
    .cassload__info,.cassload__loading{
      ${font(14)};
      text-align:center;
      margin-top:10px;
    }
    .columnWide{
      color: blue;
    }
    .MuiRadio-colorPrimary.Mui-checked{
      color: ${color.blue};
    }
  `
}

export default PartnerListSearchForm;

