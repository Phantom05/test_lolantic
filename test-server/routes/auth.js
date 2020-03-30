var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var fs = require('fs');
var util = require('util');
var uuid4 = require('uuid/v4');
var axios = require('axios');
const ip  = `http://15.164.27.98:28180`;
var log = console.log;

function Acx(axiosConf,config = {}){
  const defaultConfig = {header:true};
  const mergeConfig = _.merge(defaultConfig,config);
  const {header} = mergeConfig;

  if(header){
    return axios(axiosConf).catch(err=>({error:err})).then(res=>{
      const {data} = res;

      if(data.headers && data.headers.isOnline != null){
        Actions.base_network_connect({value:data.headers.isOnline}); 
        Actions.base_message_get({value: data.headers.message});
      }
      
      
      return res;
    });
  }else{
    return axios(axiosConf)
    .catch(err=>({error:err}));
  }
}

/**
 * ROUTER: Login
 */
router.post('/launcher/login', function(req, res, next) {
  console.clear();
  console.log('login');
  console.log(req.body);
  const {email,password} = req.body;
  const token ="rgkjawgkjh34kj34kh56k3q4h6kjq2346k34";
  res.json({result:1})

  // if(password == '123a123a!'){
  //   res.json(
  //     {
  //       isOnline:false,
  //     result:1,
  //     token,
  //     profile:{
  //       open:true,
  //       name:"Chris Brown",
  //       company : "새하얀 치과", 
  //       country : "KO", 
  //       location : "서울", 
  //       email : email, 
  //       type:"",
  //       userCode:"20Jan31-0000"
  //     }
  //   }
  //   )
  // }else{
  //   res.json({result:2})
  // }
});


router.post('/launcher/api/user/logout', function(req, res, next) {
  console.clear();
  console.log('login');
  console.log(req.body);
  const {email,password} = req.body;
  const token ="rgkjawgkjh34kj34kh56k3q4h6kjq2346k34";
  res.json({result:1})

});


/**
 * ROUTER:
 */
router.post('/launcher/token', async function(req, res, next) {
  console.log('/launcher/token');
  console.log(req.body);
  const {token} = req.body;

  const axiosConf={
    url:`${ip}/launcher/api/user/login`,
    method:'post',
    data:{
      email : 'sender@doflab.com',
      password  :'dof0070!'
    }
  }
  const {data} = await axios(axiosConf);


  // {
//   "userCode ":  "test09-20FEB-0001 ",
//   "authCheck ": true,
//   "result ":1,
//   "userInfo ": {
//       "userCode ":  "test09-20FEB-0001 ",
//       "email ":  "test09@doflab.com ",
//       "name ":  "매니저 이름 ",
//       "visibility ": 0,
//       "companyName ":  "회사 이름 23 ",
//       "country ": null,
//       "states_id ": 1532,
//       "pCode ":  "20Jan31-0000 ",
//       "partnerCode ":  "20Jan31-0000 ",
//       "partnerCompanyName ":  "회사 이름 sss "
//  }
// }

  console.log(data);
  res.json(data);
  // return Acx(axiosConf);



  // res.json( {
  //   result:1,
  //   headers:{
  //     isOnline:true,
  //     message: 3,
  //   },
  //   token,
  //   profile:{
  //     open:true,
  //     name:"Chris Brown",
  //     company : "새하얀 치과", 
  //     country : "KO", 
  //     location : "서울", 
  //     email : "hello@naver.com", 
  //     userCode:"20Jan31-0000"
  //   }
  // })

});


router.post('/launcher/logout', function(req, res, next) {
  console.log('logout');
  res.json({result:1})
});


router.post('/launcher/user/signup', function(req, res, next) {
  console.clear();
  console.log('signup');
  console.log(req.body);
  const token ="rgkjawgkjh34kj34kh56k3q4h6kjq2346k34";
  setTimeout(() => {
    if(true){
      res.json({ 
        result:1
      })
    }else{
      res.json({ 
        result:3,
        isEmailVaild:true,
        isCodeVaild:false,
      })
    }
    
  }, 1000);
});

/**
 * ROUTER: 이메일 인증
 */
router.post('/launcher/verify/email', function(req, res, next) {
  console.clear();
  console.log('/launcher/verify/email');
  console.log(req.body);
  const {email} = req.body;
  setTimeout(() => {
    res.json({ result:1 })
  }, 1000);
});

/**
 * ROUTER: 
 */
router.post('/launcher/verify/code', function(req, res, next) {
  console.clear();
  console.log('AUTH_VERIFY_CODE_SAGAS');
  console.log(req.body);
  const {verifyCode} = req.body.value;
  
  setTimeout(() => {
    if(verifyCode === 'q1w2e3r4'){
      res.json({ result:1});
    }else{
      res.json({ result:2});
    }
  }, 1000);
});


router.post('/launcher/password/change', function(req, res, next) {
  console.clear();
  console.log('/reset/password');
  console.log(req.body);

  setTimeout(() => {
    res.json({ result:1})
  }, 1000);
});

router.post('/launcher/user/verifyCode', function(req, res, next) {
  console.clear();
  console.log('/launcher/user/verifyCode');
  console.log(req.body);

  setTimeout(() => {
    res.json({ result:1, authCode: "testCode"})
  }, 1000);
});

router.post('/launcher/api/user/autologin', function(req, res, next) {
  console.clear();
  console.log('/launcher/api/user/autologin');
  console.log(req.body);

  setTimeout(() => {
    res.json(
      {
        "userCode": "test09-20FEB-0001",
        "email": "test09@doflab.com",
        "name": "매니저 이름",
        "visibility": 2,
        "companyName": "회사 이름",
        "country": "Somalia",
        "states_id": 203,
        "pCode": "20Jan31-0000",
        "profile": "https://dof-service.s3.ap-northeast-2.amazonaws.com/launcher/test09-20FEB-0001/profile/Launcher-Profile-1582784364966-958907916-스토어 생성.PNG",
        "jsonType": "login.res.json",
        "result": 2,
        "headers": {
            "loginUserCode": "",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjJjZmY0Y2MtZWNlZi00YzRiLTg3NjEtNjBmY2I4MWNmODAxIiwiaWF0IjoxNTgzNDc5NDU3LCJleHAiOjE1ODM1NjU4NTd9.1IGRBA0t0DkjjPpreJjehDhrd-vPI9gPkJV7IWXAQYU"
        },
        "partnerInfo": {
            "code": "20Jan31-0000",
            "company": "회사 이름 sss"
        },
        "msg": "login success"
    }
    )
  }, 1000);
});

router.post('/launcher/api/user/refresh/token', function(req, res, next) {
  console.clear();
  console.log('/launcher/api/user/refresh/token');
  console.log(req.body);

  setTimeout(() => {
    res.json(
      {
        "userCode": "test09-20FEB-0001",
        "email": "test09@doflab.com",
        "name": "매니저 이름",
        "visibility": 2,
        "authCheck": true,
        "companyName": "회사 이름",
        "country": "Somalia",
        "authCheck":true,
        "states_id": 203,
        "pCode": "20Jan31-0000",
        "profile": "https://dof-service.s3.ap-northeast-2.amazonaws.com/launcher/test09-20FEB-0001/profile/Launcher-Profile-1582784364966-958907916-스토어 생성.PNG",
        "jsonType": "login.res.json",
        "result": 1,
        "headers": {
            "loginUserCode": "",
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjJjZmY0Y2MtZWNlZi00YzRiLTg3NjEtNjBmY2I4MWNmODAxIiwiaWF0IjoxNTgzNDc5NDU3LCJleHAiOjE1ODM1NjU4NTd9.1IGRBA0t0DkjjPpreJjehDhrd-vPI9gPkJV7IWXAQYU"
        },
        "partnerInfo": {
            "code": "20Jan31-0000",
            "company": "회사 이름 sss"
        },
        "msg": "login success"
    }
    )
  }, 1000);
});



router.post('/launcher/submit', function(req, res, next) {
  console.log('/launcher/submit');
  console.log(req.body);
  if(req.body.answer.length === 1 && req.body.answer[0] === '안창호'){
    res.json(true)
  }else{
    res.json(false)
  }
  
});


module.exports = router;












  // res.set('Access-Control-Expose-Headers', 'Hello, b, c, d')
  // res.set({
  //   'Content-Type': "application/json; charset=utf-8",
  //   'Content-Length': '220',
  //   'Hello': '12345'
  // });
//  res.setHeader('Content-Type', 'application/json');
//  res.setHeader('x-access-token', 'Hello');
//  res.setHeader('Access-Control-Allow-Origin', '*');
//  res.setHeader('Access-Control-Expose-Headers', 'Location');
//   var response = {
//     isOnline:true,
//     result:1,
//     token,
//     profile:{
//       open:true,
//       name:"Chris Brown",
//       company : "새하얀 치과", 
//       country : "KO", 
//       location : "서울", 
//       email : "hello@naver.com", 
//     }
//   }
  // console.log( JSON.stringify(res.getHeaders()));
  // res.send(JSON.stringify(response));