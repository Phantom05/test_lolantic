import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { useDidUpdateEffect } from 'lib/utils';
import {storage} from 'lib/library';
import { AlertList } from 'components/common/listing';
import Checkbox from '@material-ui/core/Checkbox';
import { font, color } from 'styles/__utils';
import cx from 'classnames';
import styled from 'styled-components';
import CachedIcon from '@material-ui/icons/Cached';
// import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { PlainModal, ModalComplete } from 'components/common/modal';
import {withRouter} from 'react-router-dom';
import {FullScreenLoading } from 'components/base/loading';
import { ArrowPageContainer } from 'containers/pagination';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


import {
  MESSAGE_LIST_SAGAS,
  MESSAGE_LIST_DELETE_SAGAS,
  MESSAGE_UPDATE_SAGAS,
  MESSAGE_LIST_READ_SAGAS,
  LISTING_WORKS_SEARCH_SAGAS,
} from 'store/actions';


function AlertContainer(props) {
  const { auth: signReducer, listing: listReducer, info: infoReducer } = useSelector(state => state);
  const {
    userCode
  } = signReducer.signIn.profile;
  const {
    list,
    pagingData
  } = listReducer.message;
  const {
    messageUpdate,
    case: rCase
  } = infoReducer;

  const [values, setValues] = useImmer({
    page: 1,
    checkEventId: {},
    allCheckBox: false,
    count: 1,
    modal: {
      current: null,
      open: false,
    },
    caseCode: '',
    list: [],
    pageData: {
      isEndNextPage: false,
      isEndPrevPage: false
    },

  });

  // const searchPage = listReducer.message.pagingData;
  // const isEndPrevPage = !searchPage.prevCheck;
  // const isEndNextPage = !searchPage.nextCheck;

  const getUrlpage = props.match.params.list;
  const searchConfig = {
    userCode: userCode,
    page: getUrlpage,
  }

  // 모달 닫기
  const closeModal = useCallback(() => {
    // console.log("close modal");
    setValues(draft => {
      draft.modal.current = null;
      draft.modal.open = false;
    });
  },[]);
  const modalObj = {
    'accept': <ModalComplete onClick={() => closeModal()} title="수락완료" children="파트너 요청을 수락했습니다." />,
    'deny': <ModalComplete onClick={() => closeModal()} title="거절완료" children="파트너 요청을 거절했습니다." />,
  }
  const modalCont = modalObj[values.modal.current];

  const messageConf = {
    page: values.page,
    userCode: userCode,
  }

  // 페이지 렌더링 시 메세지 리스트 요청
  useEffect(() => {
    MESSAGE_LIST_SAGAS(messageConf);
    setValues(draft => {
      draft.modal.open = false;
      draft.modal.current = null;
    });
  }, []);

  // 메세지 리스트 요청 성공시 체크박스 초기화
  useDidUpdateEffect(() => {
    if (listReducer.message.success) {
      setValues(draft => {
        draft.list = list;
        draft.pageData.isEndNextPage = !pagingData.nextCheck;
        draft.pageData.isEndPrevPage = !pagingData.prevCheck;
      });
      list.forEach(i => {
        const { eventLogIdx } = i;
        setValues(draft => {
          draft.checkEventId[eventLogIdx] = false;
        });
      });
    }
    setValues(draft => {
      draft.allCheckBox = false;
    });
  }, [listReducer.message.success]);

  // 메세지 read, delete 이벤트 성공시 메세지 리스트 요청
  useDidUpdateEffect(() => {
    if (listReducer.message.update.success) {
      MESSAGE_LIST_SAGAS(messageConf);
      if (listReducer.message.update.success) {
      }
    }
  }, [listReducer.message.update.success]);

  // 요청 메세지 accept deny 이벤트 성공시 메세지 리스트 요청 및 모달 활성화 대기
  useDidUpdateEffect(() => {
    if (messageUpdate.success) {
      MESSAGE_LIST_SAGAS(messageConf);
      if (messageUpdate.success) {
        setValues(draft => {
          draft.modal.open = true;
        });

      }
    }
  }, [messageUpdate.success]);

  // 체크박스 전체 싱글 선택 관리
  const handleCheck = useCallback(config => e => {
    const {
      type
    } = config;
    const targetCheck = e.target.checked;
    const targetValue = e.target.value;

    if (type === 'all') {
      setValues(draft => {
        draft.allCheckBox = !draft.allCheckBox;
      });

      list.forEach(i => {
        const { eventLogIdx } = i;
        setValues(draft => {
          draft.checkEventId[eventLogIdx] = targetCheck ? true : false;
        });
      });
    }
    if (type === 'single') {
      setValues(draft => {
        draft.checkEventId[targetValue] = targetCheck;
      });
    }

  },[list]);

  // 클릭 이벤트 관리
  const handleClick = useCallback(config => e => {
    const {
      type,
      partnerCode,
      caseCode
    } = config;

    const targetValue = e.target.value;
    setValues(draft => {
      draft.allCheckBox = false;
    });
    // 메세지 삭제
    if (type === 'delete') {
      let deletArry = [];
      Object.keys(values.checkEventId).forEach(i => {
        if (values.checkEventId[i] === true) {
          return deletArry.push(i);
        }
      });
      MESSAGE_LIST_DELETE_SAGAS({ userCode: userCode, eventLogIdxArr: deletArry });
    }

    // 메세지 읽기
    if (type === 'read') {
      let readArray = [];
      Object.keys(values.checkEventId).forEach(i => {
        if (values.checkEventId[i] === true) {
          return readArray.push(i);
        }
      });
      MESSAGE_LIST_READ_SAGAS({ userCode: userCode, eventLogIdxArr: readArray });
    }

    // 요청 메세지 수락
    if (type === 'accept') {
      // console.log("accept", partnerCode);
      MESSAGE_UPDATE_SAGAS({ userCode: userCode, partnerCode: partnerCode, state: 1 });
      setValues(draft => {
        draft.modal.current = 'accept';
      });
    }

    // 요청 메세지 거절
    if (type === 'deny') {
      // console.log("deny", partnerCode);
      MESSAGE_UPDATE_SAGAS({ userCode: userCode, partnerCode: partnerCode, state: 2 });
      setValues(draft => {
        draft.modal.current = 'deny';
      });
    }

    // 메세지 리스트 리프레쉬
    if (type === 'refresh') {
      MESSAGE_LIST_SAGAS(messageConf);
    }

    // 링크 메세지 클릭시 works로 이동
    if (type === 'link') {
      const worksSearchConf = {
        userCode: userCode,
        page: 1,
        sort: 5,
        search: caseCode,
        filter:{
          "stage":[0],
          "type":["sender", "receiver"],
          "hidden":[]
        },
        first:false,
        isLoad:true
      }
      console.log("LINK CONF", worksSearchConf);
      setValues(draft => {
        draft.caseCode = caseCode;
      });
      LISTING_WORKS_SEARCH_SAGAS(worksSearchConf);
    }
  },[values.checkEventId]);

  // works 페이지 이동요청 시
  const isSuccessSearch = listReducer.works.success;
  useEffect(()=>{
    if(isSuccessSearch && listReducer.works.search.isLoad){
      props.history.push(`/works/1?sort=5&search=${values.caseCode}&type=`);
      
      // 페이지 이동시 해당 works case를 펼침 상태로 설정
      storage.set('worksCurrentCode',{
        currentCode:values.caseCode
      })
    }
  },[isSuccessSearch]);

  return (

    <>
      {!listReducer.message.success && <FullScreenLoading />}
      <Styled.AlertContainer>

        <div className="AlertContainer__sort_box">
          <div className={cx("AlertContainer__sort", "sort_checkbox")}>
            <Checkbox
              value="secondary"
              color="primary"
              checked={values.allCheckBox}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
              onChange={handleCheck({ type: 'all' })}
            />
          </div>
          <div className={cx("AlertContainer__sort", "sort_btn_box")}>
            <button className="sort_btn" onClick={handleClick({ type: "delete" })}>DELETE</button>
            <button className="sort_btn" onClick={handleClick({ type: "read" })}>READ</button>
          </div>
          <div className={cx("AlertContainer__sort", "sort_refresh")}>
            <button className="sort_refresh_btn" onClick={handleClick({ type: "refresh" })}><CachedIcon style={{ fontSize: 30 }} /></button>
          </div>


        </div>
        <AlertList
          list={values.list}
          checkedId={values.checkEventId}
          handleCheck={handleCheck}
          handleClick={handleClick}
        />
        <div className="AlertContainer__page_btn">
          <div style={{ textAlign: 'right' }}>
            <ArrowPageContainer
              sagas={(config) => MESSAGE_LIST_SAGAS({ ...searchConfig, ...config })}
              success={listReducer.message.success}
              failure={listReducer.message.failure}
              pending={listReducer.message.pending}
              page={listReducer.message.pagingData.page}
              url={'/alert/list'}
              matchUrl={props.match.params.list}
              pagingData={listReducer.message.pagingData}
              paging={{
                prevPageText: <ArrowBackIosIcon
                  disabled={values.pageData.isEndPrevPage}
                  className={cx("Arrow__btn_svg", { disabled: values.pageData.isEndPrevPage })}
                />,
                nextPageText: <ArrowForwardIosIcon
                  disabled={values.pageData.isEndNextPage}
                  className={cx("Arrow__btn_svg", { disabled: values.pageData.isEndNextPage })}
                />
              }}
            />
          </div>
        </div>

      </Styled.AlertContainer>
      <PlainModal
        isOpen={values.modal.open}
        content={modalCont}
        onClick={closeModal}
        dim={false}
      />
    </>

  );
}

const Styled = {
  AlertContainer: styled.div` 
  .AlertContainer__sort_box {
    position: relative;
  }
  .AlertContainer__sort {
    display: inline-block;
    line-height: 42px;

    &.sort_checkbox{
      margin-right: 25px;
    }
  }

  .sort_btn {
    border: none;
    padding: 3px 10px;
    ${font(14, color.white)};
    background: ${color.blue};
    border-radius: 2px;
    margin-right: 5px;
    cursor: pointer;
    transition: all .2s;
    
    &:hover{
      background: ${color.blue_hover};
    }
  }
  .sort_refresh_btn{
    border: none;
    position: absolute;
    right: 0;
    top: 10px;
    color: ${color.blue};
    background: none;
    cursor: pointer;
    transition: all .2s;
    
    &:hover{
      color: ${color.blue_hover};
      /* animation: 3s rotate infinite linear; */
    }
    &:focus{
      outline: none;
    }
    @keyframes rotate{
      from {transform: rotate(0)}
      to{transform: rotate(-360deg)}
    }
  }

  .AlertContainer__page_btn{
      color: ${color.black_font};
      cursor: pointer;
      margin-top: 20px;    
    }
   .MuiCheckbox-colorPrimary.Mui-checked{
    color: ${color.blue};
   }
  `
}



export default withRouter(AlertContainer);