import React from 'react';
import styled  from 'styled-components';
import {dotdotdot} from 'styles/__utils';


function CustomTooltipContent({partnerInfo}){
  const labelList = {
    company: '업체명', 
    manager: '대표자',
    phone: '연락처',
    country: '국가',
    states: '지역'
  }
  return (
    <Styled.CustomTooltipContent>
      <ul>
        {
          Object.keys(labelList).map((i, index) => {
            return (
              <li key={index} className="tooltip__list">
                <label className="tooltip__label">{labelList[i]}</label>
                <span className="text">{partnerInfo[i]}</span>
              </li>
            )
          })
        }
      </ul>
    </Styled.CustomTooltipContent>
  )
}





const Styled = {
  CustomTooltipContent: styled.div`
  & {
    width: 230px;
    color: #FFFFFF;
    font-size: 14px;
    padding:5px;
    .tooltip__list{
      margin-bottom: 10px;
      &:last-child{
        margin-bottom:0;
      }
    }
    .tooltip__label{
      font-weight:bold;
    }
    li{
      vertical-align: middle;
    }
    label{
      display:inline-block;
      font-weight: bold;
      margin-right: 15px;
      min-width:50px;
    }
    .text{
      ${dotdotdot};
    }
  }
    
  `
};

export default CustomTooltipContent;