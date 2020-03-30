import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { font, color } from 'styles/__utils';
import cx from 'classnames';
import moment from 'moment';


function AlertListItem(props) {
  const {
    data, 
    handleCheck,
    checked,
    handleClick,
  } = props;
  const {
    eventLogIdx,
    event,
    enrollDate,
    relateUserCode,
    caseCode,
    type,
    eventTypeIdx,
    readState
  } = data;
  
    return (
      <Styled.AlertListItem className={readState? 'read' : ''}>
        <Grid container className="AlertListItem__list_box">
          <Grid item xs={1} className={cx("AlertListItem__list", "alert_checkbox")}>
            <Checkbox
            value={eventLogIdx}
            checked={checked[eventLogIdx] === undefined? false : checked[eventLogIdx]}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            onChange={handleCheck({type: 'single'})}
            />
          </Grid>
          <Grid item xs={2} className={cx("AlertListItem__list", "alert_date")}>
            {moment.unix(enrollDate).format('YY-MM-DD')}
          </Grid>
          <Grid item xs={9} className={cx("AlertListItem__list", "alert_con")}>
            <Grid container className={cx("AlertListItem__list_con_box")}>
              <>
                {
                  // 프로젝트 생성 이벤트 발생시 해당 works로 링크 연결
                  type === 9?
                  <Grid item xs={9}
                    className={cx("AlertListItem__list_con", "alert_con_tx", "hover")}
                    onClick={handleClick({type: 'link', caseCode: caseCode})}
                  >
                    {event}
                  </Grid>
                  :
                  <Grid item xs={9}
                    className={cx("AlertListItem__list_con", "alert_con_tx")}
                  >{event}</Grid>
                }
              </>
              {
                // 파트너 요청 받을 때 허용 버튼
                type === 5?
                (!readState ? 
                <Grid item xs={3} className={cx("AlertListItem__list_con", "alert_con_btn")}>
                    <button className="alert_btn" onClick={handleClick({type: 'accept', partnerCode: relateUserCode})}>Accept</button>
                    <button className="alert_btn" onClick={handleClick({type: 'deny', partnerCode: relateUserCode})}>Deny</button>
                </Grid>
                :
                ''
                )
                :
                ''
              }
            </Grid>
          </Grid>
        </Grid>

      </Styled.AlertListItem>
    );
  }


  const Styled = {
  AlertListItem: styled.div`
  position: relative;
  /* &.read:after{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 2px;
    background-color: red;
  } */
  &.read .AlertListItem__list_box{
    color: #ddd;
  }

  .AlertListItem__list_box{
    ${font(16, color.black_font)};
    padding: 5px 0;
    border-bottom: 1px solid ${color.gray_border6};

    /* &:first-child{
      border-top: 1px solid ${color.gray_border6};
    } */
  }
  .AlertListItem__list {
    height: 46px;
    line-height: 46px;
    &.alert_date{
      ${font(16, color.gray_font)};
    }
  }

  .MuiCheckbox-colorPrimary.Mui-checked{
    color: ${color.blue};
  }
  
  .alert_con_tx{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .hover{
    cursor: pointer;

    a {
      display: block;
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .alert_btn{
    border: 1px solid ${color.blue};
    padding: 3px 10px;
    background: ${color.white};
    ${font(14, color.black_font)};
    margin-left: 5px;
    border-radius: 2px;
    cursor: pointer;
    transition: all .2s; 

    &:hover{
      background: ${color.blue};
    ${font(14, color.white)};
    }
  }


  `
  }

  export default AlertListItem;