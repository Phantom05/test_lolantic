import { handleActions } from 'redux-actions';
import * as actions from 'store/actions';
import produce from 'immer';
import moment from 'moment';
import {IPSFset} from 'lib/utils';
import _ from 'lodash';
import {ENV_MODE_DEV} from 'lib/setting'


export const initialState = {
  boot:0,
  case: {
    type: "create",
    data: {
      userCode:"",
      senderCode:"",
      receiverCode:"",
      caseCode:"",
      caseCount:"",
      code:"",
      partnerCode:"",
      company:"",
      caseId: "",
      patient: '',
      dueDate: moment().valueOf(),
      senderMemo:"",
      receiverMemo:"",
      stage: 0,
      responsibility:""
    },
    load: {
      pending: false,
      success: false,
      failure: false,
    },
    list: {
      count: null
    },
    init:{
      pending: false,
      success: false,
      failure: false,
    },
    create: {
      pending: false,
      success: false,
      failure: false,
    },
    update: {
      // test:true,
      sender:{
        memo:null
      },
      receiver:{
        memo:null
      },
      pending: false,
      success: false,
      failure: false,
    },
    delete:{
      pending: false,
      success: false,
      failure: false,
    },
    complete:{
      isComplete:'',
      pending: false,
      success: false,
      failure: false,
    }
  },
  works:{
    data:{},
    cashing:{
      list:[],
    },
    hide:{
      pending:null,
      success:null,
      failure:null,
    },
    read:{
      pending: false,
      success: false,
      failure: false,
    },
    download:{
      pending: false,
      success: false,
      failure: false,
    },
    detail:{
      pending: false,
      success: false,
      failure: false,
    },
    upload:{
      direct:{
        pending: false,
        success: false,
        failure: false,
        uploadFileList:[]
      },
      appData:{
        appChangeName:"",
        appDataType:{},
        appDataCloudDir:"",
        pending: false,
        success: false,
        failure: false,
      },
    },
    delete:{
      direct:{
        pending: false,
        success: false,
        failure: false,
      },
      appData:{
        pending: false,
        success: false,
        failure: false,
      },
    },
    download:{
      direct:{
        pending: false,
        success: false,
        failure: false,
      },
      appData:{
        pending: false,
        success: false,
        failure: false,
      },
    },
  },
  partnerModal: {
    pending: false,
    success: false,
    failure: false,
    info:{}
  },
  messageUpdate: {
    pending: false,
    success: false,
    failure: false
  }
}


const testDropDownList = [
  "이테스",
  "이테원",
  "이장남",
  "이체고",
  "곽테스",
  "이테장",
  "이테뀨",
  "이장남",
  "이왕관",
  "곽왕관",
]


export default handleActions({
  // NOTE: INFO init


  ["BOOTSTRAPPED"]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('BOOTSTRAPPED');
      draft.boot = draft.boot +1
    })
  },
  [actions.INFO_CASE_INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_INIT');
      draft.case = initialState.case;
    })
  },
  // NOTE: Create Case
  [actions.INFO_CASE_CREATE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_CREATE init');
      draft.case.create.pending = false;
      draft.case.create.success = false;
      draft.case.create.failure = false;
    })
  },
  [actions.INFO_CASE_CREATE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_CREATE pending');
      draft.case.create.pending = true;
      draft.case.create.success = false;
      draft.case.create.failure = false;
    })
  },
  [actions.INFO_CASE_CREATE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_CREATE success');
      draft.case.data.caseId = diff.payload.caseId;
      draft.case.data.caseCode = diff.caseCode;
      draft.case.create.pending = false;
      draft.case.create.success = true;
      draft.case.create.failure = false;
    })
  },
  [actions.INFO_CASE_CREATE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_CREATE failure');
      draft.case.create.pending = false;
      draft.case.create.success = false;
      draft.case.create.failure = true;
    });
  },

  // NOTE: Case Type Change
  [actions.INFO_CASE_TYPE_CHANGE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_TYPE_CHANGE');
      const { type } = diff;
      console.log(type,'!!type');
      draft.case.type = type;

    })
  },
  // NOTE: Get List Case Count
  [actions.INFO_CASE_FILE_LIST_COUNT.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_FILE_LIST_COUNT success');
      console.log(diff, '!');
      draft.case.list.count = diff.listCount;
    })
  },
  [actions.INFO_CASE_FILE_LIST_COUNT.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_FILE_LIST_COUNT failure');

    });
  },

  // NOTE: Case Load
  [actions.INFO_CASE_LOAD.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASA_LOAD pending');
      draft.case.load = initialState.case.load
    })
  },
  [actions.INFO_CASE_LOAD.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASA_LOAD pending');
      draft.case.load.pending = true;
      draft.case.load.success = false;
      draft.case.load.failure = false;
      draft.case.load.data = null;
    })
  },
  [actions.INFO_CASE_LOAD.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASA_LOAD success');
      const {payload} = diff;
      if(payload.type){
        diff.setType = payload.type;
      }
      draft.case.load.pending = false;
      draft.case.load.success = true;
      draft.case.load.failure = false;
      if(diff.setType){   
        draft.case.type = diff.setType; 
      }else{
        draft.case.type = 'load';
      }
      draft.case.data = diff.caseInfo;
      // DEBUG: 수정하기
      if(ENV_MODE_DEV){
        draft.case.data.responsibilityList = testDropDownList;
      }
    })
  },
  [actions.INFO_CASE_LOAD.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASA_LOAD failure');
      draft.case.load.pending = false;
      draft.case.load.success = false;
      draft.case.load.failure = true;
      draft.case.load.data = null;
    });
  },


  // NOTE: Case Update
  [actions.INFO_CASE_UPDATE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_UPDATE init');
      draft.case.update.pending = false;
      draft.case.update.success = false;
      draft.case.update.failure = false;
    })
  },
  [actions.INFO_CASE_UPDATE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_UPDATE pending');
      draft.case.update.pending = true;
      draft.case.update.success = false;
      draft.case.update.failure = false;
    })
  },
  [actions.INFO_CASE_UPDATE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_UPDATE success');
      draft.case.update.pending = false;
      draft.case.update.success = true;
      draft.case.update.failure = false;
      // draft.case.type = 'update';
    })
  },
  [actions.INFO_CASE_UPDATE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_UPDATE failure');
      draft.case.update.pending = false;
      draft.case.update.success = false;
      draft.case.update.failure = true;
    });
  },

  // NOTE: Case Update
  [actions.INFO_WORKS_CASE_UPDATE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CASE_UPDATE init');
      IPSFset(draft.case.update,'init');
      if(diff && diff.type === 'default'){

      }else{
        draft.case.update = initialState.case.update;
      }
    })
  },
  [actions.INFO_WORKS_CASE_UPDATE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CASE_UPDATE pending');
      IPSFset(draft.case.update,'pending');
    })
  },
  [actions.INFO_WORKS_CASE_UPDATE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CASE_UPDATE success');
      console.log(diff, '!');
      if(diff.payload.type === 0){
        draft.case.update.sender.memo = diff.payload.memo
      }else if (diff.payload.type === 1){
        draft.case.update.receiver.memo = diff.payload.memo
      }
      IPSFset(draft.case.update,'success');
    })
  },
  [actions.INFO_WORKS_CASE_UPDATE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CASE_UPDATE failure');
      IPSFset(draft.case.update,'failure');
    });
  },
  

  // NOTE: Case Delete
  [actions.INFO_CASE_DELETE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_DELETE init');
      IPSFset(draft.case.delete,'init');
    })
  },
  [actions.INFO_CASE_DELETE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_DELETE pending');
      IPSFset(draft.case.delete,'pending');
    })
  },
  [actions.INFO_CASE_DELETE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_DELETE success');
      console.log(diff, '!');
      IPSFset(draft.case.delete,'success');
    })
  },
  [actions.INFO_CASE_DELETE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_DELETE failure');
      IPSFset(draft.case.delete,'failure');
    });
  },

  // NOTE: Complete case
  [actions.INFO_CASE_COMPLETE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_COMPLETE init');
      draft.case.complete = initialState.case.complete;
    })
  },
  [actions.INFO_CASE_COMPLETE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_COMPLETE pending');
      draft.case.complete.pending = true;
      draft.case.complete.success = false;
      draft.case.complete.failure = false;
    })
  },
  [actions.INFO_CASE_COMPLETE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_COMPLETE success');
      // console.log(diff, '!');
      const {payload} = diff;
      console.log(payload.isComplete,'payload.isComplete');
      draft.case.complete.isComplete = payload.isComplete;
      draft.case.complete.pending = false;
      draft.case.complete.success = true;
      draft.case.complete.failure = false;
      // draft.case.type = 'update';
    })
  },
  [actions.INFO_CASE_COMPLETE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_COMPLETE failure');
      draft.case.complete.pending = false;
      draft.case.complete.success = false;
      draft.case.complete.failure = true;
    });
  },
  
  

  // NOTE: Case get init data
  [actions.INFO_CASE_INIT_DATA.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_INIT_DATA pending');
      draft.case.init.pending = true;
      draft.case.init.success = false;
      draft.case.init.failure = false;
    })
  },
  [actions.INFO_CASE_INIT_DATA.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_INIT_DATE success');
      // console.log(diff, '!');
      // draft.case.data.manager        = diff.caseInit.manager;
      // draft.case.data.caseCount      = diff.caseInit.caseCount;
      // draft.case.data.partnerCode    = diff.caseInit.code;
      // draft.case.data.responsibility = diff.caseInit.responsibility || "";
      // draft.case.data.name           = diff.caseInit.name;
      // draft.case.data.company        = diff.caseInit.company;
      // draft.case.data.phone          = diff.caseInit.phone;
      // draft.case.data.states         = diff.caseInit.states;
      // draft.case.data.country        = diff.caseInit.country;

      draft.case.data = diff.caseInit;
      // partnerCode
      // DEBUG: 수정하기
      if(ENV_MODE_DEV){
        draft.case.data.responsibilityList = testDropDownList;
      }
      draft.case.init.pending     = false;
      draft.case.init.success     = true;
      draft.case.init.failure     = false;
      // draft.case.type          = 'update';
    })
  },
  [actions.INFO_CASE_INIT_DATA.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_CASE_INIT_DATA failure');
      draft.case.init.pending = false;
      draft.case.init.success = false;
      draft.case.init.failure = true;
    });
  },


    // NOTE: works hide
  [actions.INFO_WORKS_CARD_HIDE.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CARD_HIDE init');
      draft.works.hide = initialState.works.hide;
      
    })
  },
  [actions.INFO_WORKS_CARD_HIDE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CARD_HIDE pending');
      IPSFset(draft.works.hide,'pending');
    })
  },
  [actions.INFO_WORKS_CARD_HIDE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CARD_HIDE success');
      IPSFset(draft.works.hide,'success');
    })
  },
  [actions.INFO_WORKS_CARD_HIDE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CARD_HIDE failure');
      IPSFset(draft.works.hide,'failure');
    })
  },


  // NOTE: Works Detail
  [actions.INFO_WORKS_DETAIL.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_DETAIL init');
      // draft.works.data = initialState.works.data;
      draft.works = initialState.works;
    })
  },
  [actions.INFO_WORKS_DETAIL.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_DETAIL pending');
      draft.works.detail.pending = true;
      draft.works.detail.success = false;
      draft.works.detail.failure = false;
    })
  },
  [actions.INFO_WORKS_DETAIL.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_DETAIL success');
      console.log(diff, '!');
      const resultCaseData = diff.case;
      // draft.case.data.caseCount = diff.caseInit.caseCount;
      // draft.case.data.partnerCode =  diff.caseInit.code;
      // draft.case.data.company =  diff.caseInit.company;

      // const hasCaseCode = _.findIndex(draft.works.cashing.list, 
      //   function(o) { return o.caseCode == resultCaseData.caseCode; });        
        // if(hasCaseCode === -1){
        //   draft.works.cashing.list.push(diff.case)
        // }
        
      // draft.works.data =  diff.case;
      draft.works.detail.pending = false;
      draft.works.detail.success = true;
      draft.works.detail.failure = false;
      // draft.case.type = 'update';
    })
  },
  [actions.INFO_WORKS_DETAIL.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_DETAIL failure');
      draft.works.detail.pending = false;
      draft.works.detail.success = false;
      draft.works.detail.failure = true;
    });
  },


  // NOTE: Works App Upload,Download both init
  [actions.INFO_WORKS_CLOUD_RESET]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_CLOUD_RESET INIT');
    draft.works.upload= initialState.works.upload;
    draft.works.download = initialState.works.download;
    draft.works.delete = initialState.works.delete;
    })
  },

  // NOTE: Works App data upload
  [actions.INFO_WORKS_APP_DATA_UPLOAD.INIT]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_APP_DATA_UPLOAD INIT');
      draft.works.upload.appData = initialState.works.upload.appData;
    })
  },
  [actions.INFO_WORKS_APP_DATA_UPLOAD.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_APP_DATA_UPLOAD pending');
      IPSFset(draft.works.upload.appData,'pending');
    })
  },
  [actions.INFO_WORKS_APP_DATA_UPLOAD.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_APP_DATA_UPLOAD success');
      console.log(diff.payload,'@@@@@@');
      if(diff.appDataCloudDir){
        draft.works.upload.appData.appDataCloudDir = diff.appDataCloudDir;
      }
      if(diff.appDataType){
        draft.works.upload.appData.appDataType = diff.appDataType;
      }
      if(diff.appChangeName){
        draft.works.upload.appData.appChangeName = diff.appChangeName;
      }
      IPSFset(draft.works.upload.appData,'success');
    })
  },
  [actions.INFO_WORKS_APP_DATA_UPLOAD.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_WORKS_APP_DATA_UPLOAD failure');
      IPSFset(draft.works.upload.appData,'failure');
    });
  },

    // NOTE: Works App data download
    [actions.INFO_WORKS_APP_DATA_DOWNLOAD.INIT]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_APP_DATA_DOWNLOAD INIT');
      draft.works.download.appData.pending = false;
      draft.works.download.appData.success = false;
      draft.works.download.appData.failure = false;
      })
    },
    [actions.INFO_WORKS_APP_DATA_DOWNLOAD.PENDING]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_APP_DATA_DOWNLOAD pending');
      draft.works.download.appData.pending = true;
      draft.works.download.appData.success = false;
      draft.works.download.appData.failure = false;
      })
    },
    [actions.INFO_WORKS_APP_DATA_DOWNLOAD.SUCCESS]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_APP_DATA_DOWNLOAD success');
        draft.works.download.appData.pending = false;
        draft.works.download.appData.success = true;
        draft.works.download.appData.failure = false;
      })
    },
    [actions.INFO_WORKS_APP_DATA_DOWNLOAD.FAILURE]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_APP_DATA_DOWNLOAD failure');
        draft.works.download.appData.pending = false;
        draft.works.download.appData.success = false;
        draft.works.download.appData.failure = true;
      });
    },



    // NOTE: Direct file upload
    [actions.INFO_WORKS_DIRECT_FILE_UPLOAD.INIT]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_UPLOAD INIT');
        IPSFset(draft.works.upload.direct,'init');
      })
    },
    [actions.INFO_WORKS_DIRECT_FILE_UPLOAD.PENDING]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_UPLOAD pending');
        IPSFset(draft.works.upload.direct,'pending');
      })
    },
    [actions.INFO_WORKS_DIRECT_FILE_UPLOAD.SUCCESS]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_UPLOAD success');
        console.log(diff,'@$%!%!@%!@%');
        // const {payload} = diff;
        draft.works.upload.direct.uploadFileList = diff.direct || [];
        IPSFset(draft.works.upload.direct,'success')
      })
    },
    [actions.INFO_WORKS_DIRECT_FILE_UPLOAD.FAILURE]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_UPLOAD failure');
        IPSFset(draft.works.upload.direct,'failure')
      });
    },
    
    // NOTE: Direct file Delete
    [actions.INFO_WORKS_DIRECT_FILE_DELETE.PENDING]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_DELETE pending');
        IPSFset(draft.works.delete.direct,'pending');
      })
    },
    [actions.INFO_WORKS_DIRECT_FILE_DELETE.SUCCESS]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_DELETE success');
        console.log(diff);
        
        draft.works.upload.direct.uploadFileList = diff.direct || [];
        IPSFset(draft.works.delete.direct,'success');
      })
    },
    [actions.INFO_WORKS_DIRECT_FILE_DELETE.FAILURE]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_DELETE failure');
        IPSFset(draft.works.delete.direct,'failure');
      });
    },
    
    // NOTE: Direct file Download
    [actions.INFO_WORKS_DIRECT_FILE_DOWNLOAD.PENDING]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_DOWNLOAD pending');
      draft.works.download.direct.pending = true;
      draft.works.download.direct.success = false;
      draft.works.download.direct.failure = false;
      })
    },
    [actions.INFO_WORKS_DIRECT_FILE_DOWNLOAD.SUCCESS]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_DOWNLOAD success');
        draft.works.download.direct.pending = false;
        draft.works.download.direct.success = true;
        draft.works.download.direct.failure = false;
      })
    },
    [actions.INFO_WORKS_DIRECT_FILE_DOWNLOAD.FAILURE]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_DIRECT_FILE_DOWNLOAD failure');
        draft.works.download.direct.success = false;
        draft.works.download.direct.pending = false;
        draft.works.download.direct.failure = true;
      });
    },
    

  


  // NOTE: My page partner list modal info
  [actions.INFO_PARTNERS_MODAL_INFO.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_PARTNERS_MODAL_INFO pending');
      draft.partnerModal.pending = true;
      draft.partnerModal.success = false;
      draft.partnerModal.failure = false;
    })
  },
  [actions.INFO_PARTNERS_MODAL_INFO.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_PARTNERS_MODAL_INFO success');
      console.log(diff, '!');
      draft.partnerModal.pending = false;
      draft.partnerModal.success = true;
      draft.partnerModal.failure = false;
      draft.partnerModal.info = diff.info;
      // draft.case.type = 'update';
    })
  },
  [actions.INFO_PARTNERS_MODAL_INFO.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('INFO_PARTNERS_MODAL_INFO failure');
      draft.partnerModal.pending = false;
      draft.partnerModal.success = false;
      draft.partnerModal.failure = true;
    });
  },



  // NOTE: Message update accept deny
  [actions.MESSAGE_UPDATE.PENDING]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('MESSAGE_UPDATE pending');
      draft.messageUpdate.pending = true;
      draft.messageUpdate.success = false;
      draft.messageUpdate.failure = false;
    })
  },
  [actions.MESSAGE_UPDATE.SUCCESS]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('MESSAGE_UPDATE success');
      console.log(diff, '!');
      draft.messageUpdate.pending = false;
      draft.messageUpdate.success = true;
      draft.messageUpdate.failure = false;
    })
  },
  [actions.MESSAGE_UPDATE.FAILURE]: (state, { payload: diff }) => {
    return produce(state, draft => {
      console.log('MESSAGE_UPDATE failure');
      draft.messageUpdate.pending = false;
      draft.messageUpdate.success = false;
      draft.messageUpdate.failure = true;
    });
  },


    // NOTE: works check read
    [actions.INFO_WORKS_CHECK_READ.INIT]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_CHECK_READ init');
        draft.works.read = initialState.works.read
      })
    },
    [actions.INFO_WORKS_CHECK_READ.PENDING]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_CHECK_READ pending');
        draft.works.read.pending = true;
        draft.works.read.success = false;
        draft.works.read.failure = false;
      })
    },
    [actions.INFO_WORKS_CHECK_READ.SUCCESS]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_CHECK_READ success');
        console.log(diff, '!');
        draft.works.read.pending = false;
        draft.works.read.success = true;
        draft.works.read.failure = false;
      })
    },
    [actions.INFO_WORKS_CHECK_READ.FAILURE]: (state, { payload: diff }) => {
      return produce(state, draft => {
        console.log('INFO_WORKS_CHECK_READ failure');
        draft.works.read.pending = false;
        draft.works.read.success = false;
        draft.works.read.failure = true;
      });
    },

        // NOTE: works download check
        [actions.INFO_WORKS_CHECK_DOWNLOAD.INIT]: (state, { payload: diff }) => {
          return produce(state, draft => {
            console.log('INFO_WORKS_CHECK_DOWNLOAD init');
            draft.works.download = initialState.works.download;
          })
        },
        [actions.INFO_WORKS_CHECK_DOWNLOAD.PENDING]: (state, { payload: diff }) => {
          return produce(state, draft => {
            console.log('INFO_WORKS_CHECK_DOWNLOAD pending');
            draft.works.download.pending = true;
            draft.works.download.success = false;
            draft.works.download.failure = false;
          })
        },
        [actions.INFO_WORKS_CHECK_DOWNLOAD.SUCCESS]: (state, { payload: diff }) => {
          return produce(state, draft => {
            console.log('INFO_WORKS_CHECK_DOWNLOAD success');
            console.log(diff, '!');
            draft.works.download.pending = false;
            draft.works.download.success = true;
            draft.works.download.failure = false;
          })
        },
        [actions.INFO_WORKS_CHECK_DOWNLOAD.FAILURE]: (state, { payload: diff }) => {
          return produce(state, draft => {
            console.log('INFO_WORKS_CHECK_DOWNLOAD failure');
            draft.works.download.pending = false;
            draft.works.download.success = false;
            draft.works.download.failure = true;
          });
        },

  
}, initialState);

