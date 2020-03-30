import React, {useCallback} from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { color, font,  dotdotdot } from 'styles/__utils';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {PlainTooltip} from 'components/common/tooltip';

/**
 * onClick
 * id
  company
  address
  type
 * @param {*} props 
 */
function PartnersListItem(props) {
  const {option} = props;
  const handleClick = () => {
    props.onClick && props.onClick({ ...props,key: props.id })
  }

  // radio 클릭 관리
  const handleInnerClick = useCallback(e =>{
    // e.stopPropagation();
    props.onClick && props.onClick({ ...props,key: props.id, selectOption: 'onlySelect' })
  },[]);

  // 파트너 타입 객체 가공
  const partnerTypeArr = Object.keys(props.type) 
  const partnerType = partnerTypeArr.length ?
   partnerTypeArr.filter(i =>props.type[i] ? i : false)
    .map(i => {
      if(i === 'clinic'){
            return 'Clinic';
          }else if(i === 'milling'){
            return 'Milling';
          }else if(i === 'lab'){
            return 'Lab';
          }
    }).join(', ')
  : '-';
  // const partnerType = partnerTypeArr.length ? 
  // partnerTypeArr.filter(i => props.type[i] ? i : false).map(i => {
  //   if(i === 'clinic'){
  //     return 'C';
  //   }else if(i === 'milling'){
  //     return 'M';
  //   }else if(i === 'lab'){
  //     return 'L';
  //   }
  // }).join(', ')
  // : '-';

  const innerModal = () => {
      // onlyselect가 없을 때 modal도 같이 발생
      if(props.selectOption !=='onlySelect'){
      props.handleModal && props.handleModal({type: 'modalGetInfo', value: props.id});
    }
  }

  return (
    <Styled.PartnersListItem >
      <div className="list__row" onClick={handleClick}>
      <Grid container justify="space-between">
      <Grid item xs={1} className="list__box_item td">
          <span className="list__box_tx tx">
            <FormControlLabel
            className="radio_select"
            onClick={handleInnerClick}
              value={props.id}
              color="primary"
              name="partnersItem"
              control={<Radio color="primary" size="small" />}
            />
          </span>
        </Grid>

        <Grid item xs={2} className="list__box_item td">
          <span className="list__box_tx tx">
            {option === 'my'? props.userCode : props.code}
          </span>
        </Grid>
        <Grid item xs={3} className="list__box_item td"
          onClick={innerModal}
        >
          <span className="list__box_tx tx">
            <p>
            {option === 'my'? props.companyName : props.company}
            <br />
            {
              `(${props.manager}/${props.name})`
            }
            </p>
          </span>
        </Grid>
        <Grid item xs={4} className="list__box_item td">
          <span className="list__box_tx tx">
            <PlainTooltip
              title={props.address}
              placement="bottom"
              isActive={true}
              interactive={false}
            >
              <p>
              {props.address}
              </p>
            </PlainTooltip>
          </span>
        </Grid>
        <Grid item xs={2} className="list__box_item td">
          <span className="list__box_tx tx">
            {partnerType}
          </span>
        </Grid>
        
      </Grid>
      </div>
    </Styled.PartnersListItem>
  )
}

const Styled ={
  PartnersListItem:styled.div`
    .list__row{
      border-bottom:1px solid ${color.gray_border2};
      cursor: pointer;

      &:hover{
        background:${color.blue_week_hover};
      }
    }
    /* .list__box_item{
      position:relative;
      height:40px;
      border-right:1px solid ${color.gray_border6};
      text-align:center;
      
      &:last-child{
        border-right:0;
      }
      &.th{
        background:${color.gray_bg1};
      }
      &.td{

      }
    } */
    .list__box_tx{
      & .radio_select{
        margin: 0;
      }
      &.tx{
        padding:0 5px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        ${font(14, color.black_font)};
        ${dotdotdot};
        width:100%;
        line-height: 30px;
      }
      &.bold{
        font-weight:600;
      }
      & .tooltip__wapper{
        vertical-align: middle;
      }

      & p{
        ${dotdotdot};
        white-space: pre-line;
        line-height: 1.3;
      }
    }
    .MuiRadio-colorPrimary.Mui-checked{
      color: ${color.blue};
    }
  `
}

export default PartnersListItem;
