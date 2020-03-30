import React, { useEffect } from 'react';
import styled from 'styled-components';
import { font, color } from 'styles/__utils';
import { WorksCard } from 'components/common/card';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { CaseCardDetail } from 'components/common/info';
import { NoDataSearch } from 'components/common/search';
import { LoadingCircle } from 'components/base/loading';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Actions } from 'store/actionCreators';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withRouter } from 'react-router-dom';
import queryString from "query-string";
import { ArrowPageContainer } from 'containers/pagination';
import { CustomLoadingCircle } from 'components/base/loading';
import {storage, compareProp} from 'lib/library';
import cx from 'classnames';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import {
  LISTING_WORKS_SEARCH_SAGAS,
  INFO_WORKS_CHECK_READ_SAGAS,
  INFO_CASE_COMPLETE_SAGAS,
  INFO_WORKS_CASE_UPDATE,
} from 'store/actions';


const WorksCardListPanel  = React.memo(function WorksCardListPanel(props) {
  const {
    auth: authReducer,
    listing: listingReducer,
    info: infoReducer
  } = useSelector(state => state);

  const classes               = useStyles();
  const listingReducerWorks   = listingReducer.works;
  const worksList             = listingReducerWorks.groupList || [];
  const info                  = infoReducer.works;
  const isPending             = info.detail && info.detail.pending;
  const rSearch               = listingReducerWorks.search;
  const searchPage            = listingReducerWorks.pagingData;
  const userCode              = authReducer.signIn.profile.userCode;
  const isEndPrevPage         = !searchPage.prevCheck;
  const isEndNextPage         = !searchPage.nextCheck;
  const getUrlpage            = props.match.params.list;
  const notReadStageList      = [0,1,3,4,5];
  // const storageCurrentCode = storage.get('worksCurrentCode') || false;
  // const currentCode        = storageCurrentCode && storageCurrentCode.currentCode;
  const pagingArrowIconConfig = {
    prevPageText: <ArrowBackIosIcon
      disabled={isEndPrevPage}
      className={cx("Arrow__btn_svg", { disabled: isEndPrevPage })}
    />,
    nextPageText: <ArrowForwardIosIcon
      disabled={isEndNextPage}
      className={cx("Arrow__btn_svg", { disabled: isEndNextPage })}
    />
  };

  const searchConfig = {
    userCode: userCode,
    page: getUrlpage,
    sort: rSearch.sort,
    search: rSearch.search,
    type: rSearch.type,
    first: false
  }

  const handleClick = config => {
    const isMine = config.senderCode === userCode;
    console.log(config,'config');
    const selectConf = {
      currentCode: config.caseCode,
      currentSenderCode: config.senderCode
    };
    
    const isPanelExpanelConfig = isMine && config.isPanelExpand
    ? { type: "typeChange", value: 'sender', stage: config.stage } 
    : { type: "typeChange", value: '', stage: "" };

    INFO_CASE_COMPLETE_SAGAS.init();
    INFO_WORKS_CASE_UPDATE.init();
    LISTING_WORKS_SEARCH_SAGAS.init(isPanelExpanelConfig);

    if(config.isPanelExpand ){
      storage.remove('worksCurrentCode');  
      storage.remove('worksCurrenctOnlyChecked');
    }else{ 
      storage.set('worksCurrenctOnlyChecked',config.onlyCheck);
      storage.set('worksCurrentCode',selectConf);
    }

    
    

    Actions.info_works_cloud_reset();
    Actions.listing_select_panel(selectConf);
  }

  const handleArrowPageSagas = (config) => LISTING_WORKS_SEARCH_SAGAS({ ...searchConfig, ...config });

  // NOTE: 마운트 해제 init
  useEffect(() => {
    return () => {
      LISTING_WORKS_SEARCH_SAGAS.init({ type: "typeChange", value: '' })
    }
  }, []);

  if (!listingReducerWorks.success || listingReducerWorks.pending) {
    return (
      <Styled.WorksWhite >
        <div className="works__loading">
          <CustomLoadingCircle />
        </div>
      </Styled.WorksWhite>
    );
  }

  return (
    <Styled.WorksCardList {...props}>
      {worksList.length === 0 && <div style={{ marginTop: '30px' }}><NoDataSearch text={'검색 결과가 없습니다.'} /></div>}
      <div className={classes.root}>
        <DaysWorksList 
          list ={worksList}
          onClick={handleClick}
          isPending={isPending}
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <ArrowPageContainer
          sagas={handleArrowPageSagas}
          success={listingReducerWorks.success}
          failure={listingReducerWorks.failure}
          pending={listingReducerWorks.pending}
          page={listingReducerWorks.pagingData.page}
          url={'/works'}
          allUrl={queryString.parse(props.location.search)}
          matchUrl={props.match.params.list}
          pagingData={listingReducerWorks.pagingData}
          paging={pagingArrowIconConfig}
        />
      </div>

    </Styled.WorksCardList>
  );
});

const DaysWorksList = React.memo(function DaysWorksList(props){
  const {list,isPending,onClick} = props;
  return(
    <>
      {list.map((item, idx) => {
        return (
          <Grid container key={idx}>
            <Grid item xs={12} className="WorksCardList__date">
              {item.duedate} {isPending && <LoadingCircle className="WorksCardList__loading" size={15} />}
            </Grid>
            <Grid item xs={12}>
              <CardAndDetailList 
                items={item.list}
                onClick={onClick}
              />
            </Grid>
          </Grid>
        )
      })}
    </>
  )
},(nextProp,prevProp)=>compareProp(nextProp,prevProp,['list','isPending']));

const CardAndDetailList = React.memo(function CardAndDetailList(props){
  const { onClick, items} = props;
  return(
    <>
      {items.map((item,idx)=>{
        return <CardAndDetail
        key={idx}
        info={item}
        onClick={onClick}
      />
      })}
    </>
  )
},(nextProp,prevProp)=>prevProp.items === nextProp.items)

const CardAndDetailInitialState = {
  data: {
    sender: {},
    receiver: {},
    timeline: {
      create: 0,
      working: 0,
      upload: 0,
      read: 0,
      download: 0,
      completed: 0,
    }
  },
  isLoading: false
};

const CardAndDetail = React.memo(function CardAndDetail(props) {
  const [values, setValues] = useImmer(CardAndDetailInitialState)
  const { info, onClick } = props;
  const {
    listing: listingReducer,
    info: infoReducer,
    common: commonReducer,
    auth: authReducer
  } = useSelector(state => state);
  

  const storageCurrentCode      = storage.get('worksCurrentCode') || false;
  const curCode                 = storageCurrentCode && storageCurrentCode.currentCode;
  const isSelected              = curCode === info.caseCode
  const isExpanded              = isSelected && !infoReducer.works.detail.pending;
  const userCode                = authReducer.signIn.profile.userCode;
  const curCase                 = storageCurrentCode && storageCurrentCode.currentCode  === info.caseCode;
  const isCompleteUpdateSuccess = infoReducer.case.complete.success && curCase;
  const isReceiver              = info.receiver.code === userCode;
  const valuesData              = values.data;
  const curStage                = valuesData.stage;
  const rIsComplete             = infoReducer.case.complete.isComplete;
  const rUpload                 = infoReducer.works.upload;
  const rDownload               = infoReducer.works.download;
  const notReadStageList      = [0,1,3,4,5]

  const handleClick = config => onClick && onClick(config);

  useEffect(() => {
    if (curCase && isCompleteUpdateSuccess) {
      setValues(draft => {
        draft.data.stage = rIsComplete ? 5 : 4;
      })
    }
  }, [curCase, isCompleteUpdateSuccess]);

  // NOTE: working update
  const isWorkingUpdateSuccess = commonReducer.executorNav.success;
  const isWorkingUpdateFailure = commonReducer.executorNav.failure;
  useEffect(() => {
    if (curCase && isWorkingUpdateSuccess) {
      setValues(draft => {
        draft.data.stage = 1;
      })
    }
  }, [curCase, isWorkingUpdateSuccess, isWorkingUpdateFailure]);

  // NOTE: App Dataupload update
  const isUploadUpdateSuccess = rUpload.appData.success;
  const isUploadUpdateFailure = rUpload.appData.failure;
  useEffect(() => {
    if ((curStage === 1 || curStage === 0) && curCase && isUploadUpdateSuccess) {
      setValues(draft => {
        draft.data.stage = 2;
      })
    }
  }, [curCase, isUploadUpdateSuccess, isUploadUpdateFailure]);

  // NOTE: Direct Upload and set file state
  const cDirectUploadSuccess = rUpload.direct.success;
  const cDirectUploadFailure = rUpload.direct.failure;
  useEffect(() => {
    if ((curStage === 1 || curStage === 0) && curCase && cDirectUploadSuccess) {
      setValues(draft => {
        draft.data.stage = 2;
      })
    }
  }, [curCase, cDirectUploadSuccess, cDirectUploadFailure]);

  // NOTE: read update
  const isReadUpdateSuccess = infoReducer.works.read.success;
  useEffect(() => {
    if (curCase && isReadUpdateSuccess) {
      console.log('read update');
      setValues(draft => {
        if (curStage === 2 && isReceiver) {
          draft.data.stage = 3;
        }
      })
    }
  }, [curCase, isReadUpdateSuccess]);

  // NOTE: download update
  const isDownloadUpdateSuccess = rDownload.success;
  useEffect(() => {
    if (curCase && isDownloadUpdateSuccess) {
      setValues(draft => {
        if (curStage === 3 && isReceiver) {
          draft.data.stage = 4;
        }
      })
    }
  }, [curCase, isDownloadUpdateSuccess]);

  useEffect(() => {
    setValues(draft => {
      draft.data = info;
      draft.isLoading = true;
    })
  }, [info]);

  // NOTE: init
  useEffect(()=>{
    if(curCase){
      const isNotReadSaga = notReadStageList.indexOf(info.stage) === -1;
      if (info.receiver.code === userCode && isNotReadSaga) {
        INFO_WORKS_CHECK_READ_SAGAS({ caseCode: info.caseCode, userCode });
      }
    }
  },[])

  const lableConf = listingReducer.processType[valuesData.stage];
  
  if (!values.isLoading) return null;

  
  const handleWorksCardClick = _.debounce((val) => {
    // console.log(val,'handleWorksCardClick');
    if(val.onlyCheck){
      handleClick({ ...val,isPanelExpand: isExpanded})
    }else{
      handleClick({ ...val, isPanelExpand: isExpanded })
    }
  },30);


  return (
    <>
      <ExpansionPanel expanded={isExpanded} >
        <ExpansionPanelSummary
          aria-controls={`panel${info.caseCode}bh-content`}
          id={`panel${info.caseCode}bh-header`}
        >
          <WorksCard
            onClick={handleWorksCardClick}
            labelText={lableConf && lableConf.title}
            labelColor={lableConf && lableConf.color}
            info={valuesData}
            checked={isExpanded}
            expanded={isExpanded}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container >
            <Grid item xs={1}></Grid>
            <Grid item xs={11} className="WorksCardListPanel__area">
              <CaseCardDetail
                isExpanded={isExpanded}
                info={valuesData}
              />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  )
},(prevProps, nextProps) => nextProps.info === prevProps.info);


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Styled = {
  WorksWhite: styled.div`
   & {
    position:relative;
    min-height:71vh;
    background:white;
    .works__loading{
      z-index:1;
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      color:red;
    }
   }
  `,
  WorksCardList: styled.div`
    & {
      .MuiExpansionPanelSummary-content.Mui-expanded{
        margin:12px 0;
      }
      
      .MuiExpansionPanelDetails-root{
        margin:0;
      }
      
      .MuiExpansionPanelDetails-root{
        display:block;
      }
      .MuiExpansionPanelSummary-root,.MuiExpansionPanelDetails-root{
        padding:0;
      }
      .MuiExpansionPanel-root:before,.MuiExpansionPanel-root:after{
        opacity:0;
      }

      .MuiExpansionPanel-root.Mui-expanded{
      margin: 0;
    }

      .MuiPaper-elevation1{
        box-shadow:none;
      }
      .WorksCardListPanel__area{
        max-width: 93%;
       flex-basis: 93%;
      }
      .Arrow__btn_svg{
        padding:1px;
      }
      .WorksCardList__date {
        padding: 10px 15px;
        ${font(16, color.black_font)};
        background: ${color.blue_line_bg};
        margin-bottom: 20px;    
      }
      .WorksCardList__loading{
        float:right;
        color:${color.blue_hover} ;
      } 
    }
    .MuiGrid-grid-xs-1{
      max-width: 5%;
      flex-basis: 5%;
    }
  `
}

export default withRouter(WorksCardListPanel);


// const isNotReadSaga = notReadStageList.indexOf(config.stage) === -1;
    // if (config.receiverCode === userCode && isNotReadSaga && !config.isPanelExpand) {
    //   INFO_WORKS_CHECK_READ_SAGAS({ caseCode: config.caseCode, userCode });
    // }