import {all,fork} from 'redux-saga/effects';
import authSaga from './authSaga';
import infoSaga from './infoSaga';
import listingSaga from './listingSaga';
import baseSaga from './baseSaga';
import commonSaga from './commonSaga';


export default function* rootSaga(){
  yield all([
    fork(authSaga),
    fork(infoSaga),
    fork(listingSaga),
    fork(baseSaga),
    fork(commonSaga),
    
    // fork(wsSaga),
    // fork(homeSaga),
  ])
}