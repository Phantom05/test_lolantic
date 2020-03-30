import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { color } from 'styles/__utils';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import SpeedDial from '@material-ui/lab/SpeedDial';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { storage } from 'lib/library';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { withRouter } from 'react-router-dom';
import { PlainModal, ModalComplete } from 'components/common/modal';
import { Actions } from 'store/actionCreators';
import { useDidUpdateEffect } from 'lib/utils';
import { FullScreenLoading } from 'components/base/loading';
import {
  COMMON_EXE_NAV_SUBMIT_SAGAS,
} from 'store/actions';
import {
  icon_nav_snapscan,
  icon_nav_smaildesign,
  icon_nav_scanapp,
  icon_nav_designplatform,
} from 'components/base/images';

// exe 상태정보 관리 객체
const exeState = {
  installed: {
    code: 1,
    className: ''
  },
  uninstall: {
    code: 2,
    className: 'unInstall'
  },
  running: {
    code: 3,
    className: 'running'
  },
  update: {
    code: 4,
    className: 'update'
  }
};

const actions = [
  {
    id: 1,
    icon: <img className="nav__icon_img" src={icon_nav_snapscan} alt="icon_nav_snapscan" />,
    name: 'SNAP Scan',
    isActive: false,
    exeState: exeState.uninstall
  },

  {
    id: 2,
    icon: <img className="nav__icon_img" src={icon_nav_smaildesign} alt="icon_nav_snapscan" />,
    name: 'Smile App',
    isActive: false,
    exeState: exeState.uninstall
  },

  {
    id: 3,
    icon: <img className="nav__icon_img" src={icon_nav_scanapp} alt="icon_nav_snapscan" />,
    name: 'Scan App',
    isActive: false,
    exeState: exeState.uninstall
  },

  {
    id: 4,
    icon: <img className="nav__icon_img" src={icon_nav_designplatform} alt="icon_nav_snapscan" />,
    name: 'WiT',
    isActive: false,
    exeState: exeState.uninstall
  },

  // { 
  //   id:5,
  //   icon: <img className="nav__icon_img" src={icon_nav_designplatform} alt="icon_nav_snapscan" />, 
  //   name: 'Design Platform', isActive: false },
];

const intialState = {
  modal: {
    isShow: false,
    title: "",
    subtitle: ""
  },
  image: {
    isLoad: false
  }
}


const ExecutorNav = React.memo(function ExecutorNav(props) {
  const classes = useStyles();
  const [hidden] = useState(false);
  const [dialIconList, setDialIconList] = useImmer(actions);
  const [values, setValues] = useImmer(intialState)
  const currenntPage = props.match.path;
  const {
    info: infoReducer,
    common: commonSelector,
  } = useSelector(state => state);
  const { executorNav } = commonSelector;
  const isWorksPage = props.match.path === '/works/:list';

  const storageCurrentCode = storage.get('worksCurrentCode') || false;
  const currentCode = storageCurrentCode && storageCurrentCode.currentCode;
  // 임시. server에서 보내준 exe 파일 상태 정보
  const exeResult = {
    // stateCode : installed 1 uninstall 2 running 3 update 4
    snap: {
      id: 1,
      stateCode: 1
    },
    smile: {
      id: 2,
      stateCode: 1,
    },
    scan: {
      id: 3,
      stateCode: 1,
    },
    wit: {
      id: 4,
      stateCode: 1
    }
  }


  // const { isOpen, handleToggle } = props;
  // const handleVisibility = () => {
  //   setHidden(prevHidden => !prevHidden);
  // };

  const onToggle = () => {
    Actions.common_executor_nav();
  }

  const handleClickDialItem = (config) => {
    const exeConf = {
      type: config.id
    }

    // NOTE: works 페이지일떄
    if (isWorksPage) {
      if (config.id !== 2) {
        setValues(draft => {
          draft.modal.isShow = true;
          draft.modal.title = '앱실행 실패!'
          draft.modal.subtitle = 'Works에서는 Smile App의 \n 실행만  가능합니다.'
        });
      }
      else if (currentCode) {
        exeConf.caseCode = currentCode;
        COMMON_EXE_NAV_SUBMIT_SAGAS(exeConf)
      } else {
        setValues(draft => {
          draft.modal.isShow = true;
          draft.modal.title = '앱실행 실패!'
          draft.modal.subtitle = '업로드를 위한 정보가 필요합니다.\n Works를 선택해주세요.'
        });
      }
    }
    // NOTE: case 페이지일떄
    if (currenntPage === '/case') {
      if (infoReducer.case.type === 'modify') {
        setValues(draft => {
          draft.modal.isShow = true;
          draft.modal.title = '앱실행 실패!';
          draft.modal.subtitle = '편집모드에선 앱실행이 불가능합니다.';
        });
      }
      else if (infoReducer.case.load.success) {
        exeConf.caseCode = infoReducer.case.data.caseCode;
        COMMON_EXE_NAV_SUBMIT_SAGAS(exeConf)
      } else {
        setValues(draft => {
          draft.modal.isShow = true;
          draft.modal.title = '앱실행 실패!';
          draft.modal.subtitle = 'Case를 로드해주세요.';
        });
      }
    }
  };

  const viewPage = ['/case'];
  const isView = isWorksPage || viewPage.indexOf(currenntPage) !== -1;

  const handleClick = config => {
    if (config === 'dim') {
      setValues(draft => {
        draft.modal.isShow = false;
      });
    }
  }

  useDidUpdateEffect(() => {
    if (executorNav.success) {
      setValues(draft => {
        draft.modal.isShow = true;
        draft.modal.title = '앱실행 완료!';
        draft.modal.subtitle = '';
      });
    }
  }, [executorNav.success]);

  useDidUpdateEffect(() => {
    if (executorNav.failure) {
      setValues(draft => {
        draft.modal.isShow = true;
        draft.modal.title = '앱실행 실패';
        draft.modal.subtitle = '잠시 후 다시 시도해주세요.';
      });
    }
  }, [executorNav.failure]);

  useEffect(() => {
    return () => {
      COMMON_EXE_NAV_SUBMIT_SAGAS.init();
    }
  }, []);

  // exeResult라는 서버에서 실행파일 상태를 준다면 아래와같이 파싱해서 action icon의 exeState상태값을 변경
  useEffect(() => {
    setDialIconList(draft => {
      draft.forEach(action => {
        Object.keys(exeResult).forEach(i => {
          if (exeResult[i].id === action.id) {
            switch (exeResult[i].stateCode) {
              case 1:
                action.exeState = exeState.installed
                break;
              case 2:
                action.exeState = exeState.uninstall
                break;
              case 3:
                action.exeState = exeState.running
                break;
            }
          }
        });
      });
    })
  }, []);

  return (
    <>
      {executorNav.pending && <FullScreenLoading dim={true} />}
      <PlainModal
        isOpen={values.modal.isShow}
        content={
          <>
            <ModalComplete
              title={values.modal.title}
              children={values.modal.subtitle}
              onClick={() => handleClick('dim')}
            />
          </>}
        onClick={() => handleClick('dim')}
        dim={true}
        width={400}
      />

      <Styled.ExecutorNav isView={isView} >
        <div className={classes.root}>
          <SpeedDial
            // onClick={(e)=>onToggle(e,'dial')}
            transitionDuration={0}
            ariaLabel="SpeedDial tooltip example"
            className={cx(classes.speedDial, 'SpeedDial')}
            hidden={hidden}
            icon={<SpeedDialIcon className={cx('speedDialIcon')} />}
            FabProps={{ onClick: onToggle }}
            open={executorNav.isOpen}
            direction="down"
          >
            {dialIconList.map(action => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                className={cx('speedDialAction__icon', { active: action.isActive }, `${action.exeState.className}`)}
                tooltipTitle={<span className={classes.tooltip}>{action.name}</span>}
                onClick={(e) => handleClickDialItem(action)}
              />
            ))}
          </SpeedDial>

        </div>
      </Styled.ExecutorNav>
    </>
  );
})



const useStyles = makeStyles(theme => ({
  root: {
    width: 60,
    height: 380,
    transform: 'translateZ(0px)',
    flexGrow: 1,
    position: `fixed`,
    top: 25,
    right: 30
  },
  speedDial: {
    position: 'absolute',
    // bottom: theme.spacing(2),
    right: 0,
    transition: 0
  },
  tooltip: {
    fontSize: 12,
    padding: 5
  }
}));

const Styled = {
  ExecutorNav: styled.div`
    width:100px;
    ${({ isView }) => !isView && `visibility:hidden`};
      /* visibility:hidden; */
    &.isView{
      visibility:visible;
    }
    .nav__icon_img{
      width:99%;
    }
    .SpeedDial{ 
      /* margin-top:20px; */
      
    }
    .MuiSpeedDialIcon-root{
      height:40px;
    }
    
    .MuiButtonBase-root.MuiFab-root.MuiSpeedDial-fab.MuiFab-primary{
      background:${color.blue};      
    }
    /* .MuiFab-root{
      box-shadow:none;
    } */
    .MuiSvgIcon-root.MuiSpeedDialIcon-icon{
      font-size:40px;
    }
    .MuiFab-sizeSmall{
      width:50px;
      height:50px;
      margin:6px;
    }
    .speedDialAction__icon{
      transition:.3s;
      /* background:black; */
      /* color:white; */
      &:hover{
        /* background:${color.blue}; */
      }
      &.active{
        background:${color.blue};
        color:white;
      }

      &.running{
        border: 3px solid red;
      }

      &.unInstall{
        opacity: 0.2;
      }

      &.update{
        border: 3px solid blue;
      }
    }
  `
}

export default withRouter(ExecutorNav);




// import React from 'react';
// import styled from 'styled-components';
// import { color } from 'styles/__utils';
// import { icon_plus } from 'components/base/images';
// import {PlainDim} from 'components/common/dim';
// import { useImmer } from "use-immer";


// function ExecutorNav(props) {
//   const [value,setValue] = useImmer({
//     dim:false
//   });


//   return (
//     <Styled.ExecutorNav>
//       {/* <PlainDim  view={value.dim} /> */}
//       <div className="dim"></div>
//       <div className="executor__menu_box" >
//         <span className="menu__icon_con" >
//           <div className="menu__icon_box">
//             <img src={icon_plus} alt="icon_plus" className="menu__icon" />
//           </div>
//         </span>
//       </div>
//     </Styled.ExecutorNav>
//   );
// }

// const Styled = {
//   ExecutorNav: styled.div`
//   width:100px;
//   padding-top:20px;
//   .executor__menu_box{
//     text-align:center;
//   }
//     .menu__icon_con{
//       position:relative;
//       display:inline-block;
//       width:60px;
//       height:60px;
//       border-radius:100%;
//       background:${color.blue};
//       cursor: pointer;
//     }
//     .menu__icon_box{
//       display:inline-block;
//       position:absolute;
//       left:50%;
//       top:50%;
//       transform:translate(-50%,-50%);
//       font-size:37px;
//       color:white;
//     }
//     .menu__icon{
//       display:inline-block;
//       width:100%;
//       height:100%;
//     }
//   `
// }