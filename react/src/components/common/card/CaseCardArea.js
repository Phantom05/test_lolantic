import React, {  useState } from 'react';
import styled from 'styled-components';
import { font, color, buttonBlue  } from 'styles/__utils';
import Grid from '@material-ui/core/Grid';
import cx from 'classnames';
import CreateIcon from '@material-ui/icons/Create';
import { HtmlConverter } from 'components/base/helpers/convert';
import { useImmer } from 'use-immer';
import { useSelector } from 'react-redux';
import { PlainModal, ModalComplete } from 'components/common/modal';
import { withRouter } from 'react-router-dom';
import {DirectUpload,AppDataUpload} from 'components/common/upload';
import {compareProp} from 'lib/library';


const initialState = {
  refresh:false,
  modal: {
    isShow: false,
    title: '',
    subtitle: "",
    dim:false,
    type:"dim"
  },
  info: {
    upload: {
      isShow: false
    }
  },
  appData:{
    download:{
      appCloudDir:''
    }
  },
};


const CaseCardArea = React.memo(function CaseCardArea(props) {
  const [values, setValues] = useImmer(initialState);
  const {  auth:authReducer } = useSelector(state => state);
  const [files, setFiles] = useState([]);

  let {
    appdataDataList,
    info,
    caseType,
    type,
    hasReceiver,
    handleClick,
    handleClick: onClick,
  } = props;

  const userCode    = authReducer.signIn.profile.userCode;
  const companyName = info.company;
  const isReceiver  = type === 'receiver';
  const isDim       = !hasReceiver && type !== 'sender';
  let areaName      = companyName ? companyName + "'s Area" : '-';
  const isComplete  = info.stage === 5;

  if (isDim) {
    areaName = `Receiver's Area`;
    info = {
      memo: 'Test', 
      direct: [
        {
          caseCode:info.caseCode,
          name: 'DOF_행복한치과_0000',
          url: '',
          type: "zip"
        },
        {
          caseCode:info.caseCode,
          name: 'DOF_행복한치과_0001',
          url: '',
          type: "zip"
        }
      ]
    };
    handleClick = () => { };
  }

  if (!hasReceiver) {
    handleClick = () => { };
  }

  const areaClick = config => {
    const { type } = config;
    if (type === 'dim') {
      setValues(draft => {
        draft.modal.isShow = false;
      });
    }
  }
  // console.log('끙2. 2개씩나옴');
  return (
    <>
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

      <Styled.CaseCardArea>
        <Grid container className={cx("CaseCardArea__area_box", "sender")}>
          {isDim && <div className="CaseCardArea__dim_con">
            <div className="CaseCardArea__dim"></div>
            <div className="CaseCardArea__dim_box">
              <h3 className="CaseCardArea__dim_title">파트너를 설정하세요.</h3>
              <p className="CaseCardArea__dim_info">works 페이지에서 파트너를 설정할 수 있습니다.</p>
              <div className="CaseCardArea__dim_btn_box">
                <button
                  className="CaseCardArea__dim_btn"
                  onClick={() => onClick({ type: 'setting', name: "partner" })}
                >설정하기</button>
              </div>
            </div>
          </div>}
          <Grid container className={cx("CaseCardArea__row", "ribbon")}>
            <div className="CaseCardArea__area">
              <div className={cx("CaseCardArea__title_ribbon_box", { receiver: isReceiver })}>
                <div className={cx("CaseCardArea__title_ribbon_tx")}>{areaName}</div>
              </div>
            </div>
          </Grid>

          <AppDataUpload 
            type={type}
            caseType={caseType}
            // cloudDirDonwloadLink={cloudDirDonwloadLink}
            info={info}
            appdataDataList={appdataDataList}
            hasReceiver={hasReceiver}
            userCode={userCode}
          />

          <Grid container className={cx("CaseCardArea__row", "area_row")}>
            <Grid item xs={3}>
              <div className="CaseCardArea__title">Memo</div>
            </Grid>
            <Grid item xs={9}>
              <Grid container className={cx("CaseCardArea__con", "CaseCardArea__memo", "contents")}>
                {/* <div className="CaseCardArea__memo_title">
                  <span className="CaseCardArea__memo_title tx">
                    <HtmlConverter convert={['p', '\n']} >{info.memo || ""}</HtmlConverter>
                  </span>
                </div> */}
                <div className="CaseCardArea__memo_con_box">
                <div className="CaseCardArea__memo_con">
                  <HtmlConverter convert={['p', '\n']} >{info.memo || ""}</HtmlConverter>
                </div>  
                <div className="CaseCardArea__memo_btn_box">
                    <button
                      className={cx("CaseCardArea__memo", "edit", { isNotShow: caseType || isComplete})}
                      onClick={() => onClick({ type: "memo", name: "edit", value: info.memo })}
                    ><CreateIcon style={{ fontSize: 16 }} /></button>
                    <button
                      className={cx("CaseCardArea__memo", "view")}
                      onClick={() => onClick({ type: "memo", name: "view", value: info.memo })}
                    >Veiw</button>
                  </div>
                </div>
                
              </Grid>
            </Grid>
          </Grid>

          <Grid container className={cx("CaseCardArea__row", "area_row")}>
            <Grid item xs={3}>
              <div className="CaseCardArea__title">Direct Upload</div>
            </Grid>
            <Grid item xs={9}>
              <Grid container className="CaseCardArea__con">
                <DirectUpload 
                  caseType={caseType}
                  info={info}
                  driectList={info.direct}
                  list={files}
                  hasReceiver={hasReceiver}
                  type={type}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Styled.CaseCardArea>
    </>
  )
},(nextProp,prevProp)=>{
  return compareProp(nextProp,prevProp,
    ["appdataDataList",
      "info",
      "caseType",
      "type",
      "hasReceiver",]);
});



const Styled = {
  CaseCardArea: styled.div`
  &{
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
  .MuiFormGroup-root{
    flex-wrap:nowrap;
  }

  .CaseCardArea__limit__file_info{
    ${font(12, color.gray_font)};
    color:${color.red};
    transition:.5s;
    opacity:0;
    &.isFileInfoShow{
      opacity:1;
    }
  }
  
  .CaseCardArea__table_btn_box{
    margin-top: 10px;
    width:100%;
  }
  .CaseCardArea__table_btn{
    padding: 3px 10px;
    border: 1px solid ${color.blue};
    ${font(14, color.blue)};
    background: none;
    border-radius: 2px;
    margin-right: 5px;
    cursor: pointer;
    transition: all .2s;
    
    &:last-child{
      
    }
    &.browse{
      /* margin-right: 254px; */
    }
    &.upload{
      float:right;
    }
    &.download{
      float:right;
      margin-left:5px;
      margin-right: 0;
    }

    &:hover {
      background: ${color.blue};
      color: ${color.white};
    }
  }


  
  .CaseCardArea_cloud_info{
    ${font(16, color.gray_font)};
    margin-right: 20px;
    display: inline-block;
  }
  .cloud__img_box{
    position: relative;
    top: 3px;
    margin-right: 5px;
  }

  .CaseCardArea__title_ribbon_tx {
    line-height: 30px;
    color: ${color.white};
    padding-left: 10px;
    padding-right:30px;
    min-width:200px;
  }

  .CaseCardArea__info_box{
    border: 1px solid ${color.gray_border6};
    border-radius: 10px;
    padding: 30px;
    padding-top: 40px;
    position: relative;
    margin-bottom:20px;
  }
  .CaseCardArea__share_btn {
    color: ${color.black_font};
    position: absolute;
    top:40px;
    right: 30px;
  }
  .MuiExpansionPanelDetails-root{
    padding: 0;
    margin-top: -30px;
  }

  .CaseCardArea__row{
    padding-bottom: 15px;

    &.ribbon{
      padding-bottom: 20px;
    }

    &.area_row{
      padding-bottom: 20px;
    }
  }
  
  .CaseCardArea__title{
    ${font(16, color.black_font)};
    font-weight: 600;
    line-height: 30px;
    height: 30px;
  }
  .CaseCardArea__title_tx{
    margin-right:5px;
  }

  .CaseCardArea__con{
    ${font(16, color.gray_font)};
  }

  .CaseCardArea__title_ribbon_box {
    position: relative;
    ${font(16, color.gray_font)};
    /* width: 180px; */
    height: 30px;
    left: 0;
    background: ${color.ribbon};
    top: 0;
    &:before {
      position: absolute;
      content: '';
      right: -10px;
      border-top: 15px solid ${color.ribbon};
      border-bottom: 15px solid ${color.ribbon};
      border-right: 10px solid transparent;
    }
    &.receiver{
      background: ${color.ribbon_deep};
      &:before{
        border-top: 15px solid ${color.ribbon_deep};
        border-bottom: 15px solid ${color.ribbon_deep};
        border-right: 10px solid transparent;
      }
    }
  }

   .CaseCardArea__title_tx{
    margin-right:5px;
  }

  .CaseCardArea__con{
    ${font(16, color.gray_font)};
  }

    .CaseCardArea__area_box{
    padding-top: 30px;
    position:relative;
  }
  
  .CaseCardArea__dim_con{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      z-index:100;
    }
    .CaseCardArea__dim{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background:white;
      opacity:.5;
      z-index:100;
    }
    .CaseCardArea__dim_box{
      position:absolute;
      left:50%;
      top:50%;
      transform:translate(-50%,-50%);
      background:white;
      min-width:400px;
      border:1px solid ${color.gray_border6};
      padding:15px;
      z-index:110;
    }
    .CaseCardArea__dim_btn_box{
      text-align:center;
      margin-bottom:30px;
    }
    .CaseCardArea__dim_btn{
      ${buttonBlue};
    }
    .CaseCardArea__dim_title{
      text-align:center;
      ${font(30, color.black_font)};
      font-weight:bold;
      margin-bottom:10px;
      margin-top:50px;
    }
    .CaseCardArea__dim_info{
      text-align:center;
      ${font(16, color.gray_font)};
      margin-bottom:30px;
    }
   .CaseCardArea__area_img{
      display:inline-block;
      width:100%;
      height:100%;
   }
   .CaseCardArea__complete{
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
   
  .CaseCardArea__memo{
    &.edit{
      border: none;
      background:${color.blue};
      color:${color.white};
      padding: 5px;
      border-radius: 2px;
      margin-right: 5px;
      cursor: pointer;
    }
    &.view{
      ${font(14, color.white)};
      border: none;
      background:${color.blue};
      padding: 5px 15px;
      border-radius: 2px;
      cursor: pointer;
    }

  }
  .CaseCardArea__memo_title{
    width:100%;
    &.tx{
      position:relative;
      top:5px;
      ${font(14, color.gray_font)};
      padding-bottom: 5px;
      /* display: inline-block;
      width: 380px;
      padding-right: 10px;
      height:14px;
      overflow: hidden; 
      text-overflow: ellipsis;
      white-space: pre-line; 
      word-wrap: break-word; 
      -webkit-line-clamp: 1; 
      -webkit-box-orient: vertical; */

    }
  }
  .CaseCardArea__memo_con_box{
    position:relative;
    width:100%;
    min-height:30px;
  }
  .CaseCardArea__memo_con{
    ${font(14, color.gray_font)};
    display: inline-block;
    width: 380px;
    margin-top:8px;
    padding-right: 10px;
    height: 14px; 
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: pre-line; 
    word-wrap: break-word; 
    display: -webkit-box; 
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
  }

  .CaseCardArea_cloud_btn{
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
   .CaseCardArea__memo_btn_box{
    /* float:right; */
    position:absolute;
    right:0;
    top:0;
  }
  }
  `
}
export default withRouter(CaseCardArea);

// NOTE: App data Upload 부분
  {/* <Grid container className={cx("CaseCardArea__row", "area_row")}>
    <Grid item xs={3}>
      <div className="CaseCardArea__title">
        <span className="CaseCardArea__title_tx">App Data</span>
        <S_CustomCaseAppdata iconStyle={`top:6px`} />
      </div>

    </Grid>
    <Grid item xs={9}>
      <div className="CaseCardArea__con">
        {appdataDataList.map(item => (
          <div className="CaseCardArea_cloud_info" key={item.id}>
            <span className="cloud__img_box">
              <img src={item.image} alt="icon_cloud_image" />
            </span>
            <span className="cloud_tx">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </Grid>
  </Grid> */}

  {/* <Grid container className={cx("CaseCardArea__row", "area_row")}>
    <Grid item xs={3}>
      <div className="CaseCardArea__title">Data</div>
    </Grid>
    <Grid item xs={9}>
      <div className="CaseCardArea__con">
        <button
          className={cx("CaseCardArea_cloud_btn", { isNotShow: caseType, hasNotReceiver: !hasReceiver })}
          onClick={() => handleSubmit({ type: type, value: "upload", name: 'appDataUpload' })}
        >Upload</button>
        <a 
          href={cloudDirDonwloadLink}
          onClick={(e)=>{
              const appDownloadConf={
                caseCode:info.caseCode,userCode
              }
            if(!cloudDirDonwloadLink) {
              e.preventDefault();
              notDownloadClick();
            }
            else{
              INFO_WORKS_CHECK_DOWNLOAD_SAGAS(appDownloadConf);
            }
          }}
          download
          className={cx("CaseCardArea_cloud_btn", { hasNotReceiver: !hasReceiver })}
        >Download</a>
      </div>
    </Grid>
  </Grid> */}

// NOTE: App Data Upload 부분
  {/* <button
    className={cx("CaseCardArea_cloud_btn", { hasNotReceiver: !hasReceiver })}
    onClick={() => handleSubmit({ type: type, value: "download", name: 'appDataDownload' })}
  >Download</button> */}
  {/* <button 
className={cx("CaseCardArea_cloud_btn", { isNotShow: caseType,hasNotReceiver:!hasReceiver })}
onClick={()=>handleClick({type:"cloud",name:"explore"})}
>Explore</button> */}



// NOTE: 현재코드 펼치는 함수만들기
  // if(values.refresh && !storage.get('currentCode')){
  //   storage.set('currentCode',_.cloneDeep(listingReducer.works.currentCode));
  //   window.location.reload();
  // }

  // useEffect(()=>{
  //   if(storage.get('currentCode')){
  //     let curCode = storage.get('currentCode');
  //     LISTING_WORKS_SEARCH_SAGAS.init({type:"currentCode",currentCode:curCode});
  //     storage.remove('currentCode');
  //   }
  //   return ()=>{
  //     storage.remove('currentCode');
  //   }
  // },[]);
        {/* <PlainModal
        isOpen={values.modal.isShow}
        content={
          <ModalMemoContent
            contentHeight={!isMemoEdit && 250}
            content={
              isMemoEdit
                ? <PlainEditor 
                    height={250} 
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
      /> */}
  





// NOTE: Direct Upload Download btn
{/* <a 
  hidden
  href={info.cloudDirectory}
  onClick={()=>{
    if(!info.cloudDirectory) notDownloadClick();
  }}
  download
  className={cx("CaseCardArea__table_btn", "download", { hasNotReceiver: !hasReceiver })}
>Download</a> */}

// NOTE: Direct Upload Download
  {/* <Grid container className={cx("CaseCardArea__direct_upload_list_box")} ref={directBoxRef}>
    <DirectUploadItemList 
      list={files}
      driectList={info.direct}
      userCode={userCode}
    />
  </Grid> */}

  {/* <Grid container>
    <div className="CaseCardArea__table_btn_box">
      <label
        htmlFor={idInput}
        className={cx("CaseCardArea__table_btn", "browse", { isNotShow: caseType, hasNotReceiver: !hasReceiver })}
      >
        Browser
  </label>

      <span
        className={cx("CaseCardArea__limit__file_info", { isFileInfoShow: values.info.upload.isShow })}
      >파일은 {limitFileLength}개까지만 업로드 가능합니다.</span>
      <input
        hidden
        type="file"
        id={idInput}
        onChange={(value) => handleChange({ type: "directUploadFile", value })}
        multiple
        accept=".gif,.png,.jpeg,.jpg"
      />
      <button
        className={cx("CaseCardArea__table_btn", "upload", { isNotShow: caseType, hasNotReceiver: !hasReceiver })}
        onClick={() => handleSubmit({ type: type, value: "upload", name: "directUpload" })}
      >Upload</button>

    </div>
  </Grid> */}

// NOTE: direct upload checkbox
{/* <input
  type="checkbox"
  id={`${inputId}`}
  className="CaseCardArea__checkbox_btn"
// hidden
// className={cx("CaseCardArea__radio_btn")}
/> */}

{/* <Checkbox
className={cx("CaseCardArea__radio_btn")}
style={{ width: 12, height: 12 }}
size="small"
color="primary"
value={idx}
// checked={false}
/> */}

  // NOTE: UPLOAD
  // useEffect(() => {
  //   if (uploadSenderSuccess && currentCode && isSender) {
  //     // NOTE: isSender Upload
  //     console.log('infoReducer.works.upload.appData.success');
  //     setValues(draft => {
  //       draft.modal.isShow = true;
  //       draft.modal.title = "업로드 완료!";
  //       draft.modal.subtitle = "완료되었습니다.";
  //     })
  //   }

  //   if (uploadReceiverSuccess && currentCode && isReceiver) {
  //     // NOTE: isReceiver Upload
  //     // console.log('infoReducer.works.upload.appData.success');
  //     setValues(draft => {
  //       draft.modal.isShow = true;
  //       draft.modal.title = "업로드 완료!";
  //       draft.modal.subtitle = "완료되었습니다.";
  //     })
  //   }
  // }, [uploadSenderSuccess, uploadReceiverSuccess]);


  // NOTE: DOWNLOAD
  // useEffect(() => {

  //   if (downloadSenderSuccess && currentCode && isSender) {
  //     // NOTE: isSender Download
  //     console.log('downloadSenderSuccess');
  //     setValues(draft => {
  //       draft.modal.isShow = true;
  //       draft.modal.title = "다운로드 완료!";
  //       draft.modal.subtitle = "완료되었습니다.";
  //     })
  //   }

  //   if (downloadReceiverSuccess && currentCode && isReceiver) {
  //     // NOTE: isReceiver Download
  //     setValues(draft => {
  //       draft.modal.isShow = true;
  //       draft.modal.title = "다운로드 완료!";
  //       draft.modal.subtitle = "완료되었습니다.";
  //     })
  //   }
  // }, [downloadSenderSuccess, downloadReceiverSuccess]);