import React, { useEffect,useRef, useCallback } from 'react';
import styled from 'styled-components';
import { color, font, buttonBlue, dotdotdot } from 'styles/__utils';
import { useImmer } from 'use-immer';
import Button from '@material-ui/core/Button';
import { PlainModal, ModalPartner } from 'components/common/modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { PartnersList } from 'components/common/listing';
import { PartnersSearch } from 'components/common/search';
import { useSelector } from 'react-redux';
// import Core from 'containers/base/Core';

import {
  LISTING_PARTNERS_SEARCH_SAGAS,
  LISTING_MY_PARTNERS_SAGAS,
  // INFO_PARTNERS_MODAL_INFO_SAGAS,
  INFO_INFORMATION_SAGAS,
  // LISTING_PARTNERS_INFO_SAGAS,
  // LISTING_PARTNERS_INFO
} from 'store/actions';
import InfiniteScroll from "react-infinite-scroll-component";

// import { makeStyles } from '@material-ui/core/styles';
// import { LoadingCircle } from 'components/base/loading'
// import { InfiniteScroll } from 'components/base/scroll';

/**
 * 
 * @param {*} props 
 * {
 *  selectCompany function //select change value function
 *  onSubmit function // inner submit button function
 *  option string ['my'] // my partner list
 *  styleConf object { searchDivtype string ['row'] , radioExist: boolean, buttonExist: boolean, tableHeight: int }
 *  selectOption string ['onlySelect'] // row item 클릭시 select만 선택, 없을시 info popup
 * } 
 */


function PartnerListSearchForm(props) {
  const {
    auth: authReducer,
    listing: listingReducer,
    mypage: mypageReducer,
    // info: infoReducer,
  } = useSelector(state => state);
  const infinoteRef = useRef();
  const {myinfo} = mypageReducer;
  const { partners, myPartners, partnersAdd, partnersDelete, partnersType:{list:typeList} } = listingReducer;
  const { list: partnersList } = partners;
  const { list: myPartnerList} = myPartners;
  let hasMore = false, listMax = 100;
  let loadConfig = {};

  if(props.option === 'my'){
    if (myPartnerList.length < listMax){
      // console.log("DEBUG ISEND!!!", myPartners.isEnd);
      if (myPartners.isEnd){
        hasMore = false;
      }else{
        hasMore = true;
      }  
    }
  // 무한 스크롤시 요청 data form
  loadConfig = {
      userCode: authReducer.signIn.profile.userCode,
      page: myPartners.page,
      codeType : myPartners.codeType,
      type : myPartners.type,
      keyword : myPartners.keyword,
    }
  }else{
    if (partnersList.length < listMax){
      // console.log("DEBUG ISEND!!!", partners.isEnd);
      if(partners.isEnd){
        hasMore = false;
      }else{
        hasMore = true;
      }
    } 
  // 무한 스크롤시 요청 data form
  loadConfig = {
      userCode: authReducer.signIn.profile.userCode,
      page: partners.page,
      codeType : partners.codeType,
      type : partners.type,
      keyword : partners.keyword,
    }
  }
  // console.log("DBDFDFD", loadConfig);

  const initImmer = {
    searchCheckbox: {
      value: "1"
    },
    companySelected: {
      value: '',
      // value: props.option === 'my'? myinfo.info.partnerInfo.code : ''
      // value: authReducer.signIn.profile.pCode? authReducer.signIn.profile.pCode : ''
    },
    partnerList:[],
    partnerModal: false,
    clickModal: false,
    partnerModalInfo: null,
    pCode: authReducer.signIn.profile.pCode? authReducer.signIn.profile.pCode : '',
    viewPartnerList: props.option === 'my'? true : false,
  }
  const [values, setValues] = useImmer(initImmer);

  const { searchCheckbox, companySelected } = values;
  const styleConf = props.styleConf ? props.styleConf : null;

  const handleChange = useCallback((value) => e => {
    const targetValue = e.target.value;
    // 고유번호, 업체명 셀렉
    if (value === 'searchCheckbox') {
      setValues(draft => {
        draft.searchCheckbox.value = targetValue;
      })
    }
  },[setValues]);

  // 모달 dim 클릭 관리, info 모달 관리
  const handleModal = useCallback(config => {
    const {
      type,
      value
    } = config;
    if(type === 'modalGetInfo'){
      // console.log("modal get info", value);
      setValues(draft => {
        draft.clickModal = true;
      });
      const conf = {
        userCode: value,
      }
      INFO_INFORMATION_SAGAS(conf);
    }else if(type === 'dim'){
      setValues(draft => {
        draft.partnerModal = false;
        draft.clickModal = false;
      });
    }
  },[setValues]);

  // 클릭 이벤트 관리
  const handleClick = useCallback(config => e => {
    const { type } = config;
    if (type === 'selected') {
      if (e.component === "PartnersList") {
        // console.log("SDFSDFSDFSDF", e);
        setValues(draft => {
          draft.companySelected = e;
        })
      }
    }

    if (type === 'change') {
      props.onSubmit && props.onSubmit(values);
    }
  },[values.companySelected]);
  // const loadConfig = {
  //   userCode: authReducer.signIn.profile.userCode,
  //   page: partners.page
  // }

 
  // Partners List Search Submit
  const onSubmit = useCallback((config) => {
    let searchConfig = {
      // userCode: "20Jan31-0000",
    userCode: authReducer.signIn.profile.userCode,
      page: 1,
      codeType : 1,
      type : config.selectedType,
      keyword : config.keyword,
      first:true
    }
    // console.log("DEBUG @@@@", searchConfig);
    infinoteRef.current.el.scrollTo(0,0);
    if(props.option === 'my'){
      LISTING_MY_PARTNERS_SAGAS(searchConfig);
    }else{
      searchConfig.codeType = values.searchCheckbox.value;
      LISTING_PARTNERS_SEARCH_SAGAS(searchConfig);
      setValues(draft => {
        draft.viewPartnerList = true;
      })
    }
  },[props.option, values.searchCheckbox]);

  // my info 정보 가져왔을때
  useEffect(() => {
    if(myinfo.success){
      //모달이 필요할때
      if(values.clickModal){
        setValues(draft => {
          draft.partnerModal = true;
          draft.partnerModalInfo = myinfo.partnerInfo;
        });  
      }else{
        //정보만 가져올때
        setValues(draft => {
          draft.pCode = myinfo.userInfo.partnerInfo ? myinfo.userInfo.partnerInfo.code : null;
        });
      }
    }
  }, [myinfo.success]);

  //파트너 추가했을때
  useEffect(() => {
    if(partnersAdd.success){
      INFO_INFORMATION_SAGAS({userCode: authReducer.signIn.profile.userCode, option: 'loginUser'});
    }
    if(partnersDelete.success){
      if(props.option === 'my'){
        let initConfig = {
          userCode: authReducer.signIn.profile.userCode,
          page: 1,
          codeType : 1,
          type : 0,
          keyword : "",
          first: true
        }
        LISTING_MY_PARTNERS_SAGAS(initConfig);
      }
    }
  },[partnersAdd.success, partnersDelete.success]);


  //페이지 렌더링 됐을때
  useEffect(() => {
    let initConfig = {
      // userCode: "20Jan31-0000",
      userCode: authReducer.signIn.profile.userCode,
      page: 1,
      codeType : 1,
      type : 0,
      keyword : "",
      first: true
    }
    INFO_INFORMATION_SAGAS({userCode: authReducer.signIn.profile.userCode, option: 'loginUser'});
    // 내 파트너 정보를 가져올떄
    if(props.option === 'my'){
      LISTING_MY_PARTNERS_SAGAS(initConfig);
    }else{
      //파트너 리스트를 가져올때
      LISTING_PARTNERS_SEARCH_SAGAS(initConfig);
    }
    setValues(draft => {
      draft.partnerModal = false;
    });
  }, []);

  //내 파트너 리스트 가져왔을때
  useEffect(() => {
    if(props.option==='my' && myPartners.success){
      //파트너 리스트가 있을때 내 파트너의 radio 체크 설정
      if(myPartnerList.length > 0){
        // console.log("DEBUG myinfo.userInfo baseItem", myinfo.userInfo);
        let baseItem = myPartnerList.filter(i => {
          return i.info.userCode === (myinfo.userInfo.partnerInfo ? myinfo.userInfo.partnerInfo.code : '');
        })[0];
        // console.log("DEBUG SEARCHFORM baseItem", baseItem);
        setValues(draft => {
          draft.companySelected = baseItem ? baseItem.info : '';
          draft.companySelected = {...draft.companySelected, value: draft.companySelected.userCode? draft.companySelected.userCode : ''}
        });
      }
      console.log("MY", myPartnerList);
      setValues(draft => {
        draft.partnerList = myPartnerList;
      });

      props.routeHistory && props.routeHistory();
    }    
  }, [myPartners.success]);

  useEffect(() => {
    if(!(props.option==='my') && partners.success){
      setValues(draft => {
        draft.partnerList = partnersList;
      });
    }
  }, [partners.success])

  // radio 체크 됐을때
  useEffect(() => {
    if(values.companySelected){
      props.selectCompany && props.selectCompany(values.companySelected);
    }
  }, [values.companySelected])
  return (
    <Styled.PartnerListSearchForm>
       <div className="row_box">
        <div className={`partenrs__row ${props.styleConf ? props.styleConf.searchDivtype: '' } radio_box`}>
        {
        styleConf && !styleConf.radioExist?
        null
        :
          <RadioGroup 
            aria-label="position"
            name="position"
            value={searchCheckbox.value}
            onChange={handleChange(`searchCheckbox`)} row>
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
          }
        </div>

      <div className={`partenrs__row ${props.styleConf ? props.styleConf.searchDivtype: ''} search_box`}>
        <PartnersSearch
          onSubmit={onSubmit}
        />
      </div>
      </div>

      <div className={`partenrs__row partnesr_list ${values.viewPartnerList? 'show' : 'hidden'}`}>
        <InfiniteScroll
          {...props}
          ref={infinoteRef}
          next={() => props.option==='my'? LISTING_MY_PARTNERS_SAGAS(loadConfig): LISTING_PARTNERS_SEARCH_SAGAS(loadConfig) }
          height={styleConf && styleConf.tableHeihgt ? styleConf.tableHeihgt: 350}
          dataLength={props.option==='my'? myPartnerList.length : partnersList.length}
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
                  {
                    props.option==='my'?
                    (
                      myPartnerList.length?
                      (
                        myPartnerList.length <= listMax?
                        ''
                        :
                        `리스트는 ${listMax} 까지만 보여집니다.`
                      )
                      :
                      `리스트가 없습니다.`
                    )
                    :
                    (
                      partnersList.length?
                      (
                        partnersList.length <= listMax?
                        ''
                        :
                        `리스트는 ${listMax} 까지만 보여집니다.`
                      )
                      :
                      `리스트가 없습니다.`
                    )
                  }
                  
                </p>
              </div>
          }
        >
        <PartnersList
          list={values.partnerList}
          // list={props.option === 'my'? myPartnerList : partnersList}
          info={companySelected}
          typeList={typeList}
          option={props.option}
          selectOption={props.selectOption}
          pCode={values.pCode}
          // pCode={authReducer.signIn.profile.pCode}
          onClick={(result) => handleClick({ type: "selected" })(result)}
          handleModal={handleModal}
        />
        </InfiniteScroll>
        
        <PlainModal 
          isOpen={!!values.partnerModal}
          onClick={() => handleModal({type: 'dim'})}
          content={<ModalPartner 
                    modalInfo={values.partnerModalInfo}
                    />}
          width={680}
        />
      </div>

      {
        styleConf && !styleConf.buttonExist?
        null
        :
        <div className="partenrs__row">
          <div className="list__btn_box">
            <Button
              onClick={handleClick({ type: "change" })}
              variant="contained"
              className="partnerss__btn"
              component="span">CHANGE</Button>
          </div>
        </div>
      }

    </Styled.PartnerListSearchForm>
  );
}

const Styled = {
  PartnerListSearchForm: styled.div`
  .partnesr_list{
      &.show{
        display: block;
      }
      &.hidden{
        display: none;
      }
    }

  .row_box{
    width: 100%;
    position: relative;
    margin-bottom: 10px;
    display: flex;
    /* flex-flow: column nowrap; */
    height: 40px;

    .partenrs__row{
      display: flex;
      flex-flow: column nowrap;
      margin-top: 10px;

      &.search_box{
        width: 70%;
        position: absolute;
        right: 5px;
        &.companyList{
          width: 100% 
        }
      }
    }
  }

    & .rowMode{
      display: inline-block;
      vertical-align: middle;
    }

    .partenrs__column{
      display: flex;
      margin-bottom: 10px;
    }
    .list__control .MuiFormGroup-root{
      flex-wrap:nowrap;
    }

    .MuiSelect-outlined.MuiSelect-outlined{
      padding:10px;
      font-size: 14px;
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
      height:50px;
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
      color: ${color.blue};
    }
    .MuiRadio-colorPrimary.Mui-checked{
      color: ${color.blue};
    }
  `
}

export default React.memo(PartnerListSearchForm);



{/* {isSearchSaga ?
  <InfiniteScroll
  type={1}
    maxDataLength={100}
    dataLength={partnersList.length}
    next={()=>LISTING_PARTNERS_SEARCH_SAGAS(loadConfig)}
    unMount={LISTING_PARTNERS_INFO.init}
    height={425}
  >
    <PartnersList
      list={partnersList}
      info={companySelected}
      onClick={(result) => handleClick({ type: "selected" })(result)}
    />
    <br />
  </InfiniteScroll>
  :
  <InfiniteScroll
    type={2}
    maxDataLength={100}
    dataLength={partnersList.length}
    next={()=> LISTING_PARTNERS_INFO_SAGAS(loadConfig)}
    unMount={LISTING_PARTNERS_INFO.init}
    height={425}
  >
    <PartnersList
      list={partnersList}
      info={companySelected}
      onClick={(result) => handleClick({ type: "selected" })(result)}
    />
    <br />
  </InfiniteScroll>
} */}