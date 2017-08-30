/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {styles} from '../css/base';
import {
    Image,
    ListView,
    StyleSheet,
    Button,
    Text,
    View
} from 'react-native';
var url = 'https://cnodejs.org/api/v1/topics?page=1&tab=good&limit=20&mdrender=false';
var REQUEST_URL = new Request(url,{method:'GET',cache:'reload'});
export default class Index extends Component {
    constructor(props){
        super(props);
        this.state ={
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.fetchData=function(){
            fetch(REQUEST_URL)
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseData.data),
                    });
                })
                .done();
        }
        this.renderMovie=(person)=>{
            const {navigate} = props.navigation;
            return (
                <View style={styles.reContainer}>
                    <Image source={{uri:person.author.avatar_url}} style={styles.thumbnail}/>
                    <View style={styles.righttext}>
                        <Button style={styles.title} onPress={()=>navigate('Detail')} title={person.title} />
                        <Text style={styles.content}>
                            {person.content}
                        </Text>
                    </View>
                </View>
            );
        }
    };
    render() {
        const data={page:1,tab:'good',limit:20,mdrender:false};
        var arr ='',arr2=["age:1",'sex:female'];
            for(var i in data){
                arr += '&'+i + '='+data[i];
            }

        return (
            <View style={styles.container}>
                <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderMovie}
                    />
            </View>
        );
    }

    componentDidMount(){
        this.fetchData();
    }
}
