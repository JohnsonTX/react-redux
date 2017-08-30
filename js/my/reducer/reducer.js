'use strict';
// import {Tools} from '../Mytool';
import { combineReducers } from 'redux';
let initData = {
  topics:[],
  topic:[],
  load:false,
  loading:true,
  sload:false,
  logIn:'',
  singin: '',
  Message:[],
    repeatId:'',
    navType:"all"
},_ID=1;

const actions = (state=initData,action)=>{
    switch(action.type) {
      case'singin':
        return state;
      case'Message':
        return Object.assign({},state,{Message:action.data});
      case'logIn':
        state.logIn='';
        return Object.assign({},state,{logIn:action.data,singin:''});
      case'Out':
        state.logIn = '';
        return state;
      case'topic':
      return Object.assign({},state,{topic:action.data});
      case'topics':
             let {Topics} = state,{data}=action;
        // if(!Topics.length){
        //   _ID=1;
        // }
        //     if(data ){
        //        for(let i=0;i<5;i++){
        //           Topics[(_ID - 1)*5 + i] = action.data[i]
        //         }
        //       _ID++;
        //     }

        return Object.assign({},state,{topics:data,sing:'false'});
        case 'repeatId':
            return {...state,repeatId:action.data}
      default :
            return state
    }

};
export default combineReducers({actions});
