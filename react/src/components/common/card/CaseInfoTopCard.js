
import React, { useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { compareProp } from 'lib/library';
import { font, color, dotdotdot } from 'styles/__utils';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { CustomTooltip, S_CustomCasePartner } from 'components/common/tooltip';
import { DatePicker } from 'components/common/input';
import { regName } from 'lib/library';
import { DateConverter } from 'components/base/helpers/convert';
import { useImmer } from 'use-immer';
import { mapper } from 'lib/mapper';
import {DropDownInput,TestDropInput} from 'components/common/input';


const CaseInfoTopCardState = {
  patient: "",
  receiverName:"",
  senderName:"",
}

const CaseInfoTopCard = React.memo(function CaseInfoTopCard(props) {
  const classes = useStyles(CaseInfoTopCard);
  const [values, setValues] = useImmer(CaseInfoTopCardState)
  const { onChange, onClick, info, type, profile } = props;
  const { caseId, patient, dueDate, senderName,partner , 
    // receiverCompany, receiverManager
  } = info
  const partnerTooltipText = `My Page의 Partners에서 특정 기공소를 등록할 수 있습니다. 
  등록된 기공소가 기본으로 선택되며, 추가 등록을 통해 여러 기공소와 협력할 수 있습니다.`;

  const isCreateType = type === 'create';
  const isModifyMode = type === 'modify';
  const isSenderCase = profile.userCode === info.senderCode;
  const isSenderModifyMode = (isCreateType || isModifyMode && isSenderCase);
  const hasReceiverManager = partner.manager ? `(${partner.manager})` : "";


  const handleClick = name => e => {
    if (name === 'partners') {
      console.log(name);
      onClick(name)()
    }
  }
  
  const handleChange = (name, e) => {
    const target = e.target;
    if(name === 'patient'){
      if (target.value.length >= 100) {
        console.log('이름은 100자리까지만 가능합니다.');
        return;
      }
      if (!regName(target.value)) {
        console.log('정규식 실패');
        return
      }
      setValues(draft => {
        draft.patient = target.value
      });
    }
    if(name === 'senderName'){
      setValues(draft => {
        draft.senderName = target.value
      });
    }
  };

  const handleDateChange = date => {
    const moDate = moment(date).unix();
    onChange({ type: 'dueDate', value: moDate });
  };

  const handleBlur = (name, e) => {
    console.log(name,e);
    let value;
    if(name === 'responsibility'){
      value = e;
    }else{
      value = values[name] 
    }
    onChange({ type: name, value: value});
  }

  // NOTE: init data
  useEffect(() => {
    setValues(draft => {
      draft.patient = patient;
      draft.senderName = senderName;
    })
  }, [patient,senderName]);


  console.log(info,'info');

  
  return (
    <Styled.CreateCase>

      <Grid container className="CreateCase__row">
        <Grid item xs={2}>
          <span className="CreateCase__title">Case ID </span>
        </Grid>
        <Grid item xs={6}>
          <p className="CreateCase__text">{caseId}</p>
        </Grid>
        <Grid item xs className="CreateCase__button_col">
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            // type="file"
            hidden
          />
          <label htmlFor="contained-button-file" >
            {!isCreateType &&
              <Button
                onClick={onClick('new')}
                variant="contained"
                className="CreateCase__button new"
                component="span">New Case</Button>
            }

            <Button
              onClick={onClick('load')}
              variant="contained"
              className="CreateCase__button"
              component="span">Load</Button>
          </label>
        </Grid>
      </Grid>

      <Grid container className="CreateCase__row">
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={4}>
              <span className="CreateCase__title">
                Patient
                </span>
            </Grid>
            <Grid item xs={8}>
              {isSenderModifyMode
                ? <OutlinedInput
                  value={values.patient}
                  onChange={(e) => handleChange('patient', e)}
                  onBlur={(e) => handleBlur('patient', e)}
                  labelWidth={0}
                  className="CreateCase_input patient"
                />
                : <span className="CreateCase_load patient">{patient}</span>}

            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6} className="CreateCase__button_col">
          <Grid container>
            <Grid item xs={6}>
              <span className="CreateCase__title date">
                Due Date
                </span>
            </Grid>
            <Grid item xs={6}>
              {isSenderModifyMode
                ? <DatePicker
                  value={moment.unix(dueDate).toDate()}
                  className="CreateCase_input date"
                  onChange={handleDateChange}
                  autoOk={true}
                  disablePast={true}
                />
                : <span className="CreateCase_load date">
                  <DateConverter
                    timestamp={dueDate}
                    format="YYYY-MM-DD"
                  />
                  {/* {moment.unix(dueDate).format('YYYY-MM-DD')} */}
                </span>}
            </Grid>
          </Grid>

        </Grid>
      </Grid>

      <Grid container className="CreateCase__row">
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={4}>
              <div className="CreateCase__title">
                <span className="title__text">{mapper.receiver}</span>
                <CustomTooltip
                  type="help"
                  title={partnerTooltipText}
                  placement="right-start"
                  interactive={false}
                  baseStyle
                />
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="CreateCase__text">
                <CustomTooltip
                  title={<S_CustomCasePartner partnerInfo={partner} />}
                  block={true}
                  placement="bottom-start"
                  baseStyle
                  _style={{ 
                    top:`25px`,left:`-8px`
                    }}
                  // open={true}
                >
                  <span className="CreateCase_load tx">{partner.title && `${partner.title} ${hasReceiverManager}`}</span>
                </CustomTooltip>
              </div>
            </Grid>

            {isSenderModifyMode &&
              <Grid item xs={3} className="CreateCase__button_col">
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  hidden
                />
                <label htmlFor="contained-button-file">
                  <Button
                    onClick={handleClick('partners')}
                    variant="contained"
                    className="CreateCase__button"
                    component="span">Change</Button>
                </label>
              </Grid>
            }
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={6}>
              <span className="CreateCase__title manager">Manager</span>
            </Grid>
            <Grid item xs={6}>
             {/* <OutlinedInput
                  value={values.senderName}
                  onChange={(e) => handleChange('senderName', e)}
                  onBlur={(e) => handleBlur('senderName', e)}
                  labelWidth={0}
                  className="CreateCase_input patient"
                /> */}
              {isSenderModifyMode
                ?<DropDownInput 
                  defaultValue={info.responsibility}
                  value={values.senderName}
                  keywordList={info.responsibilityList}
                  onBlur={(e) => handleBlur('responsibility', e)}
                  boxStyle={{
                    marginTop:8
                  }}
                  inputStyle={{
                    padding: `8px 15px`,
                    width: `100%`,
                    height: `34px`,
                    fontSize: 12,
                  }}
                />
                : <span className="CreateCase_load patient">{info.responsibility}</span>}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Styled.GlobalStyles />
    </Styled.CreateCase>
  );
}, (nextProp, prevProp) => {
  return compareProp(nextProp, prevProp, ['info', 'type', 'profile'])
});

const useStyles = makeStyles(theme => ({
  root: {
  },
  notchedOutline: {
    '&$cssFocused $notchedOutline': {
      // borderColor: `red !important`,
    }
  },
  cssOutlinedInput: {

  },
  focused: {
    borderColor: 'black !important'
  },
  tool: {
    top: '-20px'
  }
}));


const Styled = {
  CreateCase: styled.div`
  &{
    .extraClass{
      font-size:10px;
      margin-top:0 !important;
    }
    .CreateCase__title{
      line-height: 16px;
      display:inline-block;
      font-weight:700;
      ${font(16, color.black_font)};
      &.date, &.manager{
        width:100%;
        margin-left:30px;
        text-align:center;
      }
    }
    .title__text{
      margin-right:5px;
    }
    .CreateCase__button_col{
      text-align:right;
    }
    .CreateCase__button{
      ${font(14, color.white)};
      background:${color.blue};
      box-shadow:none;
      padding: 5px 15px;
      border-radius: 3px;
      &:hover{
        background:${color.blue_hover};
        box-shadow:none;;
      }
      &.new{
        margin-right:5px;
      }
    }
    .CreateCase_input{
      display:inline-block;
      /* height:40px; */
      &.date{
        width:100%;
      }

      &.patient{
        width:100%;
      }
      &.patient input{
        padding:8px 15px;
        width:100%;
        height:34px;
        ${font(14, color.black_font)}
      }
      .MuiOutlinedInput-adornedEnd{
        padding-right:0;
      }
      &.date input{
        height:34px;
        padding:8px 15px;
        ${font(14, color.gray_font)};
        
      }
    }
    .CreateCase__row{
      height:50px;
      line-height:50px;
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline{
      border-color:${color.blue} !important;
    }
    .CreateCase_input.date.Mui-focused, .CreateCase_input.patient.Mui-focused fieldset{
      border:2px solid ${color.blue}
    }
    .CreateCase__text{
      position:relative;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      ${font(16, color.gray_font)};
    }
    .CreateCase_load{
      &.patient,&.tx,&.date{
        display:block;
        position:relative;
        top:1px;
        float:left;
        width:100%;
        ${font(16, color.gray_font)};
        ${dotdotdot};
      }
      &.date{
        text-align:left;
      }
    }
    .MuiOutlinedInput-root{
      border-radius: 3px;
    }

  }
  `,
  GlobalStyles: createGlobalStyle`
      .MuiPickersDay-daySelected{
        background-color:${color.blue} !important;
      };
    `
}

export default CaseInfoTopCard;