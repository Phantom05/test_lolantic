
import {all, 
  // takeEvery,call
} from 'redux-saga/effects';
// import {
//   AlertFn} from 'lib/library';
// import {
//   LISTING_COUNTRY_SAGAS,
//   LISTING_LOCATION_SAGAS,
//   LISTING_CASE_LOAD_SAGAS
// } from 'store/actions';


/**
 * get country list
 * @param {*} param0 
 */
// function* handleGetCountryList({payload}){
//   AlertFn(handleGetCountryList.name);
//   LISTING_COUNTRY_SAGAS.pending();
//   const {data,error} =yield call(LISTING_COUNTRY_SAGAS.request,payload);
//   if(data && !error){
//     if(data.result ===1){
//       LISTING_COUNTRY_SAGAS.success(data);
//     }else{
//       LISTING_COUNTRY_SAGAS.failure(data);
//     }
//     console.log(data);
//   }else{
//     console.log(data);
//   }
// }



export default function* ListingSaga(){
  yield all([
    // takeEvery(LISTING_COUNTRY_SAGAS.index,handleGetCountryList),
  ])
}