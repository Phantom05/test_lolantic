import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import { LISTING_WORKS_SEARCH_SAGAS } from 'store/actions';
import {Actions} from 'store/actionCreators';
import _ from 'lodash';


function ListComponent() {
  const {listing:listingReducer,auth:authReducer} = useSelector(state=>state);
  const userCode  = authReducer.signIn.profile.userCode;
  const groupList = listingReducer.works.groupList;

  const groupIdList = listingReducer.works.groupIdList;

  useEffect(()=>{
    const searchConfig = {
      userCode: userCode,
      page: 3,
      sort: 1,
      search: "",
      type: 1,
      first: false
    }
    LISTING_WORKS_SEARCH_SAGAS(searchConfig);
  },[]);

  const worksListLoadSuccess = listingReducer.works.success;
  if(!worksListLoadSuccess) return null;

  console.log('ListComponents');

  const ListRow = _.map(groupIdList,item=> {return <ListItem key={item.caseCode} info={item}/>}  );
  console.log(ListRow);
  return (
    <div>
      {ListRow}
    </div>
  );
}

const ListItem = React.memo(function ListItem(props){
  // const [values,setValues] = useImmer(ListItemState);
  const listingReducer = useSelector(state=>state.listing);
  const {info} = props;
  // const uniqCaseList = listingReducer.works.groupIdList;
  
  const handelClick = ()=>{
    const rannum = Math.floor(Math.random()*5000)
    Actions.listing_works_list_update({type:"test",value:info,val:rannum});
  }
  
  console.log('ren');
  return (
    <Styled.ListItem>
      
      <button onClick={handelClick}>Test</button>
      <div className="item_row">{info.dueDate}</div>
      <div>{JSON.stringify(info.status)}</div>
    </Styled.ListItem>
  )
}, (prevProps, nextProps) => {
  return nextProps.info === prevProps.info;
});

// NOTE: memo를 넣어도 전부 실행은 되는데 실제 Dom에 적용이 안되는것임. console.로 적용되는부분을 찾기는 힘듬./




// function ListRows(props){
//   const {info} = props;
//   console.log('ListRows');

//   console.log(info);
//   return (
//     <Styled.ListRows>
//       <div className="title">{info.duedate}</div>
//       <div>
//         {/* {info.list.map((item,idx)=>{
//           return (
//             <ListItem 
//               key={idx} 
//               info={item} 
//             />
//           )
//         })} */}
//       </div>
//     </Styled.ListRows>
//   )
// }




// const ListItemState={
//   data:{}
// }

// const ListItem = React.memo(function ListItem(props){
//   const [values,setValues] = useImmer(ListItemState);
//   const listingReducer = useSelector(state=>state.listing);
//   const {info} = props;
//   const uniqCaseList = listingReducer.works.groupIdList;
  
//   const handelClick = ()=>{
//     const rannum = Math.floor(Math.random()*5000)
//     Actions.listing_works_list_update({type:"test",value:info,val:rannum});
//   }


  
//   useEffect(()=>{
//     setValues(draft=>{
//       draft.data = _.find(uniqCaseList,['caseCode',info.caseCode]);
//     });
//   },[uniqCaseList[info.caseCode]]);



//   console.log('ren');
//   return (
//     <Styled.ListItem>
//       <button onClick={handelClick}>Test</button>
//       <div className="item_row">{values.data.dueDate}</div>
//       <div>{JSON.stringify(values.data.status)}</div>
//     </Styled.ListItem>
//   )
// }, (prevProps, nextProps) => {
  
//   return nextProps.info === prevProps.info;
// });



export default ListComponent;

const Styled={
  ListRows:styled.div`
    margin:5px;
    &{
      .title{
        background:#ececec;
      }
    }
  `,
  ListItem:styled.div`
    &{
      border:1px solid red;
      margin:3px;
      .item_row{
        margin-bottom:3px;
      }
    }
  `
}