import {combineReducers} from 'redux';
import auth from './auth';
import base from './base';
import common from './common';
import alert from './alert';
import mypage from './mypage';
import info from './info';
import listing from './listing';

export default combineReducers({
  base,
  common,
  auth,
  alert,
  mypage,
  listing,
  info
});





