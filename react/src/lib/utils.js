
import React, { 
  useEffect,
  useRef,
  useReducer,
  useState
} from 'react';
import { call } from 'redux-saga/effects';
import { AlertFn } from 'lib/library';
import {dispatch} from 'store/actionCreators';
// import _ from 'lodash';
// import { connect } from 'react-redux';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import {storage,keys} from 'lib/library';


// SECTION: Redux Saga, Actions

/**
 * Actions Name
 * @param {*} actionName string
 */
export function makeAsyncActions(actionName) {
  const prefix = actionName;
  const prefixObj = {
    INDEX   : 'INDEX',
    INIT    : `INIT`,
    REQUEST : `REQUEST`,
    PENDING : `PENDING`,
    SUCCESS : `SUCCESS`,
    FAILURE : `FAILURE`,
    CANCEL  : `CANCEL`,
  }
  for(const item in prefixObj){
    prefixObj[item] = prefix + `_${item}`;
  }
  prefixObj.init = (payload)=>makeActionCreator(prefixObj.INIT,payload);
  return prefixObj;
}

/**
 * makeActionCreator
 * @param {*} actionType 
 * @param {*} payload 
 */
export function makeActionCreator(actionType,payload) {
  return dispatch({ type: actionType, payload:payload })
}

/**
 * makeAsyncActions
 * @param {*} actions Object
 */
export function makeAsyncCreateActions(actions){
  const ActionsFunction = (payload)=>makeActionCreator(actions.INDEX,payload);
  return (api)=>{
    if(typeof api !== 'function') new Error('api must be Function');
    
    ActionsFunction.index = actions.INDEX;
    ActionsFunction.request = (data)=>  api(data);
    ActionsFunction.init = (payload)=>makeActionCreator(actions.INIT,payload);
    ActionsFunction.pending = (payload)=>makeActionCreator(actions.PENDING,payload);
    ActionsFunction.success = (payload)=>makeActionCreator(actions.SUCCESS,payload);
    ActionsFunction.failure = (payload)=>makeActionCreator(actions.FAILURE,payload);
    return ActionsFunction
  }
}


/**
 * 
 * @param {*} type 
 * @param {*} promiseCreator 
 */
export const createPromiseSaga = ({
  type, 
  tag,
  pending = ()=>{},
  success = ()=>{},
  failure = ()=>{}
} ) => {
  return function* saga(action) {
    AlertFn(tag);
    if(!type) {
      console.warn(`createPromiseSaga Need type`);
      return null;
    };
    try{
      const payload = action.payload ;
      pending(action);
      type.pending();
      console.log(` %cRequest Data :\n`,"color:red;padding:5px;font-weight:bold",payload);
      const {data,error,cancel} =yield call(type.request,payload);
      console.log(` %cResponse Data :\n`,"color:red;padding:5px;font-weight:bold",data);

      if(cancel){
        type.pending({type:"cancel"});
        return;
      }
      data.payload = payload || {};
      if(data && !error){
        if(data.result === 1){
          success(data, payload);
          type.success(data);
        }else{
          failure(data);
          type.failure(data);
        }
      }else{
        failure(data);
        type.failure(data);
      }
    }catch(e){
      console.log(e,'error');
    }
  };
};

/**
 * 
 * @param {*} draft 
 * @param {*} type 
 */
export function IPSFset(draft,type){
  draft.pending = false;
  draft.success = false;
  draft.failure = false;
  if(type !== 'init'){
    draft[type] = true;
  }
}

// SECTION: use
/**
 * usePromise
 * @param {*} promiseCreator Promise Object
 * @param {*} deps array
 */
// export function usePromise(promiseCreator, deps) {
//   const [resolved, setResolved] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const processor = async () => {
//     setLoading(true);
//     try {
//       const result = await promiseCreator();
//       setResolved(result);
//     } catch (e) {
//       setError(e);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     processor();
//   }, [deps,processor]);

//   return [loading, resolved, error];
// }


/**
 * useInput
 * @param {*} initialForm object
 */
export const useInput = (function () {
  function reducer(state, action) {
    return { ...state, [action.name]: action.value }
  }

  return function useInput(initialForm) {
    const [state, dispatch] = useReducer(reducer, initialForm);

    const onChange = e => {
      dispatch(e.target);
    }
    return [state, onChange];
  }
})();



/**
 * DidUpdateMount를 구현한 Custom hooks
 * @param {*} fn 
 * @param {*} inputs 
 */
export function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current){
      fn();
    }
    else{
      didMountRef.current = true;
    }
  }, inputs);
}

/**
 * 
 * @param {*} f 
 */
export const useDidMount = f => useEffect(() => f && f(), []);



/**
 * 
 * @param {*} value 
 * @param {*} delay 
 */
export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
}



export const useActiveElement = () => {
  const [active, setActive] = React.useState(document.activeElement);

  const handleFocusIn = (e) => {
    setActive(document.activeElement);
  }

  React.useEffect(() => {
    document.addEventListener('focusin', handleFocusIn)
    return () => {
      document.removeEventListener('focusin', handleFocusIn)
  };
  }, [])

  return active;
}





//SECTION: Hign Order Component (HOC)
/**
 * 
 * @param {*} url 
 */
export const withLoading = (WrappedComponent) => (props) =>{
  return props.isLoading
  ? (console.log('Base landing...'),<div>Loading ...</div>)
  : <WrappedComponent { ...props } />
}




export const withUseEffect =(fn,arr) =>{
  // arr.forEach((item)=>{
  //   useEffect(()=>{
  //   },[item]);
  // });
}






//SECTION: Reducer 
/**
 * 
 * @param {*} reducerInitalize 
 */
export function initReducer(typeAction){
  dispatch(typeAction)
}