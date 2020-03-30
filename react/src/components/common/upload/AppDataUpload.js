import React, { useEffect } from 'react';
import styled from 'styled-components';
import { font, color, dotdotdot } from 'styles/__utils';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';
import { useImmer } from 'use-immer';
import { PlainModal, ModalComplete } from 'components/common/modal';
import { useSelector } from 'react-redux';
import { S_CustomCaseAppdata } from 'components/common/tooltip';
import { FullScreenLoading } from 'components/base/loading';
import {PlainTooltip} from 'components/common/tooltip';
import {storage} from 'lib/library';
import queryString from "query-string";
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import {
  icon_cloud_data,
  icon_cloud_no_data,
  icon_cloud_upload,
} from 'components/base/images';

import {
  INFO_WORKS_APP_DATA_UPLOAD_SAGAS,
  INFO_WORKS_APP_DATA_DOWNLOAD_SAGAS,
  INFO_WORKS_CHECK_DOWNLOAD_SAGAS,
  LISTING_WORKS_GET_LIST_UPDATE_SAGAS
} from 'store/actions';
// import { useDidUpdateEffect } from 'lib/utils';


const cloudTypeImage = {
  1: icon_cloud_no_data,
  2: icon_cloud_data,
  3: icon_cloud_upload,
};
const initialState = {
  modal: {
    isShow: false,
    title: "",
    subtitle: "",
    type: "dim"
  },
  appData: {
    appChangeName:"",
    download: {
      appCloudDir: ""
    },
    typeData:{
      snap:0,
      smileDesign:0,
      scanApp:0,
      ios:0,
    },
    typeDataConfig:{
      snap:{
        title: "Snap",
        image:cloudTypeImage,
        isView:false,
      },
      smileApp:{
        id:2,
        title: "Smile App",
        image:cloudTypeImage,
        isView:false,
    
      },
      scanApp:{
        id:3,
        title: "Scan App",
        image:cloudTypeImage,
        isView:false,
    
      },
      WiT:{
        id:4,
        title: "WiT",
        image:cloudTypeImage,
        isView:false,
      },
    }
  }
}


const AppDataUpload = React.memo(function AppDataUpload(props) {
  const [values, setValues] = useImmer(initialState);
  
  const {
    info: infoReducer,
    listing: listingReducer,
    auth:authReducer
  } = useSelector(state => state);
  const {
    caseType,
    type,
    info,
    userCode,
  } = props;


  const storageCurrentCode = storage.get('worksCurrentCode') || false;
  const loginEmail           = authReducer.signIn.profile.email;
  const rUpload              = infoReducer.works.upload;
  const rDownload            = infoReducer.works.download;
  const currentCode          = storageCurrentCode && storageCurrentCode.currentCode === info.caseCode ;
  const isMine               = info.code === info.userCode;
  // 로그인 유저가 리시버일떄
  const cloudDirDonwloadLink = values.appData.download.appCloudDir;
  const cloudAppChangeName   = values.appData.appChangeName;
  const isComplete           = info.stage === 5;
  const appLoading           = [
    rUpload.appData.pending,
    rDownload.appData.pending,
  ];

  
  const handleSubmit = _.debounce(config => {
    const { type, name } = config;
    const { caseCode, caseId, userCode } = info;
    // INFO_WORKS_DIRECT_FILE_UPLOAD_SAGAS

    if (name === 'appDataUpload') {
      console.log('app upload!');
      const uploadData = {
        caseCode, caseId, userCode, type,email:loginEmail
      }
      INFO_WORKS_APP_DATA_UPLOAD_SAGAS(uploadData);

    }
    if (name === 'appDataDownload') {
      console.log('app download');
      const downloadData = {
        caseCode, caseId, userCode, type
      }
      INFO_WORKS_APP_DATA_DOWNLOAD_SAGAS(downloadData);
    }
  },300);

  const handleClick = config=>{
    const {type,e} = config;
    const appDownloadConf = {
      caseCode: info.caseCode, 
      userCode,
      email:loginEmail
    }
    if(type === 'download'){ 
      if (!cloudDirDonwloadLink) {
        e.preventDefault();
          notDownloadClick();
      }
      else {
        INFO_WORKS_CHECK_DOWNLOAD_SAGAS(appDownloadConf);
      }
    }
  }
  
  const areaClick = config => {
    const { type } = config;
    if (type === 'dim') {
      setValues(draft => {
        draft.modal.isShow = false;
      });
      INFO_WORKS_APP_DATA_UPLOAD_SAGAS.init();
    }
  }
  const notDownloadClick = config => {
    setValues(draft => {
      draft.modal.isShow = true;
      draft.modal.title = "다운로드 실패";
      draft.modal.subtitle = "다운로드 가능한 파일이 없습니다.";
    });
  }

  const refreshList =() =>{
    const getUrlpage = props.match.params.list;
    const urlObj = queryString.parse(props.location.search);
    const refreshObject={
      userCode : userCode,
      page:getUrlpage,
      ...urlObj,
      first:false,
    }
    LISTING_WORKS_GET_LIST_UPDATE_SAGAS(refreshObject);
  }
  
  const isTrue = item => item === true;


  const cUploadSuccess = rUpload.appData.success && currentCode && isMine;
  const cUploadFailure = rUpload.appData.failure && currentCode && isMine;
  // NOTE: App data Upload success
  useEffect(() => {
    if (cUploadSuccess) {
      console.log('!cUploadSuccess');
      setValues(draft => {
        draft.modal.isShow = true;
        draft.modal.title = "업로드 완료";
        draft.modal.subtitle = "App Data가 업로드되었습니다.";
        draft.appData.download.appCloudDir = infoReducer.works.upload.appData.appDataCloudDir;
        draft.appData.typeData = infoReducer.works.upload.appData.appDataType;
        draft.appData.appChangeName = infoReducer.works.upload.appData.appChangeName;
      });
      refreshList()
    }
    if (cUploadFailure) {
      console.log('!cUploadFailure');
      setValues(draft => {
        draft.modal.isShow = true;
        draft.modal.title = "업로드 실패";
        draft.modal.subtitle = "잠시 후 다시 시도해주세요.";
      });
    }

  }, [cUploadSuccess, cUploadFailure]);

  // NOTE: App data DOWNLOAD
  const cDownloadSuccess = rDownload.appData.success && currentCode && isMine;
  useEffect(() => {
    if (cDownloadSuccess) {
      console.log('!cDownloadSuccess');
      setValues(draft => {
        draft.modal.isShow = true;
        draft.modal.title = "다운로드 완료";
        draft.modal.subtitle = "App Data가 다운로드되었습니다.";
      });
      refreshList();
    }
  }, [cDownloadSuccess]);

  // NOTE: appCloudDir이 있을때
  useEffect(() => {
    if (info.appCloudDir && info.appCloudDir.length) {
      setValues(draft => {
        draft.appData.download.appCloudDir = info.appCloudDir;
      })
    }
  }, [info.appCloudDir]);

  // NOTE: appDataType 가 있을때 init
  useEffect(() => {
    setValues(draft=>{
      draft.appData.typeData = info.appDataType;
    })
  }, [info.appDataType]);
  // console.log(values.appData.typeData);




  return (
    <Styled.AppDataUpload>
      <PlainModal
        isOpen={values.modal.isShow}
        content={
          <ModalComplete
            title={values.modal.title}
            children={values.modal.subtitle}
            onClick={() => areaClick({ type: values.modal.type })}
          />
        }
        dim={values.modal.dim}
        onClick={() => areaClick({ type: values.modal.type })}
        width={380}
      />

      {currentCode && type === 'sender' && appLoading.some(isTrue) &&
        <FullScreenLoading dim={true} />
      }
      <Grid container className={cx("AppDataUpload__row", "area_row")}>

        <Grid item xs={3}>
          <div className="AppDataUpload__title">
            <span className="AppDataUpload__title_tx">App Data</span>
            <S_CustomCaseAppdata iconStyle={`top:6px`} />
          </div>
        </Grid>

        <Grid item xs={9}>
          <div className="AppDataUpload__con">
            <ScanAppItemList list={values.appData.typeData} typeConfig={values.appData.typeDataConfig}/>
          </div>
        </Grid>
      </Grid>

      <Grid container className={cx("AppDataUpload__row", "area_row")}>
        <Grid item xs={3}>
          <div className="AppDataUpload__title">Data</div>
        </Grid>
        <Grid item xs={9}>
          <div className="AppDataUpload__con">
            <button
              className={cx("AppDataUpload_cloud_btn", { isNotShow: caseType || isComplete, 
                // hasNotReceiver: !hasReceiver
               })}
              onClick={() => handleSubmit({ type: type, value: "upload", name: 'appDataUpload' })}
            >Upload</button>
            <a
              className={cx("AppDataUpload_cloud_btn_link",{ 
                // isNotShow: caseType, 
                // hasNotReceiver: !hasReceiver 
              })}
              href={cloudDirDonwloadLink}
              onClick={(e) => handleClick({type:"download",e})}
              download
            >
              <button className={cx("AppDataUpload_cloud_btn")}>
                  Download
              </button>
            </a>
            {cloudAppChangeName && 
            <div>
              <PlainTooltip interactive={false} title={cloudAppChangeName} placement="bottom">
              <span className="AppDataUpload__changeName">{cloudAppChangeName}</span>
              </PlainTooltip>
            </div>
            }
          </div>
        </Grid>
      </Grid>
    </Styled.AppDataUpload>
  );
},(prevProp,nextProp)=>{
  const nextPropList=[
    nextProp.caseType,
    nextProp.type,
    nextProp.info,
    nextProp.userCode
  ];
  const prevPropList =[
    prevProp.caseType,
    prevProp.type,
    prevProp.info,
    prevProp.userCode
  ];
  return nextPropList === prevPropList;

});

const ScanAppItemList = React.memo(function ScanAppItemList(props){
  const {list, typeConfig} = props;
  // object List
  let scanAppIconList =[];
   _.forOwn(list,(item,keyName)=>{
     const isTypeData = typeConfig[keyName];
     if(isTypeData){
      scanAppIconList.push(
        <div className="AppDataUpload_cloud_info" key={keyName}>
        <span className="cloud__img_box">
          <img src={isTypeData.image[item]} alt="icon_cloud_image" />
        </span>
        <span className="cloud_tx">
          {isTypeData.title}
        </span>
      </div>
      )
     }
  })
  return <>{scanAppIconList}</>
});


const Styled = {
  AppDataUpload: styled.div`
  width:100%;
    & {
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
    .AppDataUpload__changeName{
      display:inline-block;
      max-width:300px;
      ${dotdotdot};
      ${font(14, color.gray_font)};
      margin-top:10px;
    }
    .AppDataUpload__con{
      ${font(16, color.gray_font)};
      }
    .AppDataUpload__row{
      padding-bottom: 15px;
      &.area_row{
        padding-bottom: 20px;
      }
    }
    .AppDataUpload__title{
      ${font(16, color.black_font)};
      font-weight: 600;
      line-height: 30px;
      height: 30px;
    }
    .AppDataUpload_cloud_btn{
      padding: 5px 15px;
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
    .AppDataUpload_cloud_btn_link{
      display:inline-block;
    }
    .AppDataUpload__title_tx{
      margin-right:5px;
    }
    .AppDataUpload_cloud_info{
      ${font(16, color.gray_font)};
      margin-right: 20px;
      display: inline-block;
    }
    .cloud__img_box{
      position: relative;
      top: 3px;
      margin-right: 5px;
    }
    }

  `
}

export default withRouter(AppDataUpload);


// NOTE: handleSubmit

    // if (type === 'sender') {
    //   if (name === 'appDataUpload') {
    //     console.log('app upload!');
    //     const uploadData = {
    //       caseCode, caseId, userCode, type,email:loginEmail
    //     }
    //     INFO_WORKS_APP_DATA_UPLOAD_SAGAS(uploadData);

    //   }
    //   if (name === 'appDataDownload') {
    //     console.log('appDataDownload');
    //     const downloadData = {
    //       caseCode, caseId, userCode, type
    //     }
    //     INFO_WORKS_APP_DATA_DOWNLOAD_SAGAS(downloadData);
    //   }
    // }

    // if (type === 'receiver') {
    //   if (name === 'appDataUpload') {
    //     console.log('app upload!');
    //     const uploadData = {
    //       caseCode, caseId, userCode, type,email:loginEmail
    //     }
    //     INFO_WORKS_APP_DATA_UPLOAD_SAGAS(uploadData);

    //   }
    //   if (name === 'appDataDownload') {
    //     console.log('appDataDownload');
    //     const downloadData = {
    //       caseCode, caseId, userCode, type
    //     }
    //     INFO_WORKS_APP_DATA_DOWNLOAD_SAGAS(downloadData);
    //   }
    // }