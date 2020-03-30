import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import produce from 'immer';


let initialState = {
  myinfo:{
    pending: false,
    success: false,
    failure: false,
    token:'',
    userInfo:{
         profile: null,
         partnerInfo: {
           code: null
         },
         myCode: "",
         open: 0,
         company: "",
         manager: "",
         name: "",
         email: "",
         phone: "",
         address: "",
         type: {
          clinic : false,
          lab : false,
          milling : false,
         },
         country_id: 0,
         country: "",
         states_id: 0,
         state: ""
    },
    partnerInfo: {
        profile: null,
        partnerInfo: null,
        myCode: "",
        open: 0,
        company: "",
        manager: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        type: {
        clinic : false,
        lab : false,
        milling : false,
        },
        country_id: 0,
        country: "",
        states_id: 0,
        state: ""
    },
    update:{
        pending: false,
        success: false,
        failure: false
    }
  },
  infoPartners:{
      pending: false,
      token:'',
      partner: {
         myCode: "",
         type: {
          clinic : false,
          lab : false,
          milling : false,
         },
         company: "",
         manager: "",
         name: "",
         email: "",
         phone: "",
         country: "",
         state: "",
         address: ""
      },
      updatePartner: {
          yourCode: "",
          type: 0,
          company: "",
          person: "",
          email: "",
          countryRegion: "",
          phone: "",
          address: ""
      }
   },
   myOption:{
    pending: false,
    success: false,
    failure: false,
    token:'',
    result: ''
   },
   workSpace: {
     pending: false,
     success: false,
     failuer: false,
     path: ''
   },
   workSpaceSet: {
    pending: false,
    success: false,
    failuer: false,
   },
   changeProfile: {
    pending: false,
    success: false,
    failuer: false,
   },
   shortcutExe: {
    pending: false,
    success: false,
    failuer: false,
   },
   caseSync: {
     pending: false,
     success: false,
     failuer: false,
     syncTime: ''
   }
}


export default handleActions({
  // NOTE: MY_INFORMATION
  [actions.INFO_INFORMATION.PENDING]: (state, { payload: diff }) => {
    console.log("pending get my info");
    return produce(state, draft => {
      const {myinfo} = draft;
      myinfo.pending = true;
      myinfo.success = false;
      myinfo.failure = false;
      myinfo.token='';
    })
  },
  // payload에 option : loginUser => 현재 로그인된 유저정보 partnerCode를 포함한 data를 받음
  // 없을시 유저정보에서 partnerCode 부분을 제거한 후 받음
  [actions.INFO_INFORMATION.SUCCESS]: (state, { payload: diff }) => {
    // console.log("success get my info", JSON.stringify(diff.data.info));
    return produce(state, draft => {
      const {myinfo} = draft;
      myinfo.pending = false;
      myinfo.success = true;
      myinfo.failure = false;
      myinfo.token = diff.data.token;
      if(diff.option === 'loginUser'){
        myinfo.userInfo = diff.data.info;
      }else{
        delete diff.data.info.partnerInfo;
        myinfo.partnerInfo = {...diff.data.info, partnerInfo: myinfo.partnerInfo};
      }
    })
  },
  [actions.INFO_INFORMATION.FAILURE]: (state, { payload: diff }) => {
    console.log("fail get my info");
    return produce(state, draft => {
      const {myinfo} = draft;
      myinfo.pending = false;
      myinfo.success = false;
      myinfo.failure = true;
      myinfo.token='';
    })
  },
  // NOTE: MY_INFORMATION UPDATE
  [actions.INFO_INFORMATION_UPDATE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {myinfo} = draft;
      const {update} = myinfo;
      update.pending = true;
      update.success = false;
      update.failure = false;
    })
  },
  [actions.INFO_INFORMATION_UPDATE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {myinfo} = draft;
      const {update} = myinfo;
      update.pending = false;
      update.success = true;
      update.failure = false;
    })
  },
  [actions.INFO_INFORMATION_UPDATE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      const {myinfo} = draft;
      const {update} = myinfo;
      update.pending = false;
      update.success = false;
      update.failure = true;
    })
  },


  // NOTE: MY_PARTNERS
  [actions.INFO_PARTNERS.PENDING]: (state, { payload: diff }) => {
   return produce(state, draft => {
     const {infoPartners} = draft;
     infoPartners.pending = true;
     infoPartners.token='';
   })
 },
 [actions.INFO_PARTNERS.SUCCESS]: (state, { payload: diff }) => {
   return produce(state, draft => {
     const {infoPartners} = draft;
     infoPartners.pending = false;
     infoPartners.token = diff.token;
     infoPartners.partner = diff.info;
   })
 },
 [actions.INFO_PARTNERS.FAILURE]: (state, { payload: diff }) => {
   return produce(state, draft => {
     const {infoPartners} = draft;
     infoPartners.pending = false;
     infoPartners.token='';
   })
 },

 
  //NOTE: Update My Option
  [actions.INFO_UPDATE_MY_OPTION.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_UPDATE_MY_OPTION pending');
      draft.myOption.pending = true;
      draft.myOption.success = false;
      draft.myOption.failure = false;
    })
  },
  [actions.INFO_UPDATE_MY_OPTION.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_UPDATE_MY_OPTION success');
      draft.myOption.pending = false;
      draft.myOption.success = true;
      draft.myOption.failure = false;
    })
  },
  [actions.INFO_UPDATE_MY_OPTION.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_UPDATE_MY_OPTION failure');
      draft.myOption.pending = false;
      draft.myOption.success = false;
      draft.myOption.failure = true;
    });
  },


  //NOTE: Update Work space path
  [actions.WORKSPACE_SET.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_SET INIT');
      draft.workSpaceSet = initialState.workSpaceSet;
    })
  },
  [actions.WORKSPACE_SET.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_SET pending');
      draft.workSpaceSet.pending = true;
      draft.workSpaceSet.success = false;
      draft.workSpaceSet.failure = false;
    })
  },
  [actions.WORKSPACE_SET.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_SET success');
      draft.workSpaceSet.pending = false;
      draft.workSpaceSet.success = true;
      draft.workSpaceSet.failure = false;
    })
  },
  [actions.WORKSPACE_SET.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_SET failure');
      draft.workSpaceSet.pending = false;
      draft.workSpaceSet.success = false;
      draft.workSpaceSet.failure = true;
    });
  },

  //NOTE: Get work space path
  [actions.WORKSPACE_GET.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_GET INIT');
      draft.workSpace = initialState.workSpace;
    })
  },
  [actions.WORKSPACE_GET.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_GET pending');
      draft.workSpace.pending = true;
      draft.workSpace.success = false;
      draft.workSpace.failure = false;
    })
  },
  [actions.WORKSPACE_GET.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_GET success');
      draft.workSpace.pending = false;
      draft.workSpace.success = true;
      draft.workSpace.failure = false;
      draft.workSpace.path = diff.path;
    })
  },
  [actions.WORKSPACE_GET.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('WORKSPACE_GET failure');
      draft.workSpace.pending = false;
      draft.workSpace.success = false;
      draft.workSpace.failure = true;
    });
  },

  //NOTE: Change Profile
  [actions.CHANGE_PROFILE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('CHANGE_PROFILE INIT');
      draft.changeProfile = initialState.changeProfile;
    })
  },
  [actions.CHANGE_PROFILE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('CHANGE_PROFILE pending');
      draft.changeProfile.pending = true;
      draft.changeProfile.success = false;
      draft.changeProfile.failure = false;
    })
  },
  [actions.CHANGE_PROFILE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('CHANGE_PROFILE success');
      draft.changeProfile.pending = false;
      draft.changeProfile.success = true;
      draft.changeProfile.failure = false;
    })
  },
  [actions.CHANGE_PROFILE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('CHANGE_PROFILE failure');
      draft.changeProfile.pending = false;
      draft.changeProfile.success = false;
      draft.changeProfile.failure = true;
    });
  },

  //NOTE: Upload shortcut exe
  [actions.SHORTCUT_EXE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('SHORTCUT_EXE INIT');
      draft.shortcutExe = initialState.shortcutExe;
    })
  },
  [actions.SHORTCUT_EXE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('SHORTCUT_EXE pending');
      draft.shortcutExe.pending = true;
      draft.shortcutExe.success = false;
      draft.shortcutExe.failure = false;
    })
  },
  [actions.SHORTCUT_EXE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('SHORTCUT_EXE success');
      draft.shortcutExe.pending = false;
      draft.shortcutExe.success = true;
      draft.shortcutExe.failure = false;
    })
  },
  [actions.SHORTCUT_EXE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('SHORTCUT_EXE failure');
      draft.shortcutExe.pending = false;
      draft.shortcutExe.success = false;
      draft.shortcutExe.failure = true;
    });
  },

  [actions.CASE_SYNC.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('CASE_SYNC pending');
      draft.caseSync.pending = true;
      draft.caseSync.success = false;
      draft.caseSync.failure = false;
    })
  },
  [actions.CASE_SYNC.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('CASE_SYNC success');
      draft.caseSync.pending = false;
      draft.caseSync.success = true;
      draft.caseSync.failure = false;
      draft.caseSync.syncTime = diff.syncTime;
    })
  },
  [actions.CASE_SYNC.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('CASE_SYNC failure');
      draft.caseSync.pending = false;
      draft.caseSync.success = false;
      draft.caseSync.failure = true;
    });
  },

}, initialState);


