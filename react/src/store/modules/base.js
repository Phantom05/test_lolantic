
import {handleActions} from 'redux-actions';
import * as actions from 'store/actions';
import produce from 'immer';


let initialState={
  landing:true,
  error:{
    loading:false,
    message:null
  },
  isNetworkConnect:true,
  wsConnect:false,
  blocking:false,
  socket:null,
  language:"en",
  scrollbars:{
    action:{
      name:"",
      value:""
    }
  }
}


  

console.log(actions.BASE_NETWORK_CONNECT);
export default handleActions({
  [actions.BASE_EXIT_LANDING]:(state,{payload:diff})=>{
    return produce(state,draft=>{
      draft.landing = false;
    })
  },
  [actions.BASE_ENTER_LANDING]:(state,{payload:diff})=>{
    return produce(state,draft=>{
      draft.landing = true;
    })
  },
  // NETWORK
  [actions.BASE_NETWORK_CONNECT]:(state,{payload:diff})=>{
    return produce(state,draft=>{
      draft.isNetworkConnect = diff.value;
    })
  },

  //MESSAGE GET
  [actions.BASE_MESSAGE_GET]: (state, {payload: diff}) => {
    return produce(state, draft => {
      draft.error.message = diff.value;
    })
  },

  // NOTE: LANGUAGE CHANGE
  [actions.BASE_LANGUAGE_CHANGE]:(state,{payload:diff})=>{
    return produce(state,draft=>{
      console.log(`BASE_LANGUAGE_CHANGE `,diff);
      draft.language = diff;
    })
  },

  // NOTE: LANGUAGE CHANGE
  [actions.BASE_SCROLLBARS_CONTROL]:(state,{payload:diff})=>{
    return produce(state,draft=>{
      let {payload,type,name} = diff;
      if(type === 'update'){
        if(name === 'reset'){
          payload = { name: 'scrollTop', value: '0'}
        }

        draft.scrollbars.action = payload;
      }
      
    })
  },
  
  
  
  // [actions.WS_CONNECTED]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_CONNECTED');
  //     draft.wsConnect = true;
  //     draft.socket = diff;
  //   })
  // },
  // [actions.WS_BLOCKING]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_BLOCKING');
  //     draft.blocking = true;
  //   })
  // },
  // [actions.WS_UNBLOCKING]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_UNBLOCKING');
  //     draft.blocking = false;
  //   })
  // },
  // [actions.WS_DISCONNECTED]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_DISCONNECTED');
  //     draft.wsConnect =false;
  //     draft.blocking = true;
  //   })
  // },
  // [actions.WS_ERRORED]:(state,{payload:diff})=>{
  //   return produce(state,draft=>{
  //     console.log('\n/** WS_ERRORED');
  //     draft.wsConnect =false;
  //     draft.blocking = true;
  //     draft.error = true;
  //   })
  // },
  
},initialState)

