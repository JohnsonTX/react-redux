'use strict';
import React, { Component } from 'react';
import {View,Text,StyleSheet,WebView,ListView,ScrollView,Image,Button} from 'react-native';
import {styles} from '../css/base';
import {styleHtml} from '../css/htmlCss';
import Main from '../components/public/Main';

// Now, you can make a navigator by putting the router on it:

class Index extends Component {
    constructor(props) {
        super(props);
        this.state={
            height:500,
        }
    }
    page(path,data){
        this.props.navigation.navigate(path,data)
    }
    render() {
        const {s1}=this.props.dataSource._dataBlob;
        let url = s1.author.avatar_url,content = s1.content;
        if(s1.author.avatar_url.indexOf('http') ==-1){
            url = 'https:' + s1.author.avatar_url;
        }
        if(content.indexOf('src="//') !=-1){
            content = content.replace(/src="\/\//g,'src="http://')
        }
        return (
            <ScrollView >
                <View style={[styles.detailContainer]}>
                    <Image source={{uri:url}} style={styles.thumbnail}/>
                    <Text style={styles.title}  >
                        {s1.title}
                    </Text>
                </View>
                <View style={{height:this.state.height}}>
                    <WebView
                        source={{html: `<!DOCTYPE html><html>${styleHtml}<body>${content}<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`}}
                        style={{flex:1}}
                        bounces={false}
                        scrollEnabled={false}
                        automaticallyAdjustContentInsets={true}
                        contentInset={{top:0,left:0}}
                        onNavigationStateChange={(title)=>{
                            if(title.title != undefined) {
                                this.setState({
                                    height:(parseInt(title.title)+20)
                                })
                            }
                        }}
                    >
                    </WebView>
                </View>


                </ScrollView>
            );
        }
    }
export default  Main({
    id:React.PropTypes,
    url:'topic',
    title:'detail',
    data:(props)=>{
        return props.route.id;
    },
    component: Index,
})
