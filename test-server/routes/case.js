var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var fs = require('fs');
var util = require('util');

var log = console.log;


/**
 * ROUTER: Create Case
 */
router.post('/launcher/create/case', function(req, res, next) {
  // console.clear();
  console.log('create caseRouter');
  console.log(req.body);
  const body = {};
  body.caseCode= "20200210-8e66216e-efe6-46b0-9319-cf1701b766fc";
  body.result = 1;
  res.json(body)
});

/**
 * ROUTER: Count Case
 */
router.post('/launcher/count/case', function(req, res, next) {
  console.clear();
  console.log('count caseRouter');
  console.log(req.body);
  const body ={};
  body.result = 1;
  body.listCount=5;
  res.json(body)
});



/**
 * ROUTER: Load Case
 */
router.post('/launcher/api/case/load/detail', function(req, res, next) {
  console.clear();
  console.log('case load');
  console.log(req.body);
  const body ={};
  body.result = 1;
  const ran = Math.floor(Math.random()*5000);
  body.caseInfo = {
    "caseCode": `20200204-20Jan31-0000-0${ran}`,
    "caseId": `20200131_하얀치과_환자이름_${ran}`,
    "stage": 0,
    "dueDate": 1580377468,
    "patient": "환자이름",
    "senderMemo": `? 센더메모 ${ran}`,
    "receiverMemo": `리시버 메모 ${ran}`,
    "senderName": "기공소 담당자",
    "receiverName": "기공소 담당자",
    senderCode:"20Jan31-0001",
    receiverCode:"20Jan31-0000",
  },
  
  res.json(body)
});


/**
 * ROUTER: Load Case
 */
router.post('/launcher/api/case/update', function(req, res, next) {
  console.clear();
  console.log('case load');
  console.log(req.body);
  const body ={};
  body.result = 1;
  const ran = Math.floor(Math.random()*5000);
  // body.caseInfo = {
  //   "caseCode": `20200204-20Jan31-0000-0${ran}`,
  //   "caseId": `20200131_하얀치과_환자이름_${ran}`,
  //   "stage": 0,
  //   "dueDate": 1580377468,
  //   "patient": "환자이름",
  //   "senderMemo": `? 센더메모 ${ran}`,
  //   "receiverMemo": `리시버 메모 ${ran}`,
  //   "senderName": "기공소 담당자",
  //   "receiverName": "기공소 담당자",
  //   "userCode": "20Jan31-0000",
  // },
  
  res.json(body)
});


/**
 * ROUTER: Case init date
 */
router.post('/launcher/api/case/new/init', function(req, res, next) {
  console.clear();
  console.log('case init load');
  console.log(req.body);
  const body ={};
  body.result = 1;
  body.caseInit = {
    "caseCount": 0,
    "code": "20Jan31-0001",
    "company": '행복한 기공소'
  }

  res.json(body)
});



module.exports = router;
