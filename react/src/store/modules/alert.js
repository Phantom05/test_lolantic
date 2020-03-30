import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import produce from 'immer';


let initialState = {
  alert:{
    
  }
}


export default handleActions({
  // NOTE: SIGN IN , TOKEN
  [actions.AUTH_SIGNIN.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {

    })
  },


}, initialState);


