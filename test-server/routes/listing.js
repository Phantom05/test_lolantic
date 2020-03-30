var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var fs = require('fs');
var util = require('util');
var uuid4  = require('uuid4');
var log = console.log;

/**
 * ROUTER: Country List
 */
router.get('/launcher/country/list', function(req, res, next) {
  console.clear();
  console.log('country list');
  const countryData = [
    {
      id: 0,
      title: "대한민국",
  
    },
    {
      id: 1,
      title: "미국"
    },
    {
      id: 2,
      title: "중국"
    }
  ];
  res.json({result:1,list:countryData})
});

/**
 * ROUTER: Location List
 */
router.post('/launcher/location/list', function(req, res, next) {
  console.log('Location list');
  console.log(req.body,'!$req.body.req');
    const cityObj = {
    0: [
      {
        id: 0,
        title: "서울"
      },
      {
        id: 1,
        title: "부산"
      },
    ],
    1: [
      {
        id: 0,
        title: "New York"
      },
      {
        id: 1,
        title: "Ochio"
      },
    ],
    2: [
      {
        id: 0,
        title: "중국성1"
      },
      {
        id: 1,
        title: "중국성2"
      },
    ],
  }

  
  const locationData = cityObj[req.body.locationReq];
  console.log(locationData);
  res.json({result:1,list:locationData})
});


/**
 * ROUTER: 케이스 리스트 로드
 * 
 */
router.post('/launcher/case/load/list', function(req, res, next) {
  console.clear();
  console.log('case load data');
  console.log(req.body);
  const body={};

  
// 한번에 보여주는 개수는 최대 10개 

  body.caseList= [
    {
      "caseCode": "SERTH2521",
      "caseId": "20200120_새하얀치과_Alice_0001",
      "patient": "환자이름",
      "sender": "센더이름",
      "receiver": "리시버이름",
      "dueDate": 5158515,
      "stage": 1
    },
    {
      "caseCode": "SERTH2522",
      "caseId": "20200120_새하얀치과_Alice_0001",
      "patient": "환자이름",
      "sender": "센더이름",
      "receiver": "리시버이름",
      "dueDate": 5158515,
      "stage": 1
    },
    {

      "caseCode": "SERTH2523",
      "caseId": "20200120_새하얀치과_Alice_0001",
      "patient": "환자이름",
      "sender": "센더이름",
      "receiver": "리시버이름",
      "dueDate": 5158515,
      "stage": 1
    },
    {
      "caseCode": "SERTH2524",
      "caseId": "20200120_새하얀치과_Alice_0001",
      "patient": "환자이름",
      "sender": "센더이름",
      "receiver": "리시버이름",
      "dueDate": 5158515,
      "stage": 1
    },
    {

      "caseCode": "SERTH2525",
      "caseId": "20200120_새하얀치과_Alice_0001",
      "patient": "환자이름",
      "sender": "센더이름",
      "receiver": "리시버이름",
      "dueDate": 5158515,
      "stage": 1
    }
  ];
  body.result = 1;
  body.headers={
    isOnline:true,
  };
  
  setTimeout(() => {
    res.json(body);
  }, 0);
});



/**
 * ROUTER: 파트너 리스트 
 */
router.post('/launcher/partners/list', function(req, res, next) {
  console.clear();
  console.log('post_listing_partners_list');
  const body ={};
  body.result = 1;
  body.list =[];
  
  let count = 50;
  
  while(count--){
    const tokens = uuid4().split('-').join('').substr(0,8).toUpperCase();
    body.list.push({
      id:tokens,
      company:`아무개 ${count} 기공소 `,
      address:`P.O. Box-1039, Mahaa ${count} erherherh `,
      type:1,
    })
  }
  res.json(body);
});

/**
 * ROUTER: 파트너 리스트 
 */
router.post('/launcher/partners/list/my', function(req, res, next) {
  console.clear();
  console.log('post_listing_my_partners_list');
  const body ={};
  body.result = 1;
  body.list =[];
  
  let count = 10;

  while(count--){
    const tokens = uuid4().split('-').join('').substr(0,8).toUpperCase();
    body.list.push({
      id:tokens,
      partnerCode: "TEST-CODE_123",
      company: count===9? `김처음`:`김아무개 ${count} 기공소 `,
      address:`P.O. Box-1039, Mahaa ${count} erherherh `,
      type:1,
      default: count===9? true: false
    })
  }
  res.json(body);
});

/**
 * ROUTER: 파트너 리스트 추가
 */
router.post('/launcher/my/partner/add', function(req, res, next) {
  console.clear();
  console.log('post_listing_my_partners_add');
  console.log(req.body);
  const body ={};
  body.result = 1;

  res.json(body);
});

/**
 * ROUTER: 파트너 리스트 검색
 */
router.post('/launcher/partners/list/search', function(req, res, next) {
  console.clear();
  console.log('post_listing_partners_list search');
  console.log(req.body);
  const body ={};
  body.result = 1;
  body.list =[];
  
  let count = 50;
  

  const typeList =[
    {
      id: 0,
      title: "선택안함"
    },
    {
      id: 1,
      title: "기공소"
    },
    {
      id: 2,
      title: "밀링센터"
    },
    {
      id: 3,
      title: "개인"
    },
  ];

  const searchKey = typeList.filter(item=>item.id === req.body.type)[0];
  console.log(searchKey,'searchKey');

  while(count--){
    const tokens = uuid4().split('-').join('').substr(0,8).toUpperCase();
    const ranNum = Math.floor(Math.random()*5000);
    body.list.push({
      id:tokens,
      company:`${searchKey ? searchKey.title:'아무개'} ${req.body.keyword} ${count} 기공소 `,
      address:`P.O. Box-${ranNum}, Mahaa ${count} erherherh `,
      type:{
        clinic : false,
        lab : true,
        milling : true,
      },
    })
  }
  res.json(body);
});

/**
 * ROUTER: 파트너 리스트 검색
 */
router.post('/launcher/partners/list/type', function(req, res, next) {
  console.clear();
  console.log('post_listing_partners_list search');
  console.log(req.body);
  const body ={};
  body.result = 1;
  body.list =[
    {
      id: 0,
      title: "선택안함"
    },
    {
      id: 1,
      title: "기공소"
    },
    {
      id: 2,
      title: "밀링센터"
    },
    {
      id: 3,
      title: "개인"
    },
  ];
  
  
  
  
  res.json(body);
});

module.exports = router;




