import {setFormData} from 'lib/library';
import _ from 'lodash';
import axios from 'axios';
import {Actions} from 'store/actionCreators';
import {
  // api_address, 
  lfw_address,
  lfw_bin_address, 
  test_server_address,
  ENV_MODE_DEV
} from 'lib/setting';

let testIp = test_server_address;
let ip = lfw_address;
let localIp = `http://localhost:13986`;
// let localIp = `http://localhost:3000`;
let binIp = lfw_bin_address;


const endPoint ={
  post_signin : `${ip}/launcher/api/user/login`,
  post_logout : `${ip}/launcher/api/user/logout`,
  post_token  : `${localIp}/launcher/api/user/refresh/token`,
  // post_token  : `${ip}/launcher/api/user/refresh/token`,
  post_auto_login : `${localIp}/launcher/api/user/autologin`,
  // post_auto_login : `${ip}/launcher/api/user/autologin`,

  post_signup              : `${ip}/launcher/api/user/signup`,
  post_signup_verify_email : `/auth/launcher/verify/email`,
  post_signup_verify_code  : `${ip}/launcher/api/user/email/check/random`,

  post_mypage_info        : `${ip}/launcher/api/my/information`,
  post_mypage_update_info : `${ip}/launcher/api/my/information/update`,
  post_mypage_partner     : `${ip}/launcher/api/my/partner/default`,
 
  post_reset_verify_email : `${ip}/launcher/api/user/email/check/password`,
  post_reset_password     : `${ip}/launcher/api/user/password/reset`,
  post_change_password    : `${ip}/launcher/api/user/password/change`,

  post_verify_email:`${ip}/launcher/api/user/email/check`,

  post_message_list       : `${ip}/launcher/api/my/message/list`,
  post_message_delete     : `${ip}/launcher/api/my/message/delete`,
  post_message_delete_all : `${ip}/launcher/api/my/message/delete/all`,
  post_message_update     : `${ip}/launcher/api/my/message/partner/update`,
  post_message_read       : `${ip}/launcher/api/my/message/read`,

  post_listing_country                : `${ip}/launcher/api/country/list`,
  post_listing_location               : (val)=>`${ip}/launcher/api/country/region/list?country=${val}`,
  post_listing_case_load              : `${ip}/launcher/api/case/load/list`,
  post_listing_partners_list          : `/list/launcher/partners/list`,
  post_listing_my_partners_list       : `${ip}/launcher/api/my/partner/list`,
  post_listing_my_partner_add         : `${ip}/launcher/api/my/partner/add`,
  post_listing_my_partner_default_add : `${ip}/launcher/api/my/partner/update`,
  post_listing_my_partner_delete      : `${ip}/launcher/api/my/partner/delete`,
  post_listing_my_partner_modal       : `${ip}/launcher/api/my/partner/information`,
  post_listing_partners_search_list   : `${ip}/launcher/api/my/partner/search`,
  post_listing_partners_type_list     : `/list/launcher/partners/list/type`,
  post_listing_work_search_list       : ``,
  post_update_option                  : `users/launcher/my/option`,

  post_info_case_create     : `${ip}/launcher/api/case/create/new`,
  post_info_case_list_count : `/case/launcher/count/case`,
  post_info_case_load       : `${ip}/launcher/api/case/load/detail`,
  post_info_case_update     : `/case/launcher/api/case/update`,
  post_info_case_init_data  : `${ip}/launcher/api/case/new/init`,
  post_info_case_delete     : `${ip}/launcher/api/works/delete`,
  post_info_works_hide      : `${ip}/launcher/api/works/hide`,

  post_workSpace_get  : `${ip}/users/launcher/my/workspace`,
  // post_workSpace_get  : `${localIp}/users/launcher/my/workspace`,
  // post_workSpace_set  : `${localIp}/users/launcher/my/workspace/change`,
  post_workSpace_set  : `${ip}/users/launcher/my/workspace/change`,
  post_exe_nav_submit : `${ip}/launcher/api/run/app`,
  post_upload_shortcut_exe: `${ip}/launcher/bin/file/application`,

  post_change_profile:`${binIp}/launcher/bin/file/profile/upload`,
  post_case_sync: `${ip}/launcher/api/case/sync`,

  post_error_meesage:`${ip}/launcher/api/error`
}

// for(const keyName in endPoint){
//   const value = endPoint[keyName];
//   endPoint[keyName] = api_address + value
// }


/**
 * 
 * @param {*} axiosConf object
 * 통신할때 필요한 axios의 config 값을 넣어줍니다.
 * @param {*} config object
 * {header:false} 라고 할 시 header 체크를 하지 않습니다.
 */
// NOTE: launcher/bin/file/case/upload appdate 업로드
// NOTE: /launcher/api/user/refresh/token .
 /**
  * 
    "result": 1,
    "headers": {
        "loginUserCode": "",
        "x-access-token": null
    }
      "result": 1,
    "headers": {
        "loginUserCode": "",
        "x-access-token": null
    }
  */

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

function Acx(axiosConf,config = {}){
  const defaultConfig = {header:true};
  const mergeConfig = _.merge(defaultConfig,config);
  axiosConf.cancelToken = source.token;
  if(mergeConfig && mergeConfig.header){
    axiosConf.timeout = 5000;
    return axios(axiosConf).catch(err=>({error:err})).then(res=>{
      const {data,error} = res;
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
        return {cancel:true}
      }
      try{
        if(data.headers){
        // if(!error && data && data.headers && data.headers.onlineState != null){
            // Actions.base_profile_info_update({value:data.headers.onlineState}); 
            Actions.base_network_connect({value:data.headers.onlineState}); 
            Actions.base_message_get({value: data.headers.notReadMessage});
        }
      }catch(err){
        // 오류 처리
        console.log(err,'error');
        console.error('Response Data is undefined');
        const errorConf={
          // url:"http://localhost:9999/errortest",
          url:endPoint.post_error_meesage,
          method:"post",
          data:{
            payload:axiosConf,
            statusCode:err.statusCode,
            message:err.message,
            stack:err.stack
          }
        }
        axios(errorConf).catch(err=>({error:err}));
      }
      return res;
    });
  }else{
    return axios(axiosConf)
    .catch(err=>({error:err}));
  }
}


export function axiosCancel(){
  source.cancel('Operation canceled');
}



/**
 * 
 * @param {*} payload object
 */
export function postSignin(payload){
  // console.log(`api : post signin`,payload);
  console.log(endPoint.post_signin,'endPoint.post_signin');
  const axiosConf={
    url:endPoint.post_signin,
    method:'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 */
export function postLogout(){
  console.log(`api : post_logout`);
  const axiosConf={
    url:endPoint.post_logout,
    method:'post',
  }
  return Acx(axiosConf)
}

/**
 * 
 * @param {*} payload object
 */
// DEBUG: 해야함




export function postToken(payload){
  const axiosConf={
    // url:endPoint.post_token,
    url: ENV_MODE_DEV ? `${testIp}/auth/launcher/api/user/refresh/token` : endPoint.post_token,
    method:'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload obejct
 */
export function postSignUp(payload){
  console.log('api post Signup');
  // console.log(payload);
  /**
   * res: { // localhost
     fail : 0,
     success: 1, 
     notFound : 2,
     notEnoughParam : 3,
     noAffected: 4,
     err: 5,
     notEnoughPoint : 6
   },
   emailResult : {
     notAuth: 0, // 아무것도 안됬을때,
     success : 1, // 성공
     aleadyExist : 2,// 중복
     sendFail : 3, // 이메일 보내는거 실패
     notMatched : 4, // 인증 코드가 틀렸을때
     expired : 5 // 인증시간 오류
   },
   */
  
  
  console.log(payload,'payload');
  const axiosConf={
    url:endPoint.post_signup,
    method:'post',
    data: {
      ...payload,
      "company_name" : payload.company,
      "states_id":payload.location,


      // "manager"   : value.manager,
      // "email":payload.email,
      // "password":payload.password,
      // "company_name" : payload.company,
      // "name" :payload.name,
      // "states_id":payload.location,
      // "visibility": payload.visivility,
      // "type": payload.type,
      // "licenseData":payload.licenseData
    }
  }
  return Acx(axiosConf)
}
/**
 * 
 * @param {*} payload object
 */
export function postGetMyInfo(payload){
  console.log(`api: post my info : ${JSON.stringify(payload)}`);
  const axiosConf={
    url: endPoint.post_mypage_info,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload object 
 */
export function postUpdateMyInfo(payload){
  console.log(`api: post update my info : ${JSON.stringify(payload)}`);
  const axiosConf={
    url: endPoint.post_mypage_update_info,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload object
 */
export function postGetPartnerInfo(payload){
  console.log(`api: post my partners : ${JSON.stringify(payload)}`);
  const axiosConf={
    url: endPoint.post_mypage_partner,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf)
}

/**
 * 
 * @param {*} payload 
 * 회원가입 인증코드 확인 요청
 */
export function postVerifyCode(payload){
  console.log('api post verify code');
  console.log(payload);
  const axiosConf={
    url:endPoint.post_signup_verify_code,
    method:'post',
    data:{
      email:payload.email,
      random:payload.verifyCode
    }
  }
  return Acx(axiosConf);

}

/**
 * 
 * @param {*} payload object 
 * 패스워드 변경 요청
 */
export function postResetPassword(payload){
  console.log(`api: post reset password : ${JSON.stringify(payload)}`);
  const axiosConf={
    url: endPoint.post_reset_password,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload object 
 * 패스워드 변경 요청(로그인 후)
 */
export function postChangePassword(payload){
  console.log(`api: post reset password : ${JSON.stringify(payload)}`);
  const axiosConf={
    url: endPoint.post_change_password,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 인증코드 이메일 전송 요청
 */
export function postVerifyEmail(payload){
  console.log(`api: post verify email :`);
  console.log(payload);
  const axiosConf={
    url: endPoint.post_verify_email,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 비밀번호 변경 인증코드 이메일 전송 요청
 */
export function postResetVerifyEmail(payload){
  console.log(`api: post verify email :`);
  console.log(payload);
  const axiosConf={
    url: endPoint.post_reset_verify_email,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postGetCountryList(payload){
  const axiosConf={
    url:endPoint.post_listing_country,
    method: 'get',
    // data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postGetLocationList(payload){
  console.log(`>>>postGetLocationList`);
  console.log(payload);
  const axiosConf={
    url: endPoint.post_listing_location(payload.value),
    method: 'get',
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postGetCaseList(payload){
  console.log(`>>>postGetCaseList`);
  console.log(payload);
  const axiosConf={
    url: endPoint.post_listing_case_load,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 */
export function postCreateCase(payload){
  const axiosConf={
    url: endPoint.post_info_case_create,
    method: 'post',
    data:payload
  };
  setHeader(axiosConf);
  return Acx(axiosConf);
}


/**
 * 
 * @param {*} payload 
 * 케이스 리스트 갯수
 */
export function postGetCaseListCount(payload){
  const axiosConf={
    url: endPoint.post_info_case_list_count,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}


/**
 * 
 * @param {*} payload 
 * 파트너 리스트 정보
 */
export function postGetPartnersList(payload){
  const axiosConf={
    url: endPoint.post_listing_partners_list,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 내 파트너 리스트 변경
 */
export function postGetMyPartnersListAdd(payload){
  console.log("partner add", JSON.stringify(payload));
  const axiosConf={
    url: endPoint.post_listing_my_partner_add,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 내 파트너 리스트 변경
 */
export function postGetMyPartnersListDefaultAdd(payload){
  console.log("partner default set", JSON.stringify(payload));
  const axiosConf={
    url: endPoint.post_listing_my_partner_default_add,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 내 파트너 삭제 요청
 * @param {*} payload 
 */
export function postGetMyPartnersListDelete(payload){
  console.log('>>>postGetMyPartnersListDelete');

  const axiosConf = {
    url: endPoint.post_listing_my_partner_delete,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 내 파트너 리스트 모달 데이터
 */
export function postGetMyPartnersListModal(payload){
  console.log("partner list modal info", JSON.stringify(payload));
  const axiosConf={
    url: endPoint.post_listing_my_partner_modal,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 파트너 리스트 정보 검색
 */
export function postGetPartnersSearchList(payload){
  console.log("postGetPartnersSearchList", payload);
  const axiosConf={
    url: endPoint.post_listing_partners_search_list,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 파트너 리스트 정보 검색
 */
export function postGetMyPartnersList(payload){
  const axiosConf={
    url: endPoint.post_listing_my_partners_list,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 파트너 타입 리스트
 */
export function postGetPartnersTypeList(payload){
  const axiosConf={
    url: endPoint.post_listing_partners_type_list,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 파트너 옵션 변경
 */
export function postUpdateOption(payload){
  const axiosConf={
    url: endPoint.post_update_option,
    method: 'post',
    data:payload
  }
  return Acx(axiosConf);
}


/**
 * 케이스 정보를 로드합니다.
 * @param {*} payload 
 */
export function postGetCaseLoad(payload){
  console.log('>>> postGetCaseLoad');
  
  // const testurl = 'http://localhost:9999/bin/info/delete'
  const axiosConf={
      url: endPoint.post_info_case_load,
      // url: testurl,
      method: 'post',
      data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf)
  // return axios(axiosConf).catch(err=>({error:err}));
}


/**
 * 케이스를 삭제합니다.
 * @param {*} payload 
 */
export function postDeleteCase(payload){
  console.log('>>> postDeleteCase');
  
  const testUrl = 'http://localhost:9999/bin/info/delete'
  const axiosConf={
      // url:testUrl,
      url:endPoint.post_info_case_delete,
      method: 'post',
      data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}


/**
 * 케이스 정보를 업데이트합니다.
 * @param {*} payload 
 */
export function postCaseUpdate(payload){
  console.log('>>> postCaseUpdate');
  // NOTE: sender일때는 create/new
  // NOTE: reciever 일때는 works/update

  let axiosConf ={};
  if(payload.type === 1){
    console.log('receiver');
    axiosConf={
      url: `${ip}/launcher/api/works/update`,
      method: 'post',
      data:{
        userCode : payload.userCode,
        caseCode : payload.caseCode,
        memo : payload.receiverMemo,
        completeFlag : false,
        type : payload.type
      }
  }
  }else if (payload.type === 0){
    console.log('sender'); 
      axiosConf={
        url: `${ip}/launcher/api/case/create/new`,
        method: 'post',
        data:payload
    }
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}


/**
 * works의 케이스 정보를 업데이트합니다.
 * @param {*} payload 
 */
export function postWorksCaseUpdate(payload){
  console.log('>>> postWorksCaseUpdate');
  let axiosConf ={};

  const apiUrl = ENV_MODE_DEV ? 'http://localhost:9999/bin/file/data/test':`${ip}/launcher/api/works/update`
  if(payload.type === 1){
    // Receiver
    // const testUrl = 'http://localhost:9999/bin/file/data/test'
    axiosConf={
      url: `${ip}/launcher/api/works/update`,
      // url: apiUrl,
      method: 'post',
      data:{
        userCode : payload.userCode,
        caseCode : payload.caseCode,
        memo : payload.memo,
        completeFlag : false,
        type : payload.type
      }
  }
  }else if (payload.type === 0){
    // Sender
      axiosConf={
        url: `${ip}/launcher/api/works/update`,
        // url:apiUrl,
        method: 'post',
        data:{
          userCode : payload.userCode,
          caseCode : payload.caseCode,
          memo : payload.memo,
          completeFlag : false,
          type : payload.type
        }
    }
  }
  console.log(axiosConf,'axiosConf');
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 케이스 컴플리트
 * @param {*} payload 
 */
export function postCaseComplete(payload){
  const axiosConf={
    url: `${ip}/launcher/api/works/complete`,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * Works 카드 하이드
 * @param {*} payload 
 */
export function postWorksCardHide(payload){
  const axiosConf={
    url: endPoint.post_info_works_hide,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 
 * @param {*} payload 
 * 크리에이트 케이스 인잇 데이터
 */
export function postGetCaseInit(payload){
  const axiosConf={
    url: endPoint.post_info_case_init_data,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);

  // const axiosConf={
  //   url: endPoint.post_info_case_init_data,
  //   method: 'post',
  //   data:payload
  // }
  // return Acx(axiosConf);
}



/**
 * 웍스 서치 리스트
 * @param {*} payload 
 */
export function postGetWorksSearchList(payload){
  // post_listing_work_search_list

  const formatConfig ={

    userCode : payload.userCode || "",
    page     : payload.page||1,
    sort     : payload.sort||1 ,
    search   : payload.search ||"",
    type     : payload.type ||"",
    first    : payload.first|| true,
    filter   : {
      "stage"  : [],
      "type"   : [],
      "hidden" : 0
      },
  };
  
  const axiosConf={
    url: `${ip}/launcher/api/works/list`,
    method: 'post',
    data:formatConfig
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 웍스 리스트
 * @param {*} payload 
 */
export function postGetWorksGetList(payload){
  // post_listing_work_search_list
  const formatConfig ={

    userCode : payload.userCode || "",
    page     : payload.page||1,
    sort     : payload.sort||1 ,
    search   : payload.search ||"",
    type     : payload.type ||"",
    first    : payload.first|| true,
    filter   : {
      "stage"  : [],
      "type"   : [],
      "hidden" : 0
      },
  };

  const axiosConf={
    url: `${ip}/launcher/api/works/list`,
    method: 'post',
    data:formatConfig
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}



/**
 * 알림 리스트
 * @param {*} payload 
 */
export function postGetMessageList(payload){
  console.log(`>>>postGetMessageList`);
  // console.log(payload);
  // post_listing_work_search_list
  const axiosConf={
    url: endPoint.post_message_list,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**

 * works 디테일 통신
 * @param {*} payload 
 */
export function postGetWorksDetail(payload){
  console.log(`>>>postGetWorksDetail`);
  console.log(payload);
  // post_listing_work_search_list
  const axiosConf={
    url: `${ip}/launcher/api/works/detail`,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * works 패널 리드 통신
 * @param {*} payload 
 */
export function postCheckWorksRead(payload){
  console.log(`>>>postWorksRead`);
  console.log(payload);
  // post_listing_work_search_list
  const axiosConf={
    url: `${ip}/launcher/api/works/read`,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * works 패널 리드 통신
 * @param {*} payload 
 */
export function postCheckWorksFileDownload(payload){
  console.log(`>>>postWorksDownload`);
  console.log(payload);
  // post_listing_work_search_list
  const apiUrl = ENV_MODE_DEV ? "http://localhost:9999/bin/file/data/test" :`${ip}/launcher/api/works/download`
  const axiosConf={
    url: `${ip}/launcher/api/works/download`,
    // url:apiUrl,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * works 다이렉트 파일 업로드
 * @param {*} payload 
 */
export function postWorksDirectFileUpload(payload){
  console.log(`>>>postWorksDirectFileUpload`);
  console.log(payload);
  const apiurl = ENV_MODE_DEV? `http://localhost:9999/bin/file/data/test` : `${binIp}/launcher/bin/file/direct/upload`;
  const axiosConf={
    url: `${binIp}/launcher/bin/file/direct/upload`,
    // url: `http://localhost:9999/bin/file/data/test`,
    // url:apiurl,
    method: 'post',
    data:payload,
    headers:{
      'Content-Type': 'multipart/form-data'
    }
  }
  console.log(axiosConf,'axiosConf!!!!');
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * works 다이렉트 파일 업로드
 * @param {*} payload 
 */
export function postWorksDirectFileDownload(payload){
  console.log(`>>>postWorksDirectFileDownload`);
  console.log(payload);
  // post_listing_work_search_list
  // /bin/file/data
  // DEBUG: 테스트서버임. 그냥 a링크로 다운중
  const apiurl = ENV_MODE_DEV? `http://localhost:9999/bin/direct/download` : `${binIp}/launcher/bin/file/direct/upload`;
  const axiosConf={
    // url: `${binIp}/launcher/bin/file/direct/upload`,
    // url: `http://localhost:9999/bin/direct/download`,
    url:apiurl,
    method: 'post',
    data:payload,
    headers:{
      'content-type': 'multipart/form-data'
    }
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 워크 디테일 Direct 파일 삭제
 * @param {*} payload 
 */
export function postWorksDirectFileDelete(payload){
  console.log(`>>>postWorksDirectFileDelete`);
  console.log(payload);
  // post_listing_work_search_list
  // /bin/file/data

  const apiurl = ENV_MODE_DEV? `http://localhost:9999/bin/file/data/test` : `${binIp}/launcher/bin/file/direct/upload`;
  const axiosConf={
    url: `${binIp}/launcher/bin/file/delete`,
    // url: `http://localhost:9999/bin/file/data/test`,
    // url:apiurl,
    method: 'post',
    data:payload,
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}



/**
 * works 앱 동기화 업로드
 * @param {*} payload 
 */
export function postAppDataUpload(payload){
  console.log(`>>>postAppDataUpload`);
  console.log(payload);
  // post_listing_work_search_list
  
  const apiurl = ENV_MODE_DEV? `http://localhost:9999/bin/app/upload` : `${ip}/launcher/bin/file/case/upload`;
  const axiosConf={
    // url: `http://localhost:9999/bin/app/upload`,
    // url: `${ip}/launcher/bin/file/case/upload`,
    url:apiurl,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * works 앱 동기화 다운로드
 * @param {*} payload 
 */
export function postAppDataDownload(payload){
  console.log(`>>>postAppDataDownload`);
  console.log(payload);
  // post_listing_work_search_list
  const apiurl = ENV_MODE_DEV? `http://localhost:9999/bin/app/download` : `${ip}/launcher/bin/app/upload`;
  const axiosConf={
    // url: `http://localhost:9999/bin/app/download`,
    // url: `${ip}/launcher/bin/app/upload`,
    url:apiurl,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 알림 리스트 삭제
 * @param {*} payload 
 */
export function postDeleteMessageList(payload){
  console.log(`>>>postDeleteMessageList`);
  console.log(payload);

  const axiosConf ={
    url: endPoint.post_message_delete,
    method: 'post',
    data: payload

  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 알림 리스트 전체 삭제
 * @param {*} payload 
 */
export function postDeleteMessageListAll(payload){
  console.log(`>>>postGetMessageListAll`);
  console.log(payload);

  const axiosConf ={
    url: endPoint.post_message_delete_all,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 알림 요청 수용 여부 업데이트
 * @param {*} payload 
 */
export function postMessageUpdate(payload){
  console.log(`>>>postMessageUpdate`);
  console.log(payload);

  const axiosConf ={
    url: endPoint.post_message_update,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 알림 읽기
 * @param {*} payload 
 */
export function postMessageRead(payload){
  console.log(`>>>postMessageRead`);
  console.log(payload);

  const axiosConf ={
    url: endPoint.post_message_read,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}


/**
 * 
 * @param {*} payload 
 * 실행 네비게이션 
 */
export function postExeNavSubmit(payload){
  const axiosConf={
    url: endPoint.post_exe_nav_submit,
    method: 'post',
    data:payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}


/**
 * 작업 경로 정보
 * @param {*} payload 
 */
export function postWorkspaceGet(payload){
  console.log(`>>>postWorkspaceGet`);
  console.log(payload);
  
  const axiosConf ={
    // url: endPoint.post_workSpace_get,
    url: ENV_MODE_DEV ? `${testIp}/users/launcher/my/workspace` : endPoint.post_workSpace_get,
    method: 'post',
    data: payload
  }
  // setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 작업 경로 설정
 * @param {*} payload 
 */
export function postWorkspaceSet(payload){
  console.log(`>>>postWorkspaceSet`);
  console.log(payload);
  
  const axiosConf ={
    // url: endPoint.post_workSpace_set,
    url: ENV_MODE_DEV ? `${testIp}/users/launcher/my/workspace/change`: endPoint.post_workSpace_set,
    method: 'post',
    data: payload
  }
  // setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 프로필 이미지 변경
 * @param {*} payload 
 */
export function postChangeProfile(payload){
  console.log(`>>>postChangeProfile`);
  console.log(payload);

  let customData = {
    userCode: payload.userCode,
    profileFile: payload.file
  }
  const formData = setFormData(customData);
  // const formData = new FormData();
  // formData.append('userCode', payload.userCode);
  // formData.append('profileFile', fileArry);

  const axiosConf ={
    url: endPoint.post_change_profile,
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * exe 바로가기 파일 업로드
 * @param {*} payload 
 */
export function postUploadShortCutExe(payload){
  console.log(`>>>postUploadShortCutExe`);
  console.log(payload);

  const axiosConf ={
    url: endPoint.post_upload_shortcut_exe,
    method: 'post',
    data: {
      userCode: payload.userCode,
      applicationFile: payload.file,
      applicationType: payload.applicationType,
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  }
  // setHeader(axiosConf);
  return Acx(axiosConf);
}


/**
 * auto login
 * @param {*} payload 
 */
export function postAutoLogin(payload){
  console.log(`>>>postAutoLogin`);
  console.log(payload);

  const axiosConf ={
    url: ENV_MODE_DEV ? `${testIp}/auth/launcher/api/user/autologin` : endPoint.post_auto_login,
    // url: endPoint.post_auto_login,
    method: 'post',
    data: payload
  }
  // setHeader(axiosConf);
  return Acx(axiosConf);
}


/**
 * paging test
 * @param {*} payload 
 */
// DEBUG: 여기 페이징해보기
export function postTestPageList(payload){
  console.log(`>>>postTestPageList`);
  const page = payload;
  const limit = (count, page) => `limit=${count}&offset=${page ? page * count : 0}`;

  
  const axiosConf ={
    // url: `https://conduit.productionready.io/api/articles?${limit(5,page)}`,
    // method: 'get',

    url: `${ip}/launcher/api/works/list`,
    method: 'post',

    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * 동기화 요청
 * @param {*} payload 
 */
export function postCaseSync(payload){
  console.log(`>>>postCaseSync`);

  const axiosConf ={
    url: endPoint.post_case_sync,
    method: 'post',
    data: payload
  }
  setHeader(axiosConf);
  return Acx(axiosConf);
}

/**
 * Test
 * @param {*} payload 
 */
export function getTest(payload){
  if(!payload){
    payload = 1;
  }
  const axiosConf={
    url:`https://jsonplaceholder.typicode.com/todos/${payload}`
  }
  return Acx(axiosConf);
}


/**
 * Test Server Set Header
 * @param {} axiosConf 
 */
function setHeader(axiosConf){
  // NOTE: receiver : 20Jan31-0001
  // NOTE: sender : 20Feb12-0002
  let headerObj;
  if(ENV_MODE_DEV){
    headerObj = {
     headers :{
     "x-access-token":	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiOTA3MjhmOWUtZDI3Mi00YmVkLTkwYTQtNDliMzUyNTYwYzQzIiwiaWF0IjoxNTgxMDUzMTA2LCJleHAiOjE1ODEwNTMxMDd9.rYK8C5f7SRFrn_1RRX9cxTHsNH9csKmXqmwhbwGsrkY",
     "loginUserCode": "20Jan31-0001"
   }
  }
  }
  Object.assign(axiosConf.data,headerObj);
  return axiosConf;
}