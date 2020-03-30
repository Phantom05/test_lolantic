import {all, takeEvery,call, take} from 'redux-saga/effects';
import {
  AlertFn} from 'lib/library';
import {
  COMMON_EXE_NAV_SUBMIT_SAGAS
} from 'store/actions';

// import {Actions} from 'store/actionCreators'


/**
 * get country list
 * @param {*} param0 
 */
function* handleExeNavSumibt({payload}){
  AlertFn(handleExeNavSumibt.name);
  COMMON_EXE_NAV_SUBMIT_SAGAS.pending();
  console.log(payload,'payloadpayloadpayload');
  
  const {data,error} =yield call(COMMON_EXE_NAV_SUBMIT_SAGAS.request,payload);
  console.log(data,'data');
  if(data && !error){
    if(data.result ===1){
      COMMON_EXE_NAV_SUBMIT_SAGAS.success(data);
    }else{
      COMMON_EXE_NAV_SUBMIT_SAGAS.failure(data);
    }
  }else{
    console.log(data);
  }
}





export default function* commonSaga(){
  yield all([
    takeEvery(COMMON_EXE_NAV_SUBMIT_SAGAS.index,handleExeNavSumibt),

  ])
}




// function* handleGetMyPartner({payload}){
//   roleSaga(INFO_CASA_FILE_LIST_COUNT_SAGAS)
//   .success(function(res){
//     alert('성공 했습니다.')
//   })
//   .failure(function(res){
//     alert('실패 했습니다.')
//   })
// }