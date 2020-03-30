import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { PlainTooltip,CustomTooltip } from 'components/common/tooltip';
import styled from 'styled-components';
import cx from 'classnames';
import { useImmer } from 'use-immer';
import { TeethModule } from 'components/common/module';
import { color, font } from 'styles/__utils';
import Button from '@material-ui/core/Button';
import { CaseMemo } from 'components/common/case';
import { Visible } from 'components/base/helpers/visible';
import { HtmlConverter } from 'components/base/helpers/convert';
import CreateIcon from '@material-ui/icons/Create';
import {compareProp} from 'lib/library';
import {mapper} from 'lib/mapper';

const CasePanelState = {
  indication: {
    isOpen: true,
    hidden: false,
    isEdit: false,
  },
  sender: {
    isOpen: true,
    hidden: false,
    isEdit: false,
    editor: {
      content: ``
    }
  },
  receiver: {
    isOpen: true,
    hidden: false,
    isEdit: false,
    editor: {
      content: ``
    }
  },
  heading: {
    position: 'relative'
  }
}

const CasePanel = React.memo(function CasePanel(props) {
  const {
    type,
    info,
    onSubmit,
  } = props;
  const classes = useStyles();
  const [panel, setPanel] = useImmer(CasePanelState);

  const isCreateType = type === 'create';
  const isModifyMode = type === 'modify';
  const isLoadType = type === 'load';
  const isSenderCase = info.userCode === info.senderCode;
  const isReceiverCase = info.userCode === info.receiverCode;
  const isIndicationEditMode = panel.indication.isEdit;
  const isActiveModifyBtn = isLoadType && isSenderCase;
  const isActiveReceiverMemoEditBtn = isLoadType && isReceiverCase;
  const isActiveIndicationSetBtn = isModifyMode && isSenderCase && isIndicationEditMode;


  const btnArr = [{
    isShow: isActiveModifyBtn,
    name: "modify",
    title: "Modify"
  },
  {
    isShow: isCreateType,
    name: "create",
    title: "Create"
  },
  {
    isShow: isModifyMode,
    name: "update",
    title: "Change"
  }]


  const handleClick = config => {
    const { type, value, name } = config;
    if (type === 'submit') {
      onSubmit({
        name: name,
        panel: panel
      })()
    }

    if (type === 'edit') {
      if (name === 'indication') {
        console.log('indication edit button');
      }
      if (name === 'receiver') {
        if (value === 'edit') {
          console.log(config,'Case panel memo');
          setPanel(draft => {
            draft.receiver.isEdit = true;
          });
          onSubmit({
            name: 'modify',
            panel: panel
          })()
        }
      }
    }
  }

  // NOTE: memo change
  const handleChange = type => (config) => {
    console.log(config.data,type);
    setPanel(draft => {
      draft[type].editor.content = config.data;
    })
  }

  const handleBlur = type => config => {
    console.log(config);
    setPanel(draft => {
      draft[type].editor.content = config.data;
    })
  }

  // NOTE: default setting
  useEffect(() => {
    if (isCreateType) {
      setPanel(draft => {
        draft.indication.isEdit = true;
        draft.sender.isEdit = true;
        draft.receiver.isEdit = true;
        draft.receiver.hidden = true;
      })
    } else if (isLoadType) {
      setPanel(draft => {
        draft.receiver.hidden = false;
        draft.receiver.isEdit = false;
        draft.sender.isEdit = false;
        draft.indication.isEdit = false;
        draft.sender.editor.content = info.senderMemo || '';
        draft.receiver.editor.content = info.receiverMemo || '';
      })
    }else if (isModifyMode){
      setPanel(draft => {
        draft.sender.editor.content = info.senderMemo || '';
        draft.receiver.editor.content = info.receiverMemo || '';
      })
    }
  }, [
    setPanel, 
    type, 
    isCreateType, 
    isLoadType, 
    info.senderMemo, 
    info.receiverMemo,
    isModifyMode]);

    const panelArr = [
    {
      type: "indication",
      summary:
        <MemoTitle
          title={"Indication"}
          showSetBtn={isActiveIndicationSetBtn}
          showEditBtn={false}
          type={'indication'}
          onClickEditBtn={() => handleClick({ type: 'edit', name: 'indication' })}
        />,
      details: <TeethModule />
    },
    {
      type: "sender",
      summary:
        <MemoTitle
          title={`${mapper.sender}'s  Memo`}
          showEditBtn={false}
          type={{ type: 'edit', name: 'sender' }}
        />,
      details: <>
        <Visible
          show={[isModifyMode, isSenderCase]}
          orShow={isCreateType}
          failure={<HtmlConverter>{info.senderMemo ||'-'}</HtmlConverter>}
          success={
            <>
            <CaseMemo
              // content={info.senderMemo || ""}
              content={panel.sender.editor.content}
              onChange={handleChange('sender')}
              onBlur={handleBlur('sender')} />
            </>
        } />
      </>,
    },
    {
      type: "receiver",
      summary:
        <MemoTitle
          stage={info.stage}
          title={`${mapper.receiver}'s  Memo`}
          showEditBtn={isActiveReceiverMemoEditBtn}
          onClickEditBtn={() => handleClick({ type: "edit", name: "receiver", value: 'edit' })}
          type={{ type: 'edit', name: 'receiver' }}
        />,
      details:
        <Visible
          show={[isModifyMode, isReceiverCase]}
          failure={<HtmlConverter>{info.receiverMemo || "-"}</HtmlConverter>}
          success={
            <CaseMemo
              // content={info.receiverMemo || ""}
              content={panel.receiver.editor.content}
              onChange={handleChange('receiver')}
              onBlur={handleBlur('receiver')} />}
        />
    },
  ];
  return (
    <Styled.CasePanel className={classes.root}>
      {panelArr.map((item, idx) => {
        let sectionArr = ['sender', 'indication'], hr;
        if (sectionArr.indexOf(item.type) !== -1) hr = <hr className="boundery__line" />;
        return (
          <div key={idx}>
            {hr}
            <ExpansionPanel
              className={cx('panel', { hidden: panel[item.type].hidden })}
              expanded={panel[item.type].isOpen}
            >
              <ExpansionPanelSummary
                aria-controls={`panel-${type}-a-content`}
                id={`panel-${type}-a-header`}
              >
                {item.summary}
              </ExpansionPanelSummary>

              <ExpansionPanelDetails >
                {item.details}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>)
      })}

      <ButtonBox btnList={btnArr} handleClick={handleClick} stage={info.stage}/>

    </Styled.CasePanel>
  );
},(nextProp,prevProp)=>{
  return compareProp(nextProp,prevProp, ["info", "type"]);
});

const MemoTitle = React.memo(function MemoTitle(props) {
  const classes = useStyles();
  const { title, showEditBtn, onClickEditBtn, type, showSetBtn,stage } = props;
  const isCompleteStage = stage === 5;
  return (
    <div className={classes.heading}>
      <span className="title__text">{title}</span>
      {showEditBtn &&  !isCompleteStage &&
        <span
          onClick={onClickEditBtn}
          className="edit__icon right"
        > <CreateIcon fontSize="small" /></span>
      }
      {type === 'indication' &&
        <CustomTooltip
          type="help"
          title={`환자 치아 정보를 입력할 수 있습니다.
          세팅이 완료된 결과값을 미리볼 수 있으며 인디케이션 설정을 통해 보다 정확한 정보를 전달할 수 있습니다.`}
          placement="right-start"
          interactive={false}
          baseStyle
        />
      }
      {showSetBtn && !isCompleteStage &&
        <span
          className="edit__icon right font"
          onClick={onClickEditBtn}
        >
          <Visible
            show={showSetBtn}
            success={<Button
              variant="contained"
              className="CreateCase__button CreateCase__button-blue float-right"
              component="span">Set</Button>}
          />
        </span>
      }
    </div>
  )
}
);

const ButtonBox = React.memo(function ButtonBox(props) {
  {/* {(isCreateType || isSenderCase || isModifyMode | isReceiverCase)&& */ }
  const { btnList = [], handleClick,stage } = props;
  const isCompleteStage = stage === 5;
  if(isCompleteStage){
    return null;
  }
  return (
    <div className="upload__button_box">
      {/* <hr className="boundery__line bottom" /> */}
      {btnList.map((item, idx) => {
        return item.isShow && <Button key={idx}
          onClick={() => handleClick({ type: "submit", name: item.name })}
          variant="contained"
          className="CreateCase__button CreateCase__button-blue float-right"
          component="span">{item.title}</Button>
      })}
    </div>
  )
});



const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Styled = {
  CasePanel: styled.div`
    .panel{
      &.hidden{
        display:none;
      }
    }
    .MuiPaper-elevation1{
      box-shadow:none
    }
    .boundery__line{
      border:.5px solid ${color.gray_border6};
      &.bottom{
        margin-bottom:28px;
      }
    }
    .title__text{
      ${font(16, color.black_font)};
      font-weight: 700;
    }
    .MuiExpansionPanelSummary-root{
      padding:0;
    }
    .MuiExpansionPanelDetails-root{
      display:block;
      padding:5px;
    }
    .MuiExpansionPanelSummary-content.Mui-expanded {
      margin: 0;
    }
    
    .MuiButton-contained.Mui-disabled{
      border:1px solid ${color.disable_btn};
      background:white;
      box-shadow: none;
    }
    .CreateCase__button{
      ${font(18, color.white)};
      box-shadow:none;
      border-radius:2px;

      &-blue{
        padding: 5px 20px;
        background:${color.blue};
        color:white;

        &:hover{
          background:${color.blue_hover};
          box-shadow:none;
          border: none;
        }
      }
      &-white{
        border:1px solid ${color.blue};
        background:white;
        color:${color.blue};
        &:hover{
          background:white;
          box-shadow:none;
        }
      }
      &.isNotShow{
        display:none;
      }
    }
    .upload__button_box{
      width:100%;
      background:white;
      margin-top:28px;
      z-index:10;
      
      &:after{
        display:block;
        content:"";
        clear: both;
      }
      .float-right{
        float:right;
      }
    }
    .MuiExpansionPanelSummary-root.Mui-expanded{
      cursor: default !important;
    }
    .MuiExpansionPanelSummary-content{
      position:relative;
      cursor: default;
    }
    .MuiExpansionPanel-root:before{
      height:0;
      
    }
    .MuiExpansionPanelSummary-root.Mui-expanded{
      min-height: 40px;
      
    }
    /* .MuiExpansionPanel-root.Mui-expanded{
      margin: 0;
    } */
    .MuiExpansionPanelDetails-root{
      word-break:break-all;
    }
    .edit__icon{
      display:inline-block;
      background:${color.blue};
      border-radius:2px;
      color:white;
      padding:2px 5px;
      cursor: pointer;
      &.right{
        position:absolute;
        right:0;
        top:50%;
        transform:translateY(-50%);
      }
      &.font{
        ${font(16, 'white')};
        padding:0;
      }
    }
  `,
  CaseTooltip: styled.span`
     display:inline-block;
    font-size:12px;
    padding:5px;
  `
}

export default CasePanel;





// const handleClick = (e,name) => {
//   e.stopPropagation();
//   setPanel(draft => {
//     {
//       draft[name].isOpen = !draft[name].isOpen
//     }
//   })
// };

// if(['sender','receiver'].indexOf(type) !== -1){
//   setPanel(draft=>{
//     draft[type].editor.content = config.data;
//   })
// }


// NOTE: Uplaod clould 버튼
{/* <Tooltip
  // arrow
  title={<Styled.CaseTooltip>생성된 케이스 데이터를 클라우드에 업로드합니다.</Styled.CaseTooltip>} placement="top-start"
  PopperProps={{
    popperOptions: {
    },
  }}
>
  <Button 
    disabled={cloudBtn.disable}
    onClick={onClick('cloud')}
    variant="contained" 
    className={cx("CreateCase__button CreateCase__button-white",{isNotShow:!cloudBtn.isShow})} 
    component="span">Upload Cloud</Button>
  
</Tooltip> */}