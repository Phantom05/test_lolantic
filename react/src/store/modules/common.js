import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import produce from 'immer';


let initialState = {
  executorNav:{
    isOpen:true,
    pending:false,
    success:false,
    failure:false,
  },
}




export default handleActions({
  // NOTE: EXECUTOR_NAV TOGGLE
  [actions.COMMON_EXECUTOR_NAV]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {executorNav} = draft;
      executorNav.isOpen = !executorNav.isOpen;
    })
  },

  // NOTE: EXECUTOR_NAV Submit
  [actions.COMMON_EXE_NAV_SUBMIT.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`>>> COMMON_EXE_NAV_SUBMIT init`);
      // draft.executorNav = initialState.executorNav;
      draft.executorNav.pending = false;
      draft.executorNav.success = false;
      draft.executorNav.failure = false;
    })
  },
  [actions.COMMON_EXE_NAV_SUBMIT.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`>>> COMMON_EXE_NAV_SUBMIT pending`);
      draft.executorNav.pending = true;
      draft.executorNav.success = false;
      draft.executorNav.failure = false;
    })
  },
  [actions.COMMON_EXE_NAV_SUBMIT.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`>>> COMMON_EXE_NAV_SUBMIT success`);
      draft.executorNav.pending = false;
      draft.executorNav.success = true;
      draft.executorNav.failure = false;
    })
  },
  [actions.COMMON_EXE_NAV_SUBMIT.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log(`>>> COMMON_EXE_NAV_SUBMIT failure`);
      draft.executorNav.pending = false;
      draft.executorNav.success = false;
      draft.executorNav.failure = true;
    })
  },
  

}, initialState);


