import React, { useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';
import moment from 'moment';
import { font, color } from 'styles/__utils';
import { HtmlConverter } from 'components/base/helpers/convert';
import { PlainModal } from 'components/common/modal';
import { useImmer } from 'use-immer';
import { ModalMemoContent,ModalComplete,ModalIndicationContent } from 'components/common/modal';
import { PlainEditor } from 'components/common/editor';
import { useSelector } from 'react-redux';
import {withRouter} from 'react-router-dom';
import {storage} from 'lib/library';
import {CaseCardArea} from 'components/common/card';
import { S_CustomCaseTimeLine } from 'components/common/tooltip';
import {FullScreenLoading } from 'components/base/loading';
import { ENV_MODE_DEV } from 'lib/setting';
import {mapper} from 'lib/mapper';

import {
  checkValueDash,
  convertDateTime,
} from 'lib/library';
import { 
  INFO_CASE_LOAD_SAGAS,
  INFO_WORKS_CASE_UPDATE_SAGAS,
  INFO_CASE_COMPLETE_SAGAS,
} from 'store/actions';
import _ from 'lodash';


const intialState= {
  modal: {
    isPlainModalShow: false,
    value: '',
    isUpdateShow:false,
    isUpdateType:"",
  },
  isUpdateModal:{
    isShow:false,
    title:"",
    content:""
  },
  inticationModal:{
    isShow:false,
    content:""
  },
  memo: {
    isEdit: false,
    content: "",
    currentType:"",
    sender:{
      content:"",
      isEdit:false,
    },
    receiver:{
      content:"",
      isEdit:false,
    }
  },
  render:{
    index:0
  },
  updateData:{

  },
  isComplete:'',
  data:{}
}


const CaseCardDetail = React.memo(function CaseCardDetail(props) {
  const [values, setValues] = useImmer(intialState);
  const { info } = props;
  const { auth: authReducer, info:infoReducer,listing:listingReducer } = useSelector(state => state);
  
  const storageCurrentCode = storage.get('worksCurrentCode') || false;
  const currentCode = storageCurrentCode && storageCurrentCode.currentCode;

  const userCode         = authReducer.signIn.profile.userCode;
  const isSenderCase     = info && info.sender && info.sender.code === userCode;
  const isReceiverCase   = info && info.receiver && info.receiver.code === userCode;
  const senderName       = info && info.sender && info.sender.company;
  const senderCode       = info && info.sender && info.sender.code;
  const receiverManager  = info && info.receiver && info.receiver.manager;
  const senderInfo       = info && senderName && senderCode && `${info.sender.company} (${senderCode})`;
  const curCase          = currentCode === info.caseCode;
  const strDueDate       = moment.unix(info.dueDate).format('YYYY-MM-DD');
  const ManagerName      = info.responsibility;
  let currentType        = isSenderCase ? 'sender':isReceiverCase ? "receiver":"";
  let isMemoEdit         = values.memo.isEdit;
  // const receiverName  = info && info.receiver && info.receiver.company;
  // const receiverCode  = info && info.receiver && info.receiver.code;
  // const rMemoSender   = infoReducer.case.update.sender.memo;
  // const rMemoReceiver = infoReducer.case.update.receiver.memo;
  let receiverInfo       = info.receiver ;
  if(receiverInfo){
    if(receiverInfo.manager){
      receiverInfo = `${receiverInfo.company} (${receiverManager})`;
    }else{
      receiverInfo = receiverInfo.company;
    }
  }



  // DEBUG:
  // const valuesData = values.data;
  const valuesData = info;


  let curStage         = valuesData.stage;
  let isCompleteStage  = valuesData.stage === 5;
  let isDownloadStage  = valuesData.stage === 4;

  const rCaseUpdate            = infoReducer.case.update;
  const rCaseComplete          = infoReducer.case.complete;
  // const isUpdateTypeSuccess = values.modal.isUpdateType === 'success';
  // const timelineInfo        = timeline;

  const downloadStage = info.stage === 4;
  const {
    create    : timelineCreate,
    working   : timelineWorking,
    upload    : timelineUpload,
    read      : timelineRead,
    download  : timelineDownload,
    completed : timelineCompleted,
  } = info.timeline;

  const timeLineList = [
    {
      id: 0,
      title: "Create",
      time: timelineCreate,
    },
    {
      id: 1,
      title: "Working",
      time: timelineWorking,

    },
    {
      id: 2,
      title: "Uploaded",
      time: timelineUpload,

    },
    {
      id: 3,
      title: "Read",
      time: timelineRead,

    },
    {
      id: 4,
      title: "Downloaded",
      time: timelineDownload,

    },
    {
      id: 5,
      title: "Completed",
      time: timelineCompleted,

    },
  ];

  const customSenderInfo ={
    caseCode : valuesData.caseCode,
    caseId   : valuesData.caseId,
    stage    : valuesData.stage,
    userCode,
    ...info.sender,
    memo:values.memo.sender.content,
    // memo:rMemoSender || info.sender.memo
  };

  
  let customReceiverInfo ={
    caseCode : valuesData.caseCode,
    caseId   : valuesData.caseId,
    stage    : valuesData.stage,
    userCode,
    modifyState : true,
    ...info.receiver,
    memo:values.memo.receiver.content,
    // memo:rMemoReceiver || info.receiver.memo
  };

  const handleClick = config => {
    const { type, name, value } = config;
    const isSender = userCode === info.senderCode;

    if(type === 'memo') {
      if (name === 'edit_ok') {
        const memoConfig = {
          userCode: userCode,
          caseCode: info.caseCode,
          memo: values.memo.content,
          completeFlag: false,
          type:isSender? 0 : 1
        }
        INFO_WORKS_CASE_UPDATE_SAGAS(memoConfig);
      } else {
        setValues(draft => {
          draft.memo.isEdit = name === 'edit';
          draft.modal.isPlainModalShow = !draft.modal.isPlainModalShow;
          draft.modal.value = value;
        });
      }

    }
    if(config === 'dim') {
      setValues(draft => {
        draft.modal.isPlainModalShow = false;
        draft.isUpdateModal.isShow =false;
        if(currentType === 'sender'){
          draft.memo.content = customSenderInfo.memo
        }
        if(currentType === 'receiver'){
          draft.memo.content = customReceiverInfo.memo
        }
      });
    }
    if(config === 'dim_ok') {
      setValues(draft => {
        draft.modal.isPlainModalShow = false;
        draft.isUpdateModal.isShow =false;
        draft.modal.isUpdateShow = false;
        draft.inticationModal.isShow =false;
        draft.render.index = draft.render.index+1
      });
      INFO_CASE_COMPLETE_SAGAS.init();
    }
    if(type === 'setting'){
      const loadConf ={
        userCode : userCode,
        caseCode : info.caseCode,
        // type:"modify"
      };
      INFO_CASE_LOAD_SAGAS(loadConf);
    }
    if(type === 'complete'){
      if(name === "complete"){
        // NOTE: 백엔드 에이피아이 나오면 보내기, memo가 없어질거고 completeplg 랑 userCode,caseCode 만 있을거임.
        const completeConf = {
          userCode: userCode,
          caseCode: info.caseCode,
          isComplete: true,
        }
        INFO_CASE_COMPLETE_SAGAS(completeConf)
      }
      if(name === "complete_cancel"){
        const completeConf = {
          userCode: userCode,
          caseCode: info.caseCode,
          isComplete: false,
        }
        console.log(completeConf,'completeConf');
        INFO_CASE_COMPLETE_SAGAS(completeConf)
      }
    }
    if(type === 'indication'){
      setValues(draft=>{
        draft.inticationModal.isShow = true;
      })
    }
  }

  const handleBlur = config => {
    const {type,value} = config;
    console.log(config);
    if(type){
      setValues(draft => {
        draft.memo.currentType = type;
        draft.memo.content = value.data;
      });
    }
  }

  // NOTE: 로드 성공시
  const successLoadCurrent = infoReducer.case.load.success && curCase;
  useEffect(()=>{
    if(successLoadCurrent){
      props.history.push('/case');
    }
  },[successLoadCurrent]);
  

  // NOTE: 케이스 업데잍 ㅡ성공시
  const successAndCurrent = rCaseUpdate.success && curCase;
  useEffect(()=>{
    if(successAndCurrent){
      const cType = values.memo.currentType;
      if(cType){
        setValues(draft=>{
          draft.memo[cType].content = values.memo.content;
        });
        INFO_WORKS_CASE_UPDATE_SAGAS.init({type:"default"});
      }
    }
  },[successAndCurrent]);


  
  // DEBUG: 주석풀기
  useEffect(()=>{
    setValues(draft=>{
      draft.memo.sender.content = info.sender.memo;
      draft.memo.receiver.content = info.receiver.memo;
    });
  },[info.sender.memo,info.receiver.memo]);

  // NOTE: 메모 기존데이터 있으면 업데이트
  const hasReducerSenderMemo = rCaseUpdate.sender.memo ;
  const hasReducerReceiverMemo = rCaseUpdate.receiver.memo;
  useEffect(()=>{
    if(curCase){
      setValues(draft=>{
        if(hasReducerSenderMemo){
          draft.memo.sender.content = hasReducerSenderMemo;
        }else if (hasReducerReceiverMemo){
          draft.memo.receiver.content = hasReducerReceiverMemo;
        }
      });
    }
  },[hasReducerSenderMemo, hasReducerReceiverMemo]); 


  // NOTE: memo modify
  const isModifyMemoFailure = rCaseUpdate.failure && curCase;
  const isModifyMemoSuccess = rCaseUpdate.success && curCase;
  useEffect(()=>{
    if(isModifyMemoSuccess && curCase){
      setValues(draft => {
        // draft.modal.isPlainModalShow = false;
        draft.modal.isUpdateShow = true;
        draft.modal.isUpdateType = 'success'
        draft.isUpdateModal.isShow =true;
        draft.isUpdateModal.title = "수정 완료";
        draft.isUpdateModal.content = "메모가 수정되었습니다."
      });
    }
    if(isModifyMemoFailure && curCase){
      setValues(draft => {
        // draft.modal.isPlainModalShow = false;
        draft.modal.isUpdateShow = true;
        draft.modal.isUpdateType = ' falilre';
        draft.isUpdateModal.isShow =true;
        draft.isUpdateModal.title = "실패하였습니다.";
        draft.isUpdateModal.content = "잠시 후 다시 시도해주세요."
      });
    }
  },[isModifyMemoFailure,isModifyMemoSuccess]);


  // NOTE: works complete 
  const isCompleteUpdateSuccess = rCaseComplete.success && curCase;
  const isCompleteUpdateFailure = rCaseComplete.failure && curCase;
  useEffect(()=>{
    if(isCompleteUpdateSuccess){
      console.log('complete update success');
      const rIsComplete = rCaseComplete.isComplete;
      setValues(draft=>{
        // draft.modal.isUpdateShow = true;
        draft.isUpdateModal.isShow = true;
        draft.isUpdateModal.title ="업데이트 완료!";
        draft.isUpdateModal.content ="업데이트가 완료되었습니다.";
        draft.data.stage = rIsComplete ? 5 : 4
      });
    }
    if(isCompleteUpdateFailure){
      console.log('complete update failure');
      setValues(draft=>{
        draft.isUpdateModal.isShow = true;
        draft.isUpdateModal.title ="업데이트 실패";
        draft.isUpdateModal.content ="업데이트에 실패하였습니다.";
      })
    }
  },[isCompleteUpdateSuccess,isCompleteUpdateFailure]);

  // DEBUG: 주석풀기
  // useEffect(()=>{
  //   setValues(draft=>{
  //     draft.data = info;
  //   })
  // },[info]);

  // DEBUG: 렌더링 잡아보기
  // console.log('TT');

  return (
    <>
    {curCase 
      && (rCaseUpdate.pending || rCaseComplete.pending) 
      && <FullScreenLoading dim={true}/>
    }
    
    {/* NOTE: 깜빡임의 원인은 모달을 2개써서그럼. 나중에 잡기 */}
      <PlainModal
        isOpen={values.modal.isPlainModalShow}
        content={
          <ModalMemoContent
            contentHeight={!isMemoEdit && 250}
            content={
              isMemoEdit
                ? <PlainEditor 
                    maxLength={5000}
                    height={300}
                    onBlur={(value)=>handleBlur({type:currentType,value})} 
                    content={values.modal.value} 
                  />
                : <HtmlConverter>{values.modal.value}</HtmlConverter>
            }
            isEdit={isMemoEdit}
            onClick={handleClick}
          />}
        onClick={handleClick}
        dim={isMemoEdit ? false : true}
        width={380}
      />
      <PlainModal
        isOpen={values.isUpdateModal.isShow}
        content={<>
          <ModalComplete
            title={values.isUpdateModal.title}
            onClick={()=>handleClick('dim_ok')}
            children={values.isUpdateModal.content}
          />
        </>}
        dim={false}
        onClick={()=>handleClick('dim_ok')}
        width={380}
      />
      <PlainModal
        isOpen={values.inticationModal.isShow}
        content={ <ModalIndicationContent  info={'hello'} />}
        dim={true}
        width={380}
        onClick={()=>handleClick('dim_ok')}
      />

      <Styled.CaseCardDetail>
        <Grid container className="WorksCardListPanel__info_box">

          {/* <Grid container className="WorksCardListPanel__row">
            <ShareIcon className="WorksCardListPanel__share_btn" />
          </Grid> */}

          <Grid container className="WorksCardListPanel__row">
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Case ID</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">{info.caseId}</div>
            </Grid>
          </Grid>

          <Grid container className="WorksCardListPanel__row">
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Pateint Name</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">{info && info.patient}</div>
            </Grid>
          </Grid>

          <Grid container className="WorksCardListPanel__row">
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Due Date</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">{strDueDate}</div>
            </Grid>
          </Grid>

          <Grid container className="WorksCardListPanel__row">
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">{mapper.sender}</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">{checkValueDash(senderInfo)}</div>
            </Grid>
          </Grid>

          <Grid container className="WorksCardListPanel__row">
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">{mapper.receiver}</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">{checkValueDash(receiverInfo)}</div>
            </Grid>
          </Grid>

          <Grid container className="WorksCardListPanel__row">
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Manager</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">{checkValueDash(ManagerName)}</div>
            </Grid>
          </Grid>

          {ENV_MODE_DEV &&
            <Grid container className="WorksCardListPanel__row">
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title indication">Indication</div>
            </Grid>
            <Grid item xs={9}>
              <div className="WorksCardListPanel__con">
                <button
                  className="WorksCardListPanel_btn"
                  onClick={()=>handleClick({type:"indication"})}
                >View</button>
              </div>
            </Grid>
            </Grid>
          }

          <Grid container className="WorksCardListPanel__row">
            <Grid container className="WorksCardListPanel__title">
              <span className="WorksCardListPanel__title_tx">Case TimeLine</span>
                <S_CustomCaseTimeLine iconStyle={`top:-4px`}/>
              </Grid>
            <Grid container className="WorksCardListPanel__con">
              <div className="WorksCardListPanel__progressbar">
                <ul className="WorksCardListPanel__progressbar_box">
                  {timeLineList.map(item => {
                    return (
                      <li 
                        key={item.id} 
                        className={cx("WorksCardListPanel__progressbar_step", 
                        { active:  item.id <= curStage,
                          upload:item.id === 2 })}
                      >
                        {item.title} 
                        <p className="date_tx">{convertDateTime({ value: item.time, format: "MM-DD, HH:mm", isNull: '-' })}</p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Grid>
          </Grid>

          {/* DEBUG:  주석풀기 */}
          {/* sender area */}
          <CaseCardArea
            caseType={isReceiverCase}
            info={customSenderInfo}
            handleClick={handleClick}
            type="sender"
            hasReceiver={info && info.receiver.company}
          />

          {/* receiver area */}
          <CaseCardArea
            caseType={isSenderCase}
            info={customReceiverInfo}
            handleClick={handleClick}
            type="receiver"
            hasReceiver={info && info.receiver.company}
          />

          <Grid container className={cx(
            "WorksCardListPanel__row", "area_row", 
            {hasNotReceiver:(!info && info.receiver.company || !downloadStage) && (!isCompleteStage && !isDownloadStage)},
            { isNotShow: isSenderCase }
          )}>
            
            <Grid item xs={3}>
              <div className="WorksCardListPanel__title">Complete</div>
            </Grid>
            <Grid item xs={9}>
              <Grid container className={cx("WorksCardListPanel__con", "contents")}>
                <button 
                  className={cx("WorksCardListPanel__complete")}
                  onClick={()=>handleClick({type:"complete",name:isCompleteStage?"complete_cancel":"complete"})}
              >{isCompleteStage?"Cancel":"Complete"}</button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Styled.CaseCardDetail>
    </>
  );
},(prevProps, nextProps) => {
  return nextProps.info === prevProps.info;
})




const Styled = {
  CaseCardDetail: styled.div`
  .WorksCardListPanel_btn{
    padding: 5px 15px;
    min-width:100px;
    background: ${color.blue};
    ${font(14, color.white)};
    margin-right: 5px;
    border-radius: 2px;
    border: none;
    transition: all .2s;
    cursor: pointer;

    &:hover {
      background: ${color.blue_hover};
    }
  }

  .isShow{
    display:block
  }
  .isNotShow{
    display:none;
  }
  .hasNotReceiver{
    position: relative;
    pointer-events: none;
    &:after{
      display:block;
      position:absolute;
      content:'';
      left:0;
      top:0;
      width:100%;
      height:100%;
      background:white;
      opacity:.5;
      z-index:1;
    }
  }


  .WorksCardListPanel__info_box{
    border: 1px solid ${color.gray_border6};
    border-radius: 10px;
    padding: 30px;
    padding-top: 40px;
    position: relative;
    margin-bottom:20px;
    
  }
  
  .WorksCardListPanel__share_btn {
    color: ${color.black_font};
    position: absolute;
    top:40px;
    right: 30px;
  }
  .MuiExpansionPanelDetails-root{
    padding: 0;
  }

  .WorksCardListPanel__row{
    padding-bottom: 25px;

    &.ribbon{
      padding-bottom: 20px;
    }

    &.area_row{
      padding-bottom: 20px;
    }
  }
  
  .WorksCardListPanel__title{
    ${font(16, color.black_font)};
    font-weight: 600;
    position:relative;
    &.indication{
      top:5px;
    }
  }
  .WorksCardListPanel__title_tx{
    margin-right:5px;
  }

  .WorksCardListPanel__con{
    ${font(16, color.gray_font)};
  }

  .MuiStepper-root {
    padding: 20px;
  }
  .MuiStepButton-root{
    width: 150%;
    margin: -24px -30px;
    padding: 24px 0;

  }
  .MuiStepConnector-alternativeLabel {
    top: 12px;
    left: calc(-50% + 4px);
    right: calc(50% + 19px);
    position: absolute;
  }
  .MuiStepLabel-labelContainer{
    ${font(14, color.gray_font)};
  }
  .MuiStepLabel-label{
    ${font(14, color.disable_btn)};
  }
  .MuiStepLabel-label.MuiStepLabel-active{
    ${font(14, color.blue)};
  }
  .MuiStepIcon-root{
    color: ${color.disable_btn};
  }
  .MuiStepIcon-root.MuiStepIcon-active {
    color: ${color.blue};
  }

  .WorksCardListPanel__progressbar {
    margin-top: 60px;
    width:100%;
  }
  .WorksCardListPanel__progressbar_box {
    width: 100%;
    margin: 0;
    padding: 0;
    ${font(14, color.disable_btn)};
  }
 
 .WorksCardListPanel__progressbar_step{
   position: relative;
   display: inline-block;
   text-align: center;
   width:calc(100% / 6);
   @media (max-width:1000px){
    width:calc(100% / 3);
    &.upload{
      margin-bottom:40px;
    }
    &.upload:after{
      display:none;
    }
   }
    &:before {
       /* position: relative; */
       position:absolute;
       content: attr(data-step);
       display: block;
       background: ${color.disable_btn};
       width: 20px;
       height: 20px;
       text-align: center;
       /* margin: 0 42px; */
       /* margin-bottom: 10px; */
       line-height: 20px;
       border-radius: 100%;
       z-index: 1000;
       left:50%;
       top:-30px;
       transform:translateX(-50%);
     }
 
     &:after {
       content: '';
       position: absolute;
       display: block;
       background: ${color.disable_btn};
       width: 100%;
       height: 1px;
       top: -20px;
       left: 50%;
     }
     &:last-child:after {
       display: none;
     }
     &.active {
       color: ${color.blue};
       
       &:before {
         background: ${color.blue};
       }
     }
  }
    .date_tx{
      padding-top: 5px;
     ${font(13, color.gray_font)};
   }

   .WorksCardListPanel__complete{
     padding: 5px 15px;
     border: none;
     background: ${color.complete_btn};
     ${font(14, color.white)};
     border-radius: 2px;
     cursor:pointer;
     transition: all .2s;
   
     &:hover {
      background: ${color.complete_btn_hover};
      color: ${color.white};
    }
   }
   
  `
}
export default withRouter(CaseCardDetail);


  // const [checked, setChecked] = React.useState(true);
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [completed, setCompleted] = React.useState(new Set());
  // const [skipped, setSkipped] = React.useState(new Set());
  // const steps = getSteps();

  // const totalSteps = () => {
  //   return getSteps().length;
  // };

  // const skippedSteps = () => {
  //   return skipped.size;
  // };

  // const completedSteps = () => {
  //   return completed.size;
  // };

  // const allStepsCompleted = () => {
  //   return completedSteps() === totalSteps() - skippedSteps();
  // };

  // const isLastStep = () => {
  //   return activeStep === totalSteps() - 1;
  // };

  // const handleNext = () => {
  //   const newActiveStep =
  //     isLastStep() && !allStepsCompleted()
  //       ? // It's the last step, but not all steps have been completed
  //         // find the first step that has been completed
  //         steps.findIndex((step, i) => !completed.has(i))
  //       : activeStep + 1;

  //   setActiveStep(newActiveStep);
  // };


  // const handleComplete = () => {
  //   const newCompleted = new Set(completed);
  //   newCompleted.add(activeStep);
  //   setCompleted(newCompleted);

  //   /**
  //    * Sigh... it would be much nicer to replace the following if conditional with
  //    * `if (!this.allStepsComplete())` however state is not set when we do this,
  //    * thus we have to resort to not being very DRY.
  //    */
  //   if (completed.size !== totalSteps() - skippedSteps()) {
  //     handleNext();
  //   }
  // };


