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
router.post('/api/user/login', function(req, res, next) {
  console.clear();
  console.log('login');
  console.log(req.body);
  const {email,password} = req.body;
  const token ="rgkjawgkjh34kj34kh56k3q4h6kjq2346k34";
  res.json({result:1})

});


router.post('/api/user/logout', function(req, res, next) {
  console.clear();
  console.log('login');
  console.log(req.body);
  const {email,password} = req.body;
  const token ="rgkjawgkjh34kj34kh56k3q4h6kjq2346k34";
  res.json({result:1})

});



module.exports = router;





