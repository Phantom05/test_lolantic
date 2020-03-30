
import {all, takeEvery,call} from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/utils';
import { AlertFn} from 'lib/library';
import {
  LISTING_COUNTRY_SAGAS,
  LISTING_LOCATION_SAGAS,
  LISTING_CASE_LOAD_SAGAS,
  LISTING_PARTNERS_INFO_SAGAS,
  LISTING_PARTNERS_MY_ADD_SAGAS,
  LISTING_PARTNERS_MY_DELETE_SAGAS,
  LISTING_PARTNERS_MY_DEFAULT_ADD_SAGAS,
  LISTING_PARTNERS_SEARCH_SAGAS,
  LISTING_MY_PARTNERS_SAGAS,
  LISTING_PARTNERS_TYPE_SAGAS,
  LISTING_TEST_SAGAS,
  LISTING_WORKS_SEARCH_SAGAS,
  MESSAGE_LIST_SAGAS,
  MESSAGE_LIST_DELETE_SAGAS,
  MESSAGE_LIST_DELETE_ALL_SAGAS,
  MESSAGE_LIST_READ_SAGAS,
  LISTING_TEST_LIST_SAGAS,
  LISTING_WORKS_GET_LIST_UPDATE_SAGAS,
  // LISTING_PARTNERS_SEARCH
} from 'store/actions';


/**
 * get country list
 * @param {*} param0 
 */
const handleGetCountryList= createPromiseSaga({
  type:LISTING_COUNTRY_SAGAS,
  tag:'handleGetCountryList',
});

/**
 * get location list
 * @param {*} param0 
 */
const handleGetLocationList= createPromiseSaga({
  type:LISTING_LOCATION_SAGAS,
  tag:'handleGetLocationList',
});

/**
 * get case load list
 * @param {*} param0 
 */
const handleGetCaseLoadList= createPromiseSaga({
  type:LISTING_CASE_LOAD_SAGAS,
  tag:'handleGetCaseLoadList',
});

/**
 * 웍스 서치 리스트
 * @param {*} param0 
 */
const handleGetWorksSearchList= createPromiseSaga({
  type:LISTING_WORKS_SEARCH_SAGAS,
  tag:'handleGetWorksSearchList',
});
/**
 * 웍스 리스트
 * @param {*} param0 
 */
const handleWorksGetList= createPromiseSaga({
  type:LISTING_WORKS_GET_LIST_UPDATE_SAGAS,
  tag:'handleWorksGetList',
});


/**
 * 
 * @param {*} param0 
 */
const handleGetPartnersList = createPromiseSaga({
  type:LISTING_PARTNERS_INFO_SAGAS,
  tag:'handleGetPartnersList',
});


/**
 * 파트너 추가
 * @param {*} param0 
 */
const handleAddMyPartnersList = createPromiseSaga({
  type:LISTING_PARTNERS_MY_ADD_SAGAS,
  tag:'handleAddMyPartnersList',
});

/**
 * 기본 파트너 추가
 * @param {*} param0 
 */
const handleAddDefaultMyPartnersList = createPromiseSaga({
  type:LISTING_PARTNERS_MY_DEFAULT_ADD_SAGAS,
  tag:'handleAddDefaultMyPartnersList',
});

/**
 * 내 파트너 삭제
 * @param {*} param0 
 */
const handleDeleteMyPartnersList = createPromiseSaga({
  type:LISTING_PARTNERS_MY_DELETE_SAGAS,
  tag:'handleDeleteMyPartnersList',
});

/**
 * 파트너 검색
 * @param {*} param0 
 */
const handleGetPartnersSearchList = createPromiseSaga({
  type:LISTING_PARTNERS_SEARCH_SAGAS,
  tag:'handleGetPartnersSearchList',
});

/**
 * 내 파트너 검색
 * @param {*} param0 
 * createPromiseSaga 적용 불가 payload의 정보를 redux에서 사용
 */
const handleGetMyPartnersList = createPromiseSaga({
  type:LISTING_MY_PARTNERS_SAGAS,
  tag:'handleGetMyPartnersList',
});

/**
 *  
 * @param {*} param0 
 */
const handleGetPartnersTypeList = createPromiseSaga({
  type:LISTING_PARTNERS_TYPE_SAGAS,
  tag:'handleGetPartnersTypeList',
});

/**
 * Message list
 * @param {*} param0 
 */
function* handleMessageList({payload}){
  MESSAGE_LIST_SAGAS.pending();
  const {data, error} = yield call(MESSAGE_LIST_SAGAS.request, payload);
  if(data && !error){
    MESSAGE_LIST_SAGAS.success(data);
  }else{
    MESSAGE_LIST_SAGAS.failure(data);
  }
}

/**
 * Message list delete
 * @param {*} param0 
 */
function* handleMessageListDelete({payload}){
  MESSAGE_LIST_DELETE_SAGAS.pending();
  const {data, error} = yield call(MESSAGE_LIST_DELETE_SAGAS.request, payload);
  if(data && !error){
    MESSAGE_LIST_DELETE_SAGAS.success(data);
  }else{
    MESSAGE_LIST_DELETE_SAGAS.failure(data);
  }
}

/**
 * Message list delete all
 * @param {*} param0 
 */
function* handleMessageListDeleteAll({payload}){
  MESSAGE_LIST_DELETE_ALL_SAGAS.pending();
  const {data, error} = yield call(MESSAGE_LIST_DELETE_ALL_SAGAS.request, payload);
  if(data && !error){
    MESSAGE_LIST_DELETE_ALL_SAGAS.success(data);
  }else{
    MESSAGE_LIST_DELETE_ALL_SAGAS.failure(data);
  }
}


/**
 * message read
 * @param {*} param0 
 */
function* handleReadMessage({payload}){
  AlertFn(handleReadMessage.name);
  MESSAGE_LIST_READ_SAGAS.pending();
  const {data, error} = yield call(MESSAGE_LIST_READ_SAGAS.request, payload);
  if(data && !error){
      if(data.result === 1){
        MESSAGE_LIST_READ_SAGAS.success(data);
      }else{
        MESSAGE_LIST_READ_SAGAS.failure();
      }
  }else{
    MESSAGE_LIST_READ_SAGAS.failure();
  }
}


/**
 * 
 * @param {*} param0 
 */
function* handleTest({payload}){
  AlertFn(handleTest.name);
  LISTING_TEST_SAGAS.pending();
  const {data,error} =yield call(LISTING_TEST_SAGAS.request,payload);
  if(data && !error){
    LISTING_TEST_SAGAS.success(data);
  }else{
    LISTING_TEST_SAGAS.failure(data);
  }
}


/**
 * 
 * @param {*} param0 
 */
function* handleTestPageList({payload}){
  AlertFn(handleTestPageList.name);
  LISTING_TEST_LIST_SAGAS.pending();
  const {data,error} =yield call(LISTING_TEST_LIST_SAGAS.request,payload);
  if(data && !error){
    data.clickPage={
      page:payload
    }
    LISTING_TEST_LIST_SAGAS.success(data);
  }else{
    LISTING_TEST_LIST_SAGAS.failure(data);
  }
}



export default function* ListingSaga(){
  yield all([
    takeEvery(LISTING_COUNTRY_SAGAS.index,handleGetCountryList),
    takeEvery(LISTING_LOCATION_SAGAS.index,handleGetLocationList),
    takeEvery(LISTING_CASE_LOAD_SAGAS.index,handleGetCaseLoadList),
    takeEvery(LISTING_PARTNERS_INFO_SAGAS.index,handleGetPartnersList),
    takeEvery(LISTING_PARTNERS_MY_ADD_SAGAS.index, handleAddMyPartnersList),
    takeEvery(LISTING_PARTNERS_MY_DEFAULT_ADD_SAGAS.index, handleAddDefaultMyPartnersList),
    takeEvery(LISTING_PARTNERS_MY_DELETE_SAGAS.index, handleDeleteMyPartnersList),
    takeEvery(LISTING_PARTNERS_SEARCH_SAGAS.index,handleGetPartnersSearchList),
    takeEvery(LISTING_MY_PARTNERS_SAGAS.index, handleGetMyPartnersList),
    takeEvery(LISTING_PARTNERS_TYPE_SAGAS.index,handleGetPartnersTypeList),
    takeEvery(LISTING_WORKS_SEARCH_SAGAS.index,handleGetWorksSearchList),
    takeEvery(MESSAGE_LIST_SAGAS.index, handleMessageList),
    takeEvery(MESSAGE_LIST_DELETE_SAGAS.index, handleMessageListDelete),
    takeEvery(MESSAGE_LIST_DELETE_ALL_SAGAS.index, handleMessageListDeleteAll),
    takeEvery(MESSAGE_LIST_READ_SAGAS.index, handleReadMessage),
    takeEvery(LISTING_TEST_SAGAS.index,handleTest),
    takeEvery(LISTING_WORKS_GET_LIST_UPDATE_SAGAS.index,handleWorksGetList),
    takeEvery(LISTING_TEST_LIST_SAGAS.index,handleTestPageList),
  ])
}





