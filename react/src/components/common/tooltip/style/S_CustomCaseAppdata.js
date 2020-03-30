
import React from 'react';
import { CustomTooltip } from 'components/common/tooltip';
import {
  icon_cloud_data,
  icon_cloud_no_data,
  icon_cloud_upload,
} from 'components/base/images';
import styled from 'styled-components';
import {floatClear, font, color} from 'styles/__utils';


function S_CustomCaseAppdata(props) {
  return (
    <CustomTooltip
      iconStyle={props.iconStyle}
      placement="right-start"
      type="help"
      _style={`
        width:350px;
        background:#ececec;
        color:black;
        border-radius:5px;
        padding:10px;
        margin-left:-10px;
      `}
      title={
        <Styled.tooltip>
          <div >앱 데이터의 업로드 상황을 확인할 수 있습니다.</div>
          <div className="tooltip__row">
            <div className="tooltip__box">
              <span className="tooltip_img_box">
                <img 
                  src={icon_cloud_no_data} 
                  alt="icon_cloud_no_data" 
                  className="tooltip_img"/>
              </span>
            </div>
            <div className="tooltip__box">
              <span className="tooltip_tx top">생성된 데이터 없음</span>
            </div>
          </div>
          <div className="tooltip__row">
            <div className="tooltip__box">
            <span className="tooltip_img_box">
              <img 
                src={icon_cloud_data} 
                alt="icon_cloud_data" 
                className="tooltip_img"/>
            </span>
            </div>
            <div className="tooltip__box">
              <span className="tooltip_tx">
                업로드 대기중인 데이터 <br />
                업로드 버튼 클릭 시 자동으로 압축되어 업로드됩니다.
              </span>
            </div>
          </div>
          <div className="tooltip__row">
            <div className="tooltip__box">
              <span className="tooltip_img_box">
              <img 
                src={icon_cloud_upload} 
                alt="icon_cloud_data" 
                className="tooltip_img"/>
              </span>
            </div>
            <div className="tooltip__box">
              <span className="tooltip_tx bottom">데이터 업로드 완료</span>
            </div>
          </div>
        </Styled.tooltip>
      }
    >
    </CustomTooltip>
  )
}

const Styled = {
  tooltip: styled.div`
   ${font(13, color.black_font)};
    .tooltip__row{
      margin:10px 0;
      ${floatClear};
    }
    .tooltip_img_box{
      width:25px;
      height:18px;
    }
    .tooltip__box{
      float:left;
      &:first-child{
        margin-right:8px;
      }
    }
    .tooltip_img{
      width:100%;
      height:100%;
    }
    .tooltip_tx{
      position:relative;
      &.top{
        top:5px;
      }
      &.bottom{
        top:5px;
      }
    }
  `
}

export default S_CustomCaseAppdata;