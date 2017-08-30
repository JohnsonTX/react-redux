'use strict';
import React, { Component } from 'react';
import {styles} from '../../css/base';
import FadeInView from '../../plugin/plugin';
import { connect } from 'react-redux';
import  {actions} from '../../actions/index';
import {
    AppRegistry,
    Text,
    Animated,
    StyleSheet,
    ListView,
    View
} from 'react-native';
var nvaType='all'
const  Main = (setting)=>{
  var dfSetting={
    id:'',
    url:'',
    title:'welcome',
    nav:true,
    data:{page:1,tab:'all',limit:10,mdrender:false},
    component: <View></View>,

  };
  /***传入参数覆盖***/
  if(setting){
    for(var i in dfSetting){
      dfSetting[i] = setting[i]
    }
  }
  function getTitle(){
    if(typeof dfSetting.title =='function'){
      return dfSetting.title
    }
    return "index"
  }


  class Index extends Component{
    constructor(props) {
      super(props);
      this.state ={
        load:true,
        msg:'',
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        repeatId:null
      };
      if( typeof this.props.route.index =='string' && this.props.route.index){
        setting.data.tab=this.props.route.index;
      }
      /***获取链接***/
      this.getUrl=(data)=>{
        var params='';
        if(typeof dfSetting.data == 'object'){
          for(let i in dfSetting.data){
            params += '&' + i + '=' + dfSetting.data[i]
          }
          params ='?'+params;
        }else if(typeof dfSetting.data == 'function'){
          params = dfSetting.data(this.props);
        }else {
          params = dfSetting.data
        }
        /*** ***/
        if(data){
          var moth=params.match(/tab=(\S*)&limit/)[1];
          params=params.replace(moth,data);
        }

        /**记录首页类型**/
        nvaType = dfSetting.data.tab;

        const url = 'https://cnodejs.org/api/v1/'+ dfSetting.url+'/'+params;

        const REQUEST_URL = new Request(url,{method:'GET', cache:'reload'});
        return REQUEST_URL
      }
      /***获取数据***/
      this.fetchData=function(data){
        var dataId,route=this.props.route;
        if(this.props.state.actions[setting.url].length > 1 ){
          dataId=this.props.state.actions[setting.url][0].id;
        }else{
          dataId=this.props.route.id;
        }
        if(dataId != this.props.state.actions.repeatId && nvaType != route.index || route.name == 'main-page' && nvaType != route.index){
          fetch(this.getUrl(data))
              .then((response) => response.json())
              .then((responseData) => {
                this.props.getDate(dfSetting.url, responseData.data);
                this.props.getDate('repeatId', responseData.data.length > 1 && setting.url =='topics'? '123456': responseData.data.id);
                this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                  load: false,
                  data: dfSetting.id,
                  component: dfSetting.component,
                  repeatId: responseData.data.length > 1 && setting.url =='topics'? '123456': responseData.data.id,
                });
              })
              .done();
        }else {
                this.setState({
                  dataSource:this.state.dataSource.cloneWithRows(this.props.state.actions[setting.url]),
                  load: false,
                  data: dfSetting.id,
                  component: dfSetting.component,
                  repeatId:this.props.getDate('repeatId', ''),
                })
        }
      }
      this.load=()=>{
        this.setState({
          load:true,
          data:'loading...'
        })
      }
      this.loadEnd=()=>{
        this.setState({
          load:false,
          data:'content is loading...'
        })
      }
    }

    static navigationOptions ={
      title: typeof dfSetting.title =='function' ? dfSetting.title(constructor.state) : dfSetting.title
    }

    render(){
      var content=this.props.route.index,
          pageName=this.props.route.name;
      if(!this.state.load ||  content != 'undefined'  && pageName == "main-page") {
        var showContent = this.state.dataSource._dataBlob,showBox;
               var  Nav= ()=> {
                 if(pageName != "main-page"){
                 return (
                     <View style={[styles.navigate,{marginTop:20}]}>
                       <Text onPress={()=>{this.props.router.navigator.jumpBack()}}>  Back </Text>
                     </View>
                 )
               }
               return (
                   <View></View>
               );
             }
            if(!showContent){
              showBox=<FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}} />;
            }
        return(
            <View style={styles.container}>
              <Nav />
              <dfSetting.component {...this.props}  dataSource={this.state.dataSource}/>
              {showBox}
            </View>
        )
      }else{

        return(
            <View style={styles.container}>
              <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}} />
            </View>
        )
      }


    }
    componentDidMount(){
        this.fetchData();
    }
    componentWillMount(){
    }
    componentWillReceiveProps(){
    }
    componentWillUnmount(){
      if(this.state.load){
        this.loadEnd()
      }
    }
  }
  // Index.defaultProps = {setting};
  const Action = (dispatch)=>{
    return {getDate:(action,data)=>{dispatch(actions(action,data))}}
  };
  return connect((state) => { return { state: state,user:state.user} },Action)(Index);
}
export default Main;
