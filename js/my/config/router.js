'use strict';
import React from 'react';
import { Navigator } from 'react-native';


// Pages

// import LoginPage from '../pages/login';
import MainPage from '../components/information';
import Detail from '../page/detail';
import Index from '../page/index';


// Config
const sceneConfig = require('./sceneConfig');

var {customFloatFromRight,customFloatFromBottom} = sceneConfig;


class Router {
  constructor(navigator) {
    this.navigator = navigator
  }

  push(props, route) {
    let routesList = this.navigator.getCurrentRoutes();
    let nextIndex = routesList[routesList.length - 1].index + 1;
    route.props = props;
    route.index = nextIndex;
    this.navigator.push(route)
  }


  pop() {
    this.navigator.pop()
  }

  toDetail(index,props,type){
    this.push(props, {
      page: Detail,
      name: 'detail-page',
      sceneConfig: customFloatFromRight,

      id:index
    })
  }

  toMain(props){
    this.push(props, {
      page: MainPage,
      name: 'main-page',
      sceneConfig: customFloatFromRight
    })
  }

  replaceWithHome() {
    this.navigator.popToTop()
  }

  resetMainPage(type){
    this.navigator.resetTo({
      name: 'main-page',
      page: MainPage,
      // sceneConfig: customFloatFromRight,
      index:type,
    })
  }

}

module.exports = Router

