import moment from 'moment';
import { ENV_MODE_DEV } from 'lib/setting';
import _ from 'lodash';

// export function rmmbrace(value){
//   // var regExp = /[\{\}']+/g;
//   return value.replace(/[\{\}']+/g,'')
// }

/**
 * 비밀번호 유효성 검사
 * @param {*} value string
 */
export function regPassword(value){
  var regExp = /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  // var regExp = /^[A-Za-z0-9]{6,12}$/;
  return regExp.test(value) 
}

/**
 * 이메일 유효성 검사
 * @param {string} value 
 */
export function regEmail(value){
  var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(value)
}


/**
 * 환자이름 유효성 검사
 * @param {string} value 
 */
export function regName(value){
  var regExp = /^[\s0-9a-zㄱ-ㅎ가-힣_-]{0,100}$/i;
  return regExp.test(value)
}

/**
 * 글자 제한
 * @param {number} len 제한할 글자 길이
 * @param {string} value 텍스트
 * @param {boolean} bool 마지막 boolean으로 1번째부터인지 0번째부터인지?
 */
export function regLength(len,value,bool){
  try{
    value = value.toString().trim();
  }catch(e){
    console.log(e,'error');
  }
  var regExp = bool ? new RegExp(`^.{${len},${len}}$`) : new RegExp(`^.{1,${len}}$`);
    return regExp.test(value)
}

/**
 * 
 */
const st = typeof localStorage === 'object' ? localStorage : {};
/**
 * 
 */
export const keys = {
  user: '__$$_dof_$$__',
  remember:`__$$_dof_$$__remember`,
  token:'__$$_dof_$$__token',
  autoLogin:'__$$_dof_$$__auto',
};

/**
 * 
 */
export const storage= {
  set(key, value) {
    st[key] = JSON.stringify(value);
  },
  get(key) {
    if (!st[key]) return null;
    const value = st[key];
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch (e) {
      return value;
    }
  },
  remove(key) {
    delete st[key];
  },
  clear() {
    if (st.clear) {
      st.clear();
    }
  },
};

/**
 * 
 */
class Cookie {
  set(name, value, exp = 1) {
    // set(변수이름, 변수값, 기간(일수));
    var date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
 
  }
  get(name) {
    // get(변수이름)
    var x, y;
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      x = cookies[i].substr(0, cookies[i].indexOf('='));
      y = cookies[i].substr(cookies[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
      if (x === name) {
        return unescape(y) // unescape로 디코딩 후 값 리턴
      }
    }
  }
  remove(name) {
    // deleteCookie(변수이름)
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
  }
  clear() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}


/**
 * 개발 환경 적용한 console.log
 * @param {string} param0 setPath // 현재 콘솔로그를 찍는 파일명
 * @param {*} (param0, param1) // 콘솔에 찍힐 txt와 payload 순서는 상관없이 사용가능.
 */
export const devConsoleSet = (setPath='utils.js') => (txt, payload) => {
  if(ENV_MODE_DEV){
    if(payload){
      if(typeof payload === 'string'){
        console.log(` %c file: ${setPath} ${payload} :\n`,"color:skyblue;padding:5px;font-weight:bold", txt);
      }else{
        console.log(` %c file: ${setPath} ${txt} :\n`,"color:skyblue;padding:5px;font-weight:bold", payload);
      }
    }else{
      if(typeof txt === 'string'){
        console.log(` %c file: ${setPath} ${txt} `,"color:skyblue;padding:5px;font-weight:bold");
      }else{
        console.log(` %c file: ${setPath} ${JSON.stringify(txt)} :\n`,"color:skyblue;padding:5px;font-weight:bold");
      }
    }
  }
}




export const cookie = new Cookie()

/**
 * 
 * @param {*} target 
 */
export function disableDragSelect(target){
  try{
    if(target){
      target.setAttribute('onselectstart','return false')
      target.setAttribute('oncontextmenu','return false');
      target.setAttribute('ondragstart','return false');
    }
  }catch(e){
    console.log(e);
  }
}

/**
 * 
 */
export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

/**
 * 
 */
export const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};

/**
 * 
 */
export const preventStickBottom = () => {
  const scrollBottom = getScrollBottom();
  if (scrollBottom !== 0) return;
  if (document.documentElement) {
    document.documentElement.scrollTop -= 1;
  } else {
    if (!document.body) return;
    document.body.scrollTop -= 1;
  }
};

/**
 * 
 * @param {*} start 
 * @param {*} end 
 */
export function numRangeMap(start,end){
  return function(num){
    return (num >= start && num <= end)
  }
}


/**
 * isFocusCurrentTarget
 * @param {*} param0 e, eventObject
 */
export function isFocusCurrentTarget({ relatedTarget, currentTarget }){
  if (relatedTarget === null) return false;
  let node = relatedTarget.parentNode;
  while (node !== null) {
    if (node === currentTarget) return true;
    node = node.parentNode;
  }
  return false;
}


/**
 * 정한 숫자만큼 앞에 0이 붙는다
 * ex) fixedNumbering(50,4) => 0050
 * @param {*} number 
 * @param {*} len 
 * 길이를 정해줄 수 있다.
 */
export function fixedNumbering(number,len = 4){
  const str = "" + number
  const pad = "0".repeat(len);
  const ans = pad.substring(0, pad.length - str.length) + str;
  return ans;
}

/**
 * 
 * @param {*} text 
 */
export function AlertFn(text){
  console.log(`
  ==========================
  >>> *${text}
  ==========================
  `);
  return
}

/**
 * 
 * @param {*} val 
 */
export function checkValueDash(val){
  return val? val: '-'
}

/**
 * 
 * @param {*} config 
 */
export function convertDateTime(config){
  const {
    type = 'date',
    format = 'YYYY-MM-DD',
    value = 0, 
    isNull,
  } = config;
  if(isNull && !value){
    return isNull;
  }
  if(type === 'unix'){
    return moment(value).valueOf();
  }else if (type === 'date'){
    return moment.unix(value).format(format)
  }
  
}


/**
 * 
 * @param {*} target 
 */
export function getElementSize(target) {
  if (target) {
    const { clientWidth, clientHeight } = target;
    return { x: clientWidth, y: clientHeight }
  }
  return { x: null, y: null }
}

/**
 //files을 배열로 file들을 넣어야함
  uploadFile은 서버에서 받으려는 파일 네임.
 * const testData = {
    caseCode, 
    caseId, 
    userCode, 
    files:{
      uploadFile:files
    }
  }
  const formData = setFormData(testData);
  INFO_WORKS_DIRECT_FILE_UPLOAD_SAGAS(formData);
 * @param {*} data 
 */
export function setFormData(data){
  const formData = new FormData();
  _.forOwn(data,(val,key,value)=>{
    formData.append(key,val);
    if(key === 'files'){
      _.forOwn(val,(in_val,in_key)=>{
        if(Array.isArray(in_val)){
          in_val.forEach(item=>formData.append(in_key, item));
        }
      })
    }
  });
  return formData;
}


/**
 * 확장자있는 파일네임 추출
 * @param {*} name 
 */
export function extractFileName(name){
  const index = name.lastIndexOf(".");
  let fileName  = name;
  if(index != -1){
    fileName = name.substring(0, index )
  }
  return fileName;
}

/**
 * 파일명에서 확장자명 추출
 * @param filename   파일명
 * @returns _fileExt 확장자명
 */
export function getExtensionOfFilename(filename) {
  const _fileLen = filename.length;
  const _lastDot = filename.lastIndexOf('.');
  const _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase();
  return _fileExt;
}

/**
 * 
 * @param {*} e 
 */
export function disableF5(e) { 
  const keycode = e.keyCode;
  if( (e.ctrlKey == true && (keycode == 78 || keycode == 82)) 
  || (e.which || keycode) == 116) {
    e.preventDefault();
  }
};

/**
 * 
 * @param {*} nextProp 
 * @param {*} prevProp 
 * @param {*} list 
 */
export function compareProp(nextProp,prevProp,list){
  const compareBoolList = list.map(item=>nextProp[item] === prevProp[item]);
  return compareBoolList.every(item => item === true)
}

  
export const camelCaseToDash = str => str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();


export const dashToCamelCase = str=> str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

export const stringCssToObject = str =>{
  var result = {},
  attributes = str.split(';');
for (var i = 0; i < attributes.length; i++) {
  var entry = attributes[i].split(':');
  const keyName = entry.splice(0,1)[0].trim();
  if(keyName !== ""){
    result[keyName] = entry.join(':');
  }
  
}
return result
}