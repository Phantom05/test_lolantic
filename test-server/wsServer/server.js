


// const {protocol} = require('../src/config/protocol');
const uuid4 = require('uuid/v4')
var WebSocketServer = require("ws").Server;
var port = 8082;
var wss = new WebSocketServer({ port: port },()=>{
  console.log(`${port} is run`);
});

// Connection
wss.on("connection", function(ws) {
  console.log(`Socket on ${port}`);
  var emit = (data,type = 'RES') => {
    console.log('Server Send : ', data);

    let SEND_FORMAT ;
    if(type === 'REQ'){
      SEND_FORMAT = {"DOF-REQ": []};
      SEND_FORMAT['DOF-REQ'].push(data);
    }else{
      SEND_FORMAT = {"DOF-RES": []};
      SEND_FORMAT['DOF-RES'].push(data);
    }
    try{
      ws.send(JSON.stringify(SEND_FORMAT))
    }catch(e){
      console.log(e.message);
    }
  };
  
  var parseMessage =(message)=>{
    console.log('\x1b[31m%s\x1b[0m', 'Received Message'); 
    if(message['DOF-REQ']){
      console.log('\x1b[36m%s\x1b[0m', JSON.stringify(message));
      return message['DOF-REQ'][0]['code']
    }else{
      console.log('\x1b[33m%s\x1b[0m', JSON.stringify(message)); 
      return message['DOF-RES'][0]['code']
    }
  }

  


  ws.on("message", function(message) {
    message = JSON.parse(message);
    let receive = parseMessage(message);
    let keyName;
    let value;
    // const [keyName,value] = [receive[0],receive[1]];
    // receive.push(['0007',true])
    if(receive.length >1 ){
      console.log('다중');
      receive.map((list,idx)=>{
        let responseMessage = message['DOF-REQ'][0]['code'][idx];
        let resData = 0
        keyName = list[0];
        // if(list[1] === undefined){
        //   //여러개 보냈는데 이름만 확인할때
        //   if(keyName === protocol.window_mode){
        //     resData = 4
        //   }
        //   if(keyName === protocol.page_controller){
        //     //page name
        //     resData = 0
        //   }
        //   if(keyName === protocol.base_screen_mode){
        //     // 화면 모드 (분할)
        //     resData = 1;
        //   }
        //   if(keyName === protocol.version){
        //     resData = "1.0.0";
        //   }
        //   responseMessage.push(resData);
        // }

        switch(keyName){

          default:{

          }
        }
      });

      emit({"code": parseMessage(message)})

    }else{
      console.log('하나');
      let receiveData = receive[0];
      keyName = receiveData[0];
      console.log(keyName,'keyName ');

      // switch(keyName){
      //   case protocol.initialize_req:{

      //     break;
      //   }
      //   case protocol.page_protocol :
      //   case protocol.page_controller :{
      //     // page변경
      //     console.log(receive);
      //     let receiveData = receive[0];
          
      //     emit({"code": [[protocol.page_controller,receiveData[1]]]});
      //     break;
      //   }
      //   default:{
      //     emit({"code": parseMessage(message)})
      //   }
      // }
    }


  });

});



// if(key === 'DOF_0011'){
//   emit( {"code": ["0400", true, "123e4567-e89b-12d3-a456-426655440000"] })
// }
// if(key === 'DOF_0000'){
//   setTimeout(() => {
//     // emit({"DOF_0100":[1,true]})
//   }, 5000);
// }


// code: 123
// selected, checked, (disabled : isImageGray)