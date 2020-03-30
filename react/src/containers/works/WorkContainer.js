import React,{useEffect} from 'react';
import { WorksCardListPanel } from 'components/common/panel';
import {storage} from 'lib/library';
import {
  LISTING_WORKS_SEARCH_SAGAS,
  INFO_WORKS_APP_DATA_UPLOAD_SAGAS,
  INFO_CASE_COMPLETE_SAGAS,
  INFO_WORKS_DIRECT_FILE_UPLOAD,
  INFO_WORKS_CASE_UPDATE_SAGAS
} from 'store/actions';



const WorkContainer = React.memo(function WorkContainer() {
  useEffect(()=>{   
    return ()=>{
      LISTING_WORKS_SEARCH_SAGAS.init();
      INFO_WORKS_APP_DATA_UPLOAD_SAGAS.init()
      INFO_CASE_COMPLETE_SAGAS.init();
      INFO_WORKS_DIRECT_FILE_UPLOAD.init();
      INFO_WORKS_CASE_UPDATE_SAGAS.init();
      storage.remove('worksCurrentCode');
    }
  },[]);
 
  return (
    <>    
      <WorksCardListPanel />
    </>
  );
});


export default WorkContainer;






// import {useSelector} from 'react-redux';
// import {CustomLoadingCircle} from 'components/base/loading';  
// import styled from 'styled-components';

// const {
//   // auth:authReducer,
//   listing:listingReducer,
// } = useSelector(state=>state);
// const newList = listingReducer.works.groupList;

// const Styled ={
//   WorksWhite:styled.div`
//     position:absolute;
//     width:100%;
//     left:0;
//     top:0;
//     min-height:71vh;
//     z-index:10;
//     background:white;
//     .works__loading{
//       z-index:1;
//       position:absolute;
//       left:50%;
//       top:50%;
//       transform:translate(-50%,-50%);
//       color:red;
//     }
//   `
// }


  // DEBUG:// 살리기
  // if(listingReducer.works.pending ){
  //   return (
  //      <Styled.WorksWhite >
  //        <div className="works__loading">
  //         <CustomLoadingCircle />
  //        </div>
  //      </Styled.WorksWhite>
  //    );
  // }

  // if(!listingReducer.works.success || true) return (
  //   <Styled.WorksWhite >
  //     <span className="works__loading">
  //       <LoadingCircle size={30}/>
  //     </span>
  //   </Styled.WorksWhite>
  // );



//   const userCode =authReducer.signIn.profile.userCode;
// works list랑 case update랑 달라서그럼....... 이거 잡아야함
 // const handleSubmit = config=>{
  //   const {type, value} = config;
  //   console.log(config);
  //   if(type ==='edit_ok'){
  //     INFO_CASE_UPDATE_SAGAS(value);
  //   }
  // }




        // onClick={handleClick}
  // const handleClick = config=>{
  //   const detailConf ={
  //     userCode : userCode,
  //     caseCode : config.caseCode,
  //   }
  //   if(config.caseCode === infoReducer.works.data.caseCode){
  //     INFO_WORKS_DETAIL_SAGAS.init();
  //   }else{
  //     INFO_WORKS_DETAIL_SAGAS(detailConf);
  //   }
  // }
  
  // const handleClick = config=>{
  //   console.log(config);
  // }