var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var fs = require('fs');
var util = require('util');
var multer = require('multer');
var  mkdirp = require('mkdirp');
console.clear();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.clear();
    console.log('\n\n\n Storate');
    console.log(file,'@@@@@@@@');
    console.log(req.files);
    console.log(req.body,'storage');
    var route = `upload/${req.body.userCode}/${req.body.caseCode}`;
    console.log(route);
    mkdirp(route).then(made =>{
      console.log(`made directories, starting with ${made}`);
        cb(null, route);
    });
    // mkdirp( route , function(err){
    //   console.log('mkdirp', err);
    //   // cb(err, route);
    // });
    // cb(null,'upload');
  },
  filename: function (req, file, cb) {
    console.log(`\n\n\n filename`);
    console.log(req.body,'filename');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb( null,  uniqueSuffix + "-" + "file" )
  }
})
var upload = multer({
    storage,
    limit:{
      files:10,
      fileSize : 1024*1024*1024,
    }
})


router.post('/direct/list', function(req, res, next) {
  console.log('/direct/list');
  console.log(req.body);


  setTimeout(() => {
    res.json({result:1});
  }, 2000);
});

router.post('/direct/list/delete', function(req, res, next) {
  console.log('/direct/list/delete');
  console.log(req.body);


  setTimeout(() => {
    res.json({result:1});
  }, 2000);
});

router.post('/nav/exe', function(req, res, next) {
  console.log('nav/exe');
  console.log(req.body);
  setTimeout(() => {
    res.json({result:1});
  }, 2000);
});

router.post('/api/run/app', function(req, res, next) {
  console.log('nav/exe');
  console.log(req.body);
  setTimeout(() => {
    res.json({result:1});
  }, 2000);
});
// /launcher/api/run/app


router.post('/app/upload', function(req, res, next) {
  console.log('/bin/app/upload');
  console.log(req.body);
  setTimeout(() => {
    res.json({
      result:1,
      appDataCloudDir:'https"//www.naver.com '+ new Date(),
      appDataType:{
        scanApp: 1,
        snap: 2,
        smileDesign: 1,
        ios: 1,
      },
      appChangeName:`lam-${new Date()}`,
      // appChangeName:`lam-`

    });
  }, 500);
});

router.post('/app/download', function(req, res, next) {
  console.log('/bin/app/download');
  console.log(req.body);
  setTimeout(() => {
    res.json({result:1});
  }, 500);
});

router.post('/direct/download', function(req, res, next) {
  console.log('/bin/app/download');
  console.log(req.body);
  setTimeout(() => {
    res.json({result:1});
  }, 500);
});

// app.post('/upload', upload.single('userfile'), function(req, res){
//   res.send('Uploaded! : '+req.file); // object를 리턴함
//   console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
// });


router.post('/file/data', upload.array('uploadFile'), function(req, res, next) {
  console.clear();
  console.log('/bin/file/data');
  console.log(req.body);
  console.log(req.files,'req.files');
  setTimeout(() => {
    res.json({result:1});
  }, 500);
});

router.post('/file/data/test',  upload.array('uploadFile'), async (req, res, next) =>{
  
  // console.clear();
  console.log('\n\n\n Router');
  console.log('/bin/file/data test');
  console.log(
    req.body
  );

  console.log(req.files,'req.files');
  setTimeout(() => {
    res.json({result:1});
  }, 500);
});

router.post('/info/delete', upload.array('uploadFile'), function(req, res, next) {
  console.clear();
  console.log('/bin/file/data');
  console.log(req.body);
  console.log(req.files,'req.files');
  setTimeout(() => {
    res.json({result:2});
  }, 500);
});


module.exports = router;




