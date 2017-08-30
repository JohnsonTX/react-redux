'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {View,Text,StyleSheet,WebView,ListView,ScrollView,Image,Button} from 'react-native';
import {styles} from '../css/base';
import Main from '../components/public/Main';
import Tool from '../tool';

class Index extends Component {
    constructor(props){
        super(props);
        this.renderMovie=(person)=>{
            console.log(props)
            const {navigate} =props.navigation;
            var url = person.author.avatar_url;
            if(person.author.avatar_url.indexOf('http') ==-1){
                url = 'https:' + person.author.avatar_url;
            }
            return(
                <View style={styles.reContainer}>
                    <Image source={{uri:url}} style={styles.thumbnail}/>
                    <View style={styles.righttext}>
                        <Text style={styles.title} onPress={()=>navigate('Detail',{person:person})} numberOfLines={1}>
                            {person.title}
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{flex:1,color:'gray',fontSize:12}}>
                                {person.reply_count+ ' / ' +person.visit_count} (回复／浏览)
                            </Text>
                            <Text style={{color:'gray'}}>
                                {Tool.getDay(person.create_at)}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
        this.getNavigator=(data,params)=>{
            const {navigate} = props.navigation;
            return navigate;
        }
        this.getParams=(data)=>{
            return alert('asdasd')
        }
    };
    render() {
        const dataSource=this.props.dataSource, {navigate} =this.props.navigation;
        console.log(this)
        return (
            <View >
                <Text>good</Text>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
            </View>
        );
    }

}

export default Main({
    id:'3',
    url:'topics',
    title:'good',
    nav:true,
    data:{page:1,tab:'good',limit:3,mdrender:false},
    component: Index,
})
