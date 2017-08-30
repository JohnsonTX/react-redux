'use strict';


import { applyMiddleware,combineReducers,createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
// import { AsyncStorage } from 'react-native';
import reducers from './reducer';

const logger = store => next => action => {
    if(typeof action === 'function') console.log('dispatching a function');
    else console.log('dispatching', action);
    let result = next(action);
    console.log( store.getState());
    return result;
}

let middlewares = [
    logger,
    thunk
];

let createAppStore = applyMiddleware(...middlewares)(createStore);
export default function configureStore(onComplete: ()=>void){
    const store = autoRehydrate()(createAppStore)(reducers);
    let opt = {
        // storage: AsyncStorage,
        // storage:{},
        transform: [],
        whitelist: ['topics'],
    };
    persistStore(store,opt,onComplete);
    return store;
}


