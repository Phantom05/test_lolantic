
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import modules from 'store/modules';
import rootSaga from 'store/sagas';
// import {createLogger} from 'redux-logger';

const customMiddleware = store => next => action => {
  // console.log('Actions :', action);
  const result = next(action);
  return result;
}

const configure = () => {
  
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [customMiddleware, sagaMiddleware];
  const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers =
    typeof window === 'object' && REDUX_DEVTOOLS
      ? REDUX_DEVTOOLS({ trace: true, traceLimit: 25 })
      : compose;
  const store = createStore(
    modules,
    composeEnhancers(
      applyMiddleware(...middleware),
    )
  );
  sagaMiddleware.run(rootSaga);
  return store
}
export default configure;

// const logger = createLogger();
// const middleware =[logger,sagaMiddleware];



// NOTE: 영속성 테스트

// import storage from 'redux-persist/lib/storage';
// import expireReducer  from 'redux-persist-expire';
// import expireIn from "redux-persist-transform-expire-in";
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
// import createCompressor from 'redux-persist-transform-compress'
// import createEncryptor from 'redux-persist-transform-encrypt'
// import { 
//   persistStore, 
//   persistReducer, 
//   createMigrate,
//   autoRehydrate
// } from 'redux-persist';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// const expireIn = 48 * 60 * 60 * 1000; // expire in 48h
// const expireTimer = 1 * 3000; // expire in 48h
// const expirationKey = "expirationKey";
// const persistExpire = expireIn(expireTimer, expirationKey, []);
// DEBUG: persist expire 부분 해결 하기

// const migrations = {
//   0: (state) => {
//     return {
//       state,
//       index:1,
//       device:undefined
//     }
//   },
//   1: (state) => {
//     return {
//       ...state,
//       device:true
//     }
//   }
// }

// const persistConfig = {
//   transforms: [encryptor,expireReducer('DOF_front', { expireSeconds: 3})],
//   key: 'root',
//   storage,
//   version: 0,
//   debug:true,
//   stateReconciler: hardSet,
//   migrate: createMigrate(migrations, { debug: true }),
//   // migrate: (state) => {
//   //   console.log('Migration Running!')
//   //   // console.log(state.info.case.update);
//   //   // console.log(state._persist,'state _persist');
//   //   createMigrate(migrations, { debug: true })(state,-1).then(res=>{
//   //     // console.log(res.info.case.update,'@$%^@^@#%@#%');
//   //     // console.log(res);
//   //   })
//   //   return Promise.resolve(state)
//   // },
// };

// const customMiddleware = store => next => action => {
//   // console.log('Actions :', action);

//   if(action.type === "persist/PERSIST"){
//     // console.log(store.getState(),'store');
//     // return {...store,persistState:0}
//   }
//   const result = next(action);
//   return result;
// }
// const encryptor = createEncryptor({
//   secretKey: 'DOF_front',
//   onError: function (error) {
//     // Handle the error.
//   }
// });


// const compressor = createCompressor()
// const persistedReducer = persistReducer(persistConfig, modules);

// const configure = () => {
  
//   const sagaMiddleware = createSagaMiddleware();
//   const middleware = [customMiddleware, sagaMiddleware];
//   const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
//   const composeEnhancers =
//     typeof window === 'object' && REDUX_DEVTOOLS
//       ? REDUX_DEVTOOLS({ trace: true, traceLimit: 25 })
//       : compose;
//   const store = createStore(
//     modules,
//     // persistedReducer,
//     composeEnhancers(
//       applyMiddleware(...middleware),
//     )
//   );

//   let persistor = persistStore(store
//     ,{ transforms: [compressor] }
//     ,() => { store.dispatch ({type : "BOOTSTRAPPED"}) });
  
//   if (module.hot) {
//     store.dispatch ({type : "BOOTSTRAPPED"})
//     module.hot.accept('./modules', () => {
//       // This fetch the new state of the above reducers.
//       const nextRootReducer = require('./modules').default
//       store.replaceReducer(
//         persistReducer(persistConfig, nextRootReducer)
//       )
//     });

//     const nextRootReducer = require('./modules').default;
//     store.replaceReducer(
//       persistReducer(persistConfig, nextRootReducer)
//     );
//     persistor.persist()
//   }
  

//   sagaMiddleware.run(rootSaga);
//   return { store, persistor };
// }
// export default configure;