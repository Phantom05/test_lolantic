import React, { useEffect, useCallback } from 'react';
import { WorksSearch } from 'components/common/search';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import queryString from "query-string";
import { Actions } from 'store/actionCreators';
import { storage } from 'lib/library';
import { makeQuerySelector } from 'lib/reselector';
import { FullScreenLoading } from 'components/base/loading';
import { useImmer } from 'use-immer';
import {
  LISTING_WORKS_SEARCH_SAGAS,
  INFO_CASE_LOAD_SAGAS,
  INFO_CASE_DELETE_SAGAS,
  INFO_WORKS_CARD_HIDE_SAGAS,
} from 'store/actions';
import {
  PlainModal,
  ModalComplete,
  ModalConfirmContent
} from 'components/common/modal';

// DEBUG:
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


import { store } from 'react-notifications-component';



const intialState = {
  modal: {
    title: "",
    subtitle: "",
    type: "confirm",
    isShow: false
  },
  index: 0,
  type: "",
  alert: false,
  message: '',
  hideIdx:0
}

const PatientSearchContainer = React.memo(function PatientSearchContainer(props) {
  const [values, setValues] = useImmer(intialState);
  const {
    auth: authReducer,
    listing: listingReducer,
    info: infoReducer
  } = useSelector(state => state);

  const userCode    = authReducer.signIn.profile.userCode;
  const rSearchData = listingReducer.works.search;
  const rCaseLoad   = infoReducer.case.load;

  const storageCurrentCode = storage.get('worksCurrentCode') || false;
  const currentCode = storageCurrentCode && storageCurrentCode.currentCode;

  const onSearch = config => {
    const getUrlpage = props.match.params.list;
    const searchConfig = {
      userCode: userCode,
      page: config.first === true ? 1 : getUrlpage,
      sort: config.sort,
      search: config.search,
      type: config.type,
      first: config.first,
      filter:{
        "stage":[],
  		  "type":[],
  		  "hidden":0
      },
    };
    console.log(searchConfig, 'searchConfig');
    console.log(config, 'config');
    LISTING_WORKS_SEARCH_SAGAS(searchConfig);
  }

  const handleClick = _.debounce(config => {
    const { type, name } = config;
    if (type === 'modal') {
      if (name === 'delete_ok') {
        const deleteConf = {
          "userCode": userCode,
          "caseCodeArr": [currentCode]
        }
        INFO_CASE_DELETE_SAGAS(deleteConf);

      } else {
        setValues(draft => {
          draft.modal.isShow = false;
        });
      }
    }
  }, 300);

  // const onClick = _.debounce(, 150)
  const onClick = config => {
    const { type } = config;
    if (type === 'load') {
      if (!currentCode) {
        setValues(draft => {
          draft.modal.type = 'alert';
          draft.modal.isShow = true;
          draft.modal.title = '로드 실패';
          draft.modal.subtitle = '로드할 Works를 선택해주세요.';
        });
      } else {
        setValues(draft => {
          draft.index = draft.index + 1
        })
        const loadConf = {
          "userCode": userCode,
          "caseCode": currentCode
        }
        INFO_CASE_LOAD_SAGAS(loadConf);

      }
    }
    if (type === 'delete') {
      if (!currentCode) {
        setValues(draft => {
          draft.modal.type = 'delete';
          draft.modal.isShow = true;
          draft.modal.title = '삭제하시겠습니까?';
          draft.modal.subtitle = '삭제 된 케이스를 복구할 수 없습니다.';
        });
      } else {
        setValues(draft => {
          draft.modal.type = 'delete_ok';
          draft.modal.isShow = true;
          draft.modal.title = '삭제하시겠습니까?';
          draft.modal.subtitle = '삭제 된 케이스를 복구할 수 없습니다.';
        });
      }
    }
    if (type === 'refresh') {
      LISTING_WORKS_SEARCH_SAGAS(_.cloneDeep(rSearchData));
    }

    if (type === 'hide') {
      if (currentCode) {
        console.log('흠');
        const hideConf = {
          "userCode": userCode,
          "caseCodeArr": [currentCode]
        }
        console.log(hideConf);
        INFO_WORKS_CARD_HIDE_SAGAS(hideConf);
      }else{
        setValues(draft => {
          draft.modal.type = 'alert';
          draft.modal.isShow = true;
          draft.modal.title = '숨기기 실패.';
          draft.modal.subtitle = '숨기기 할 Works를 선택해주세요.';
        });
      }
    }
  }

  // NOTE: Works Delete
  const isDeleteSuccess = infoReducer.case.delete.success;
  const isDeleteFailure = infoReducer.case.delete.failure;
  useEffect(() => {
    if (isDeleteSuccess) {
      setValues(draft => {
        draft.modal.isShow = false;
      });
      INFO_CASE_DELETE_SAGAS.init();
      LISTING_WORKS_SEARCH_SAGAS(_.cloneDeep(rSearchData));
    }
    if (isDeleteFailure) {
      setValues(draft => {
        draft.modal.type = "alert"
        draft.modal.isShow = true;
        draft.modal.title = '삭제를 실패하였습니다.';
        draft.modal.subtitle = '잠시 후 다시 시도해주세요.';
      });
    }

  }, [isDeleteSuccess, isDeleteFailure, rSearchData, setValues]);


  // NOTE: Case Load
  const isCaseLoadSuccess = rCaseLoad.success;
  const isCaseLoadFailure = rCaseLoad.failure;
  useEffect(() => {
    const initIdx = values.index !== 0;
    if (isCaseLoadSuccess && initIdx) {
      props.history.push('/case');
    }
    if (isCaseLoadFailure && initIdx) {
      setValues(draft => {
        draft.modal.type = 'alert';
        draft.modal.isShow = true;
        draft.modal.title = '로드 실패';
        draft.modal.subtitle = '잠시 후 다시 시도해주세요.';
      });
    }
  }, [isCaseLoadSuccess, isCaseLoadFailure]);

  // NOTE: Works Lost List
  const isWorksLoadListSuccess = listingReducer.works.success;
  useEffect(() => {
    if (isWorksLoadListSuccess) {
      const { page } = rSearchData;
      const searchQuery = makeQuerySelector(
        _.omit(rSearchData, ['userCode', 'headers', 'first', 'page'])
      );
      props.history.push(`/works/${page}?${searchQuery}`);
    }
  }, [isWorksLoadListSuccess]);

  // NOTE: init && refresh
  useEffect(() => {
    // REfresh
    const getUrlpage = props.match.params.list;
    const urlObj = queryString.parse(props.location.search);
    const currenctStorage = storage.get('worksCurrentCode');
    const refreshObject = {
      userCode: userCode,
      page: getUrlpage,
      ...urlObj,
      first: false,
    }
    LISTING_WORKS_SEARCH_SAGAS(refreshObject);

    if (currenctStorage) {
      Actions.listing_select_panel(currenctStorage);
    }
    return () => {
      INFO_CASE_DELETE_SAGAS.init();
      LISTING_WORKS_SEARCH_SAGAS.init();
    }
  }, []);



  
  // const test = ()=>{
  //   store.addNotification({
  //     title: 'Hidden Success.',
  //     message: '필터에서 검색하여 확인 할 수 있습니다.',
  //     insert: "top",
  //     type: 'success',                         // 'default', 'success', 'info', 'warning'
  //     container: 'top-left',                // where to position the notifications
  //     // animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
  //     // animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
  //     dismiss: {
  //       duration: 10000,
  //       onScreen: true,
  //     },
  //   })
  // }

  // DEBUG: 히든 테스팅
  const rInfoHide = infoReducer.works.hide;
  const rInfoHideSuccess = rInfoHide.success;
  useEffect(()=>{
    if(rInfoHideSuccess){
      console.log('rInfoHideSuccess');
      storage.remove('worksCurrentCode');
      storage.remove('worksCurrenctOnlyChecked');
      INFO_WORKS_CARD_HIDE_SAGAS.init();
      LISTING_WORKS_SEARCH_SAGAS(_.cloneDeep(rSearchData));
    }
  },[rInfoHideSuccess])


  return (
    <div>
      {rCaseLoad.pending &&
        <FullScreenLoading dim={true} />
      }
      <PlainModal
        isOpen={values.modal.isShow}
        content={
          values.modal.type === 'alert'
            ? <ModalComplete
              title={values.modal.title}
              children={values.modal.subtitle}
              onClick={() => handleClick({ type: 'modal', name: "dim" })}

            />
            : <ModalConfirmContent
              title={values.modal.title}
              subtitle={values.modal.subtitle}
              okClick={(value) => handleClick({ type: "modal", name: values.modal.type, value })}
              cancelClick={(value) => handleClick({ type: 'modal', name: "dim" })}
            />
        }
        dim={false}
        width={380}
      />
      <WorksSearch
        type={listingReducer.search.type}
        onClick={onClick}
        onSearch={onSearch}
        rSearch={listingReducer.works.search}
      />
    </div>
    );
  }
);
// NOTE: 나중에 생각하고 일단 히든 기능 넣어보기
// function Example (props){
//   const  createNotification = (type) => {
//     return () => {
//       switch (type) {
//         case 'info':
//           NotificationManager.info('Info message');
//           break;
//         case 'success':
//           NotificationManager.success('Success message', 'Title here');
//           break;
//         case 'warning':
//           NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
//           break;
//         case 'error':
//           NotificationManager.error('Error message', 'Click me!', 5000, () => {
//             alert('callback');
//           });
//           break;
//       }
//     };
//   };
//   return (
//     <div>
//       <button className='btn btn-info'
//         onClick={createNotification('info')}>Info
//       </button>
//       <button className='btn btn-success'
//         onClick={createNotification('success')}>Success
//       </button>
//       <button className='btn btn-warning'
//         onClick={createNotification('warning')}>Warning
//       </button>
//       <button className='btn btn-danger'
//         onClick={createNotification('error')}>Error
//       </button>
//     <NotificationContainer />
//   </div>
//   )
// }






export default withRouter(PatientSearchContainer);







