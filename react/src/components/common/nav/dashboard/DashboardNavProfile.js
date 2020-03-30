import React from 'react';
import styled from 'styled-components';
import {icon_alert,icon_unlogged_person, icon_alert_off} from 'components/base/images';
import { color, font } from 'styles/__utils';
import {PlainTooltip} from 'components/common/tooltip';
import {useSelector} from 'react-redux';
import Badge from '@material-ui/core/Badge';

function makeConnectView(state){
  return Array(state).fill(1).map((item,idx)=>{
    return <span key={idx} className="connect__ball"></span>
  })
}

function DashboardNavProfile(props) {
  let { title, 
        email, 
        connectState, 
        image, 
        alert,
        isConnect, 
        handleClick,
        message } = props;  
  const isMessageTooltipActive = message > 0 ? true : false;
  const alertIcon = alert && <span className="alert_icon">
    <img src={isMessageTooltipActive ? icon_alert : icon_alert_off} alt="alert icon" className="alert_icon_img"/>
  </span>;
  const profileImage = image ?image:icon_unlogged_person;
  const connectObj = {
    '1':1,
    "2":2,
    "3":3,
    "4":4
  }
  let connectView = connectObj[connectState];
  if(!connectView){
    connectView = null
  }else{
    if(!isConnect) connectState = 4;
    connectView = makeConnectView(connectState);
  }
  
  return (
    <Styled.DashboardNavProfile {...props}>
      <div className="profile__info row">
        <div className="profile__info_box">
          
         <div className="alert__icon_box">
          <Badge 
            badgeContent={message}
            color="secondary"
            // color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            max={999}
            onClick={() =>handleClick({type: 'alertLink'})}
          >
          </Badge>
         </div>
          <div className="profile__info img_con">
            <img src={profileImage} alt="profile imgage" className="profile__info img" />
          </div>
        </div>
      </div>
      <div className="profile__info row">
        <div className="profile__info text_box title">
          {title}
        </div>
        <address className="profile__info text_box email">
          {email}
        </address>
        <div className="profile__info text_box connect">
        {isConnect ? `on-line` : 'off-line'} {connectView}
        </div>
      </div>
    </Styled.DashboardNavProfile>
  );
}

const Styled = {
  DashboardNavProfile: styled.div`
    .profile__info{
      .connect__ball{
        display:inline-block;
        background:${({isConnect})=>isConnect? `green`: `gray`};
        width:10px;
        height:10px;
        border-radius:100%;
        margin-right:2px;
      }
      .profile__info_box{
        position:relative;
        /* border:1px solid red; */
        width:80px;
        margin:auto;
      }
      .alert__icon_box{
        text-align:right;
        cursor: pointer;
      }
      .MuiBadge-root{
        position:relative;
        top:10px;
        left:7px;
      }
      .MuiBadge-colorSecondary{
        background-color: ${color.red_alert1};
      }
      .alert_icon{
        width:20px;
        height:20px;
      }
      &.row:last-child{
        margin-top:15px;
        text-align:center;
      }
      &.text_box{
        margin-top:10px;
      }
      &.img_con{
        height:80px;
        overflow:hidden;
        border-radius:100%;
        border: 1px solid ${color.gray_border6};
      }
      &.img{
        width:100%;
        height:100%;
      }
      &.title{
        ${font(16,color.black_font)}
      }
      &.email{
        ${font(14,color.grayFont)}
      }
      &.connect{
        margin-top: 15px;
        ${font(14,color.black_font)}
      }
      
    }
    .alert_icon_img{
        width: 18px;
        height: 20px;
      }
  `
}
export default DashboardNavProfile;