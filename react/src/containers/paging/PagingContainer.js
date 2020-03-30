import React,{useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useImmer} from 'use-immer';
import { useDidUpdateEffect } from 'lib/utils';

import {
  MESSAGE_LIST_SAGAS,
  LISTING_WORKS_SEARCH_SAGAS
} from 'store/actions';

import {S_WorksPaging,S_MessagePaging} from 'components/common/paging';

function PagingContainer(props) {
  const {type} = props;
  const {auth: signReducer, listing: listReducer, info: infoReducer} = useSelector(state => state);
  const {
    list,
    pagingData
  } = listReducer.message;
  const {
    userCode
  } = signReducer.signIn.profile;
  
  const [values, setValues] = useImmer({
    page: 1,
    prevPage: 1,
  });
  
  // const initialConf = {
  //   page: values.page,
  //   userCode: userCode,
  // }
  
  const sagaList = {
    works: {
      saga: LISTING_WORKS_SEARCH_SAGAS,
      conf: {
        page: values.page,
        userCode: userCode,
        sort: props.conf && props.conf.sort,
        search: props.conf && props.conf.search,
        type: props.conf && props.conf.type,
        filter:{
          "stage":[],
          "type":[],
          "hidden":0
        },
      }
    },
    message: {
      saga: MESSAGE_LIST_SAGAS,
      reduce: listReducer.message,
      conf: {
        page: values.page,
        userCode: userCode,
      }
    }
  }


  const handlePage = config => e => {
    if(config === 'prev'){
      if(sagaList[type].reduce.pagingData.prevCheck){
        setValues(draft => {
          draft.prevPage = draft.page;
          draft.page = sagaList[type].reduce.pagingData.page - 1;
        });
      }
    }else if(config === 'next'){
      if(sagaList[type].reduce.pagingData.nextCheck){
        setValues(draft => {
          draft.prevPage = draft.page;
          draft.page = sagaList[type].reduce.pagingData.page + 1;
        });
      }
    }
  }

  useDidUpdateEffect(() => {
    sagaList[type].saga(sagaList[type].conf);
  },[values.page]);

  useDidUpdateEffect(() => {
    if(sagaList[type].reduce.failure){
      setValues(draft => {
        draft.page = draft.prevPage;
      });
    }

  }, [sagaList[type].reduce.failure]);

  const pageCont = {
    message : <S_MessagePaging handlepage={handlePage} pagingdata={pagingData} />,
    works: <S_WorksPaging handlepage={handlePage} pagingdata={pagingData} />
  } 

  return (
    <div>
      {pageCont[type]}
    </div>
  );
}

export default PagingContainer;