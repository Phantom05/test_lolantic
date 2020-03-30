import React, { useEffect } from 'react';
import styled from 'styled-components';
import { font, color } from 'styles/__utils';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import cx from 'classnames';
import { useImmer } from 'use-immer';
import { useDidUpdateEffect } from 'lib/utils';
import moment from 'moment';
import { compareProp } from 'lib/library';
import { mapper } from 'lib/mapper';
import Truncate from '@konforti/react-truncate';


/**
 * 
 * checked
 * onClick
 * info={
 *  caseId
    patient
    sender
    receiver
    dueDate
 * } 
 * @param {*} props object
 */

const initialState = {
  key: false,
  checked: false,
  expanded:false
}

const WorksCard = React.memo(function WorksCard(props) {
  const { onClick, type, info, checked = false,expanded } = props;
  const [values, setValues] = useImmer(initialState);
  const isListCard = type === 'list';
  const strDudate = info.dueDate && moment.unix(info.dueDate).format('YYYY-MM-DD');

  // console.log(info,'!!! worksCard');


  const RadioContent = isListCard
    ? <FormControlLabel
      value={info && info.id}
      control={
        <Radio
          className={cx("WorksCard__check_box", { "list": isListCard })}
          name="workCard"
          size="small"
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      }
    />
    : <Radio
      onClick={() => handleClick({ type: "onlyClick" })}
      checked={values.checked}
      className={cx("WorksCard__check_box", { "list": isListCard })}
      name="workCard"
      size="small"
      color="primary"
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />;

  const handleClick = config => {
    const { type } = config;
    console.log(type, 'type');
    if (type === 'onlyClick') {
      console.log('only');
      onClick && onClick({...info,onlyCheck:true})
    } else {
      onClick && onClick({...info,onlyCheck:false});
    }
  }

  useDidUpdateEffect(() => {
    setValues(draft => {
      draft.checked = checked;
    });
  }, [checked]);

  useEffect(() => {
    setValues(draft => {
      draft.checked = checked;
    });
  }, []);


  let partnerName = info.receiver;
  if (partnerName) {
    if (partnerName.manager) {
      partnerName = `${partnerName.company} (${partnerName.manager})`
    } else {
      partnerName = partnerName.company
    }
  }

  return (
    <Styled.WorksCard labelText={props.labelText} labelColor={props.labelColor} onClick={() => { }}>
      <Grid
        container
        className="WorksCard__row"
        spacing={0}
      >
        <Grid item xs={1} className="WorksCard__check">
          {RadioContent}
        </Grid>

        <Grid item xs={11} className={cx("WorksCard__list_row", { "list": isListCard })} onClick={handleClick}>
          <Grid container className={cx("WorksCard__list_con_box")}>
            {/* <Grid item xs={3} className="WorksCard__table">
              <h6 className="WorksCard__title">Case ID</h6>
              <div className={cx("WorksCard__contents", { "list": isListCard })}>{checkValueDash(info.caseId)}</div>
            </Grid> */}
            <Grid item xs={3} className="WorksCard__table info_table">
              <h6 className="WorksCard__title">Pateint</h6>
              <div className={cx("WorksCard__contents", { "list": isListCard })}>
                <Truncate lines={2} ellipsis="...">
                  {checkValueDash(info.patient)}
                </Truncate>
              </div>
            </Grid>
            <Grid item xs={3} className="WorksCard__table info_table">
              <h6 className="WorksCard__title">{mapper.sender}</h6>
              <div className={cx("WorksCard__contents", { "list": isListCard })}>
                <Truncate lines={2} ellipsis="...">
                  {checkValueDash(info.sender && info.sender.company)}
                </Truncate>
              </div>
            </Grid>
            <Grid item xs={3} className="WorksCard__table info_table">
              <h6 className="WorksCard__title">{mapper.receiver}</h6>
              <div className={cx("WorksCard__contents", { "list": isListCard })}>
                <Truncate lines={2} ellipsis="...">
                  {checkValueDash(partnerName)}
                </Truncate>
              </div>
            </Grid>
            <Grid item xs={2} className="WorksCard__table date_table">
              <h6 className="WorksCard__title">Due Date</h6>
              <div className={cx("WorksCard__contents", { "list": isListCard })}>
                <Truncate lines={2} ellipsis="...">
                  {checkValueDash(strDudate)}
                </Truncate>
              </div>
            </Grid>
            <Grid item xs={1} className="WorksCard__table arrow_icon">
              {!isListCard && <ExpandMoreIcon />}
            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Styled.WorksCard>
  );
}, (nextProp, prevProp) => {
  return compareProp(nextProp, prevProp, ['type', 'info', 'checked'])
});



const checkValueDash = val => val? val : '-';

const Styled = {
  WorksCard: styled.div`
  width:100%;
  & {
    .MuiFormControlLabel-root{
    margin:0;
  }
  .WorksCard__row,.MuiGrid-grid-xs-1{
    position: relative;
    
  }
  .MuiRadio-colorPrimary.Mui-checked{
    color:${color.blue};
  }
  .WorksCard__check_box{
    position: relative;
    top: 40%;
    left: 10px;
    padding: 0;
  
    &.list{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }
  }

  .MuiGrid-grid-xs-1{
    max-width: 5%;
    flex-basis: 5%;
  }
  .WorksCard__list_row {
    max-width: 93%;
    flex-basis: 93%;
  }
  .MuiCheckbox-colorPrimary.Mui-checked{
    color:red;
  }

  .WorksCard__list_row{
    position: relative;
    ${font(16, color.black_font)};
    border: 1px solid ${color.gray_border6};
    border-radius: 5px;
    background: ${color.white};
    padding: 25px 0 20px;
    transition: all .3s;
    cursor: pointer;
    z-index: 1;
    &.list{
      margin-bottom:5px;
      padding:25px 0px 10px 0;
    }

    &::before{
      position: absolute;
      ${font(14, color.white)};
      display: block;
      content:"${props => props.labelText}";
      top: -10px;
      left: 15px;
      width: 100px;
      background: ${props => props.labelColor};
      
      border-radius: 15px;
      line-height: 24px;
      height: 24px;
      text-align: center;     
    }
    &:hover{
      border: 1px solid ${color.blue};
      box-shadow: 0px 0px 5px 2px ${color.blue_week}; 
    }
  }
  .WorksCard__table{
    padding-left: 20px;

    &.arrow_icon{
      position:relative;
      color: ${color.blue};
      text-align: center;
      max-width: 2%;
      flex-basis: 2%;
      padding:0;
}
      & > svg{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
      }
      /* padding-top: 10px; */

      &.info_table{
        max-width: 27.5%;
        flex-basis: 27.5%;
      }
      &.date_table{
        max-width: 13%;
        flex-basis: 13%;
      }
    }
  }
  .WorksCard__contents{
    ${font(15, color.black_font)};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    line-height:20px;
    &.list{
      ${font(14)};
    }
  }

  .WorksCard__title{
    ${font(13, color.gray_text)};
    line-height: 24px;
  }
  
`
}


export default WorksCard;