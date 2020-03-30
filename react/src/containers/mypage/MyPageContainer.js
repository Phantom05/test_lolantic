import React, {useEffect, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useImmer} from 'use-immer';
import {regEmail} from 'lib/library';
import {useDidUpdateEffect} from 'lib/utils';
import { PlainModal,ModalComplete, ModalPasswordChange } from 'components/common/modal';
import {ModalSendVerifyCode} from 'components/common/modal';
import {withRouter} from 'react-router-dom';

import {TabBar} from 'components/common/tab';
import {
  // LISTING_COUNTRY_SAGAS,
  LISTING_LOCATION_SAGAS,
  INFO_INFORMATION_SAGAS,
  INFO_PARTNERS_SAGAS, //파트너 정보
  // LISTING_PARTNERS_INFO_SAGAS,
  LISTING_MY_PARTNERS_SAGAS,
  LISTING_PARTNERS_SEARCH_SAGAS,
  LISTING_PARTNERS_MY_ADD_SAGAS, //파트너 추가
  LISTING_PARTNERS_MY_DEFAULT_ADD_SAGAS, // 기본 파트너 설정
  LISTING_PARTNERS_MY_DELETE_SAGAS, // 파트너 삭제
  INFO_UPDATE_MY_OPTION_SAGAS,
  // AUTH_VERIFY_EMAIL_SAGAS,
  // AUTH_VERIFY_CODE_SAGAS,

} from 'store/actions';

function MyPageContainer (props) {
  const {auth: signReducer, mypage: mypageReducer, listing: listingReducer} = useSelector(state => state);
  const [values, setValues] = useImmer({
    pending: {
      getInfoResult: false,
      getPartnerResult: false,
    },
    myinfo: {},
    viewModify: false,
    infoPartners: {},
    partner:{
      title:'',
      id:''
    },
    country: {
      current: "",
      list: []
    },
    city: {
      current: "",
      list: []
    },
    modal: {
      current:null,
      update: false,
      disUpdate: false,
      add: false,
      option: false,
      needData: false,
      workSpace: false,
      failProfile: false,
      addOverlap: false,
      partnersDelete: false,
      passwordChange: false,
    },
    partnersAdd: false,
  });

  const {
    // modal,
    country,
    city
  } = values;

  const {
    myinfo,
    infoPartners,
  } = mypageReducer;

  const {
    partnersAdd,
    partnersDelete
  } = listingReducer;

  let {
    userCode
  } = signReducer.signIn.profile;


  const handleSubmit = useCallback(value =>config=>{
    // 파트너 변경 요청 이벤트 발생시 정보를 container에 가져옴
    if(value === 'changePartner'){
      const changeInfo = config.companySelected;
      setValues(draft=>{
        draft.partner.title =changeInfo.company;
        draft.partner.id = changeInfo.value;
      });
    }
  },[]);

 // 클릭 이벤트 관리
  const handleClick = useCallback(config => e=>{
    
    const {
      type,
      option,
      value,
      view
    } = config;
    
    const searchConf = {
      userCode: userCode,
      keyword: '',
      codeType: 1,
      type: 0,
      page: 1,
      first: true,
    }
    // mypage에서 수정 페이지 이동을 관리하는 이벤트
    if(type==='viewModify'){
      if(view){
        setValues(draft => {
          draft.viewModify = view ==='true' ? true : false;
          draft.modal.update = false;
          draft.modal.current = null;
        });
      }else{
        setValues(draft => {
        draft.viewModify = !values.viewModify;
          draft.modal.update = false;
          draft.modal.current = null;
        })
      }
    }
    
    //  파트너 리스트 요청 클릭 이벤트
    if(type==='getPartner'){
      LISTING_PARTNERS_SEARCH_SAGAS(searchConf);
    }

    // 내 파트너 리스트 요청 클릭 이벤트
    if(type==='getMyPartner'){
      LISTING_MY_PARTNERS_SAGAS(searchConf);
    }

    // 파트너 추가 요청 클릭 이벤트
    if(type==='addPartner'){
      let payload;
      if(value){
        payload = {
          userCode: userCode,
          partnerCode: value,
        }
        
        // 기본 파트너 설정 요청시
        if(option === 'default'){
          LISTING_PARTNERS_MY_DEFAULT_ADD_SAGAS(payload);
        }else{
          // 파트너 추가 요청시
          LISTING_PARTNERS_MY_ADD_SAGAS(payload);
        }
      }else{
        // console.log("Do to select partner list");
      }
      
    }

    if(type==='passwordChange'){
      openModal('passwordChange');
    }

    // 파트너 삭제 요청 클릭 이벤트
    if(type==='deletePartner'){
      let payload;
      if(value){
        payload = {
          userCode: userCode,
          partnerCode: value
        }
        // 파트너 삭제 요청시
        LISTING_PARTNERS_MY_DELETE_SAGAS(payload);
      }else{
        // console.log("Do to select partner list");
      }
    }
  },[values.viewModify]);

  // 국가, 지역 선택 이벤트 관리
  const onChange = useCallback((config) => {
    const { type, value } = config;
    //국가 선택시 해당 국가의 지역 정보 요청
    if (type === 'country') {
      LISTING_LOCATION_SAGAS(value);
      setValues(draft => {
        draft.country.current = value;
        draft.city.current ="";
      })
    }
    if (type === 'city') {
      setValues(draft => {
        draft.city.current = value;
      })
    }
  },[]);

  // 렌더링시 내 정보 요청
  useEffect(() => {
    INFO_INFORMATION_SAGAS({userCode, option: 'loginUser'});
  },[]);

  // 내정보 변경 성공 여부를 기준으로 내 정보 요청 및 모달 활성화
  useDidUpdateEffect(() =>{
    // console.log("update render", myinfo.update.success);
    if(myinfo.update.success){
      // openModal('update');
      handleClick({type: 'viewModify'})();
    }
    if(myinfo.update.failure){
      openModal('disUpdate');
    }
    INFO_INFORMATION_SAGAS({userCode, option: 'loginUser'});
    // LISTING_COUNTRY_SAGAS();
  }, [myinfo.update]);

  // 파트너 추가 성공시 모달 활성화
  useDidUpdateEffect(() =>{
    // console.log("list add render", partnersAdd.success);
    if(partnersAdd.success){
      openModal('add');
    }
  }, [partnersAdd.success]);
  
  // 파트너 삭제 성공시 모달 활성화
  useDidUpdateEffect(() =>{
    // console.log("list delete render", partnersDelete.success);
    if(partnersDelete.success){
      openModal('partnersDelete');
    }
  }, [partnersDelete.success]);
  
  
  // 파트너 중복 요청시 모달 활성화
  useDidUpdateEffect(() => {
    // console.log("overlap partner add");
    if(partnersAdd.overlap){
      openModal('addOverlap');
    }
  }, [partnersAdd.overlap]);

  // 국가, 지역 정보 세팅
  useEffect(()=>{
    setValues(draft=>{
      draft.country.list = listingReducer.country;
      draft.city.list = listingReducer.location;
    })
  },[listingReducer, setValues]);

  // 내정보 가져올때 펜딩 체크 및 정보 세팅
  useEffect(() => {
    if(mypageReducer.myinfo.success){
      setValues(draft => {
        draft.myinfo = myinfo.userInfo;
        draft.pending.getInfoResult = mypageReducer.myinfo.pending;
    });
    }
    if(mypageReducer.myinfo.pending){
        setValues(draft => {
        draft.pending.getInfoResult = mypageReducer.myinfo.pending;
    });
    }
    
}, [mypageReducer.myinfo]);


// myapge 모달 관리
const openModal = (value, op=null) => {
  // console.log("open modal", value);
  if(value === 'update'){
    setValues(draft=>{
      draft.modal.update = !draft.modal.update;
      draft.modal.current = 'update';
    })
  }
  if(value === 'disUpdate'){
    setValues(draft => {
      draft.modal.disUpdate = !draft.modal.disUpdate;
      draft.modal.current = 'disUpdate';
    })
  }
  if(value === 'add'){
    setValues(draft=>{
      draft.modal.add = !draft.modal.add;
      draft.modal.current = 'add';
    })
  }
  if(value === 'option'){
    setValues(draft=>{
      draft.modal.option = !draft.modal.option;
      draft.modal.current = 'option';
    })
  }
  if(value === 'needData'){
    setValues(draft => {
      draft.modal.needData = !draft.modal.needData;
      draft.modal.current = 'needData';
    })
  }
  if(value === 'failProfile'){
    setValues(draft => {
      draft.modal.failProfile = !draft.modal.failProfile;
      draft.modal.current = 'failProfile';
    })
  }
  if(value === 'addOverlap'){
    setValues(draft => {
      draft.modal.addOverlap = !draft.modal.addOverlap;
      draft.modal.current = 'addOverlap';
    })
  }
  if(value === 'partnersDelete'){
    setValues(draft => {
      draft.modal.partnersDelete = !draft.modal.partnersDelete;
      draft.modal.current = 'partnersDelete';
    })
  }
  if(value === 'passwordChange'){
    setValues(draft => {
      draft.modal.passwordChange = !draft.modal.passwordChange;
      draft.modal.current = 'passwordChange';
    })
  }
  
  if(op === false){
    setValues(draft => {
      draft.modal[value] = false;
    })
  }
  if(op === true){
    setValues(draft => {
      draft.modal[value] = true;
    })
  }
  
}

const routeHistory = page => {
  props.history.push(`/mypage/${page}`);
}

const typeModalCurrent = values.modal.current;
const typeModalBool = !!values.modal[typeModalCurrent];
const fnOpenModal = (op)=>openModal( typeModalCurrent , op);

const modalObj={
  'update':<ModalComplete onClick={fnOpenModal} onClick={handleClick({type: 'viewModify'})} children="업데이트 성공"/>,
  'add':<ModalComplete onClick={fnOpenModal} title="업체 등록" children="업체를 등록했습니다."/>,
  'option':<ModalComplete onClick={fnOpenModal} title="옵션 변경" children="옵션을 변경했습니다."/>,
  'disUpdate': <ModalComplete onClick={fnOpenModal} title="업데이트 실패" children="업데이트를 실패했습니다."/>,
  'needData': <ModalComplete onClick={fnOpenModal} title="업데이트 실패" children="값을 모두 채워 주세요"/>,
  'failProfile': <ModalComplete onClick={fnOpenModal} title="업데이트 실패" children="프로필 업로드에 실패했습니다."/>,
  'addOverlap': <ModalComplete onClick={fnOpenModal} title="파트너 추가 완료" children="이미 등록된 파트너를 추가요청 하셨습니다."/>,
  'partnersDelete': <ModalComplete onClick={fnOpenModal} title="업체 삭제" children="업체를 삭제 했습니다."/>,
  'passwordChange': <ModalPasswordChange onClick={fnOpenModal} title="패스워드 변경하기" />
};
const modalContent = modalObj[typeModalCurrent];


  return (
    <div>
      <TabBar 
        initData={values}
        pending={values.pending}
        countryData={country}
        cityData={city}
        onChange={onChange}
        onSubmit={handleSubmit}
        handleClick={handleClick}
        userCode={userCode}
        openModal={openModal}
        routeHistory={routeHistory}
        matchUrl={props.location.pathname}
      /> 

      <PlainModal
        isOpen={typeModalBool}
        content={modalContent}
        onClick={fnOpenModal}
        width={typeModalCurrent === 'passwordChange'? 600 : null}
        dim={false}
      />
    </div>
  );
}

export default withRouter(MyPageContainer) ;