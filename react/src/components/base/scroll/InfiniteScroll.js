// import React,{useEffect,useRef,useLayoutEffect} from 'react';
// import { useSelector } from 'react-redux';
// import { getScrollBottom, preventStickBottom } from 'lib/library';
// import throttle from 'lodash/throttle';
// // import {useDidUpdateEffect} from 'lib/utils';


// function InfinitiScroll(props) {
//   const {children,api,list,saga,component:Component} = props;
//   const {listing:listingReducer} = useSelector(state=>state);
//   const componentRef = useRef();
//   // useRef

//   const prefetch = async () => {
//     console.log('프리패치!');
//     if(listingReducer.test.pending){
      
//     }else{
//       const ran = Math.floor(Math.random()*100);
//       saga(ran);
//     }
//     // const { posts, prefetching, loading } = this.props;
//     // if (!posts || posts.length === 0 || prefetching || loading) return;
//     // const lastId = posts[posts.length - 1].id;
//     // if (this.props.prefetched) {
//       // ListingActions.revealPrefetched('recent');
//       // await Promise.resolve(); // next tick
//     // }
//     // if (lastId === this.prevCursor) return;
//     // this.prevCursor = lastId;
//     preventStickBottom();
//     // onScroll();
//   };
  

//   const onScroll = throttle(() => {
//     const scrollBottom = getScrollBottom();
//     if (scrollBottom > 300) return;
//     console.log(scrollBottom,'scrollBottom');
//     prefetch();
//   }, 250);
  
//   const listenScroll = () => {
    
//     window.addEventListener('scroll', onScroll);
//   };

//   const unlistenScroll = () => {
//     window.removeEventListener('scroll', onScroll);
//   };
  
//   console.log(listingReducer.test);
  
//   console.log(props,'InfinitiScroll');
//   console.log(listingReducer.test.data,'listingReducer');
//   console.log(componentRef,'componentRef');

//   useLayoutEffect(()=>{
//     listenScroll();
//     return ()=>{
//       unlistenScroll();
//     }
//   },[]);

//   const testList = listingReducer.test.data;
//   return (
//     <Component list={testList} ref={componentRef}/>
//   );
// }

// export default InfinitiScroll;


import React,{useEffect} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import {LoadingCircle} from 'components/base/loading';
import styled from 'styled-components';
import {font,color} from 'styles/__utils';

/**
 * const loadConfig ={
    userCode:authReducer.signIn.profile.userCode,
    page:caseList.page
  }
 * <InfiniteScroll
          maxDataLength={30}
          dataLength={caseList.load.length}
          next={()=>LISTING_CASE_LOAD_SAGAS(loadConfig)}
          unMount={()=>LISTING_CASE_LOAD.init()}
          height={425}
        >
          <CaseLoadList 
            list={caseList.load}
            onChange={handleClick('list')}
          />
        </InfiniteScroll>
 * @param {*} props 
 */
function InfiniteScrollTest(props) {
  const {
    dataLength,
    maxDataLength,
    children,
    endMessage,
    loader,
    next,
    unMount,
    maxDataMessage,
    type
  } = props;

  useEffect(()=>{
    next && next();
    return ()=>{
      unMount && unMount();
    }
  },[]);


  let hasMore = true;
  if(dataLength >= maxDataLength || props.isEnd || dataLength === 0){
    hasMore = false;
  }
  
  let endText = maxDataMessage ? maxDataMessage:`리스트는 ${maxDataLength}개 까지만 보여지게 됩니다.`;
  if(props.isEnd) endText = '데이터가 더 이상 존재하지 않습니다..';
  if(dataLength === 0) endText = '데이터가 없습니다..'
  return (
    <Styled.InfiniteScroll>
      <InfiniteScroll
        {...props}
          hasMore={hasMore}
          loader={ loader?loader:
          <div className="align__center">
            <LoadingCircle size={20}/>
          </div>
          }
          endMessage={ endMessage?endMessage:
            <div className="align__center">
              <p className="cassload__info">
                {endText}
              </p>
            </div>
          }
        >
          {children}
        </InfiniteScroll>
    </Styled.InfiniteScroll>
  );
}

const Styled = {
  InfiniteScroll:styled.div`
    .align__center{
      text-align:center;
    }
    .cassload__info{
      ${font(14)};
    }
  
  `
}

export default InfiniteScrollTest;