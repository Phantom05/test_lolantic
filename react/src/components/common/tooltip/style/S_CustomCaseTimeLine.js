
import React from 'react';
import { CustomTooltip } from 'components/common/tooltip';
import styled from 'styled-components';
import {font, color} from 'styles/__utils';
function S_CustomCaseTimeLine(props) {
  return (
    <CustomTooltip
      iconStyle={props.iconStyle}
      placement="right-start"
      type="help"
      _style={`
        width:410px;
        background:#ececec;
        color:black;
        border-radius:5px;
        padding:10px;
        margin-top:-10px;
        margin-left:-10px;
      `}
      title={
        <Styled.tooltip>
          <div className="tooltip__title">Sender와 Receiver의 작업 상태를 확인할 수 있습니다.</div>
          <div className="tooltip__type_name" >[Sender]</div>
          <div className="tooltip__type_info"> Creat - Case를 생성한 시간(자동) <br />
            Working - Case App을 맨 처음 실행한 시간(자동) <br />
            Upload - 마지막 업로드를 수행한 시간(자동) <br /></div>
          <div className="tooltip__type_name" >[Receiver]</div>
          <div className="tooltip__type_info">Read - Sender가 생성한 Case를 확인한 시간(자동) <br />
            Progressive - Sender가 업로드한 데이터를 다운로드한 시간(자동)<br />
            Completed - Receiver의 작업 완료 시간(수동)<br /></div>
        </Styled.tooltip>
      }
    >
    </CustomTooltip>
  )
}

const Styled={
  tooltip:styled.div`
    
  ${font(13, color.black_font)};
  
  .tooltip__title{
    margin-top:5px;
  }
    .tooltip__type_name{
      color:${color.red};
      margin:10px 0 3px;
      font-size:14px;
      font-weight: 600;
    }
    .tooltip__type_info{
      line-height:18px;
    }
  `
}


export default S_CustomCaseTimeLine;


