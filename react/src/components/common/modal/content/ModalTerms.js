import React from 'react';
import styled from 'styled-components';
import {font,color} from 'styles/__utils';

function ModalTerms(props) {

  const contentObj={
    launcher   : {
      title:'DOF Launcher 이용약관',
      content:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt.`
    },
    finance    : {
      title:'전자금융거래이용약관',
      content:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt.`
    },
    collection : {
      title:'개인정보 수집 및 이용',
      content:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt.`
    },
    offer      : {
      title:'개인정보 제공 내용',
      content:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt.`
    },
    process:{
      title:"개인정보 처리방침",
      content:`Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam possimus, modi, magni neque saepe recusandae, libero aperiam debitis sunt doloribus quis! Eum modi asperiores neque eligendi rerum dolores libero incidunt.`
    }
  }

  let currentContent = contentObj[props.type];
  if(!currentContent){
    currentContent= null;
  }

  return (
    <Styled.ModalTerms>
      <h1 className="title" >
        {currentContent.title}
      </h1>
      <p className="content">
        {currentContent.content}
      </p>
    </Styled.ModalTerms>
  );
}

const Styled={
  ModalTerms:styled.div`
    padding:50px;
    /* width:120px; */
    .title{
      margin-bottom:20px;
      border-bottom:1px solid #ececec;
      padding-bottom:10px;
      ${font(22,color.black_font)};
    }
    .content{
      ${font(14,color.black_font)};
      line-height:16px;
    }
  `
}

export default ModalTerms;