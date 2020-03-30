var express = require('express');
var router = express.Router();
var path = require('path');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;
var fs = require('fs');
var util = require('util');

var log = console.log;
//exec의 경우 크기가 512k로 제한
function execute(filePath){
  return new Promise((resolve, reject) => {
    execFile(filePath,
      function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        resolve({stdout,stderr});
        if (error !== null) {
          console.log('exec error: ' + error);
          resolve(error);
        }
    });
  }); 
}

/**
 * ROUTER:
 * React Index.html Load
 */
router.get('/', function(req, res, next) {
  console.log("==========TESET server============");
  res.json({result:1})
  // console.log(path.join(__dirname+'/../build/index.html'));
  // res.sendFile(path.join(__dirname+'/../build/index.html'));
});

router.post('/', function(req, res, next) {
  console.log("==========TESET server============");
  res.json({result:1})
  // console.log(path.join(__dirname+'/../build/index.html'));
  // res.sendFile(path.join(__dirname+'/../build/index.html'));
});

router.post('/errortest', function(req, res, next) {
  console.log("==========TESET errortest============");
  console.log(req.body);
  res.json({result:1})
  // console.log(path.join(__dirname+'/../build/index.html'));
  // res.sendFile(path.join(__dirname+'/../build/index.html'));
});


router.post('/filetesting', function(req, res, next) {
  console.log("==========TESET server============");
  res.json({result:1})
  var path = req.files.upload.path;
  var name = req.files.upload.name;
  console.log('filetest');
  console.log(path);
  console.log(name);
});



/**
 * ROUTER:
 * Ajax Testing
 */
router.post('/hello', function(req, res, next) {
  log(req.body);
  res.json({result:1,data:req.body});
});

/**
 * ROUTER: 
 * Open Exe Program
 */
router.post('/open/exe', function(req, res, next) {
  log(req.body);
  const {type,name} = req.body;
  var filePath = (path.join('D:\\file\\test_file.xls'));
  if(type && type ==='exe'){
    const nameObj ={
      alcapture:'C:\\Program Files (x86)\\ESTsoft\\ALCapture\\ALCapture.exe',
      vscode:"C:\\Users\\이준영\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe",
      chrome:"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    };
    const filePath = nameObj[name];
    if(filePath){
      execute(filePath)
      .then(response=>{
        log( `Result :`  , JSON.stringify(response) );
      })
    }
    
  }
  log(filePath);
  res.json({result:1,data:req.body});
});

module.exports = router;




