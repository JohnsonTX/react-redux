
import React, { Component } from 'react';
import {styles} from '../css/base';
import Main from './public/Main';
import Tool from '../tool';
import {
    AppRegistry,
    Text,
    Image,
    ListView,
    Button,
    View
} from 'react-native';
// import { TabNavigator } from "react-navigation";
import { TabNavigator } from "react-navigation";

class Index extends Component {
    constructor(props){
        super(props);
        this.state={
            topicId:props.state,
            styleType:this.props.route.index || 'all'
        }
        this.renderMovie=(person)=>{
            // const {navigate} =props.navigation;
            var url = person.author.avatar_url;
            if(person.author.avatar_url.indexOf('http') ==-1){
                url = 'https:' + person.author.avatar_url;
            }
            return(
                <View style={styles.reContainer}>
                    <Image source={{uri:url}} style={styles.thumbnail}/>
                    <View style={styles.righttext}>
                        <Text style={styles.title} onPress={()=>{this.toDetail(person.id)}} numberOfLines={1}>
                            {person.title}
                        </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{flex:1,color:'gray',fontSize:12}} >
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
        this.toDetail=(topic)=>{
            const {router} = props;
            router.toDetail(topic);
        }
        this.resetMainPage=(type)=>{
            const {router} = props;
            this.setState({styleType:type})
            console.log(type)
            router.resetMainPage(type);
        }
        this.getNavigator=(data,params)=>{
            // const {navigate} = props.navigation;
            return navigate;
        }

    };
    render() {
        const dataSource=this.props.dataSource;
        var  styleType= {backgroundColor:'red',color:"white"};
        return (
            <View >
                <View style={styles.navigate} >
                        <Text style={this.state.styleType == 'all' ? styles.onNav : styles.nav} selectedTitleStyle={{color:'blue'}}  onPress={()=>this.resetMainPage('all')}>全部</Text>
                    <Text style={this.state.styleType == 'good' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('good')}>精选</Text>
                    <Text style={this.state.styleType == 'share' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('share')}>分享</Text>
                    <Text style={this.state.styleType == 'ask' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('ask')}>问答</Text>
                    <Text style={this.state.styleType == 'job' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('job')}>招聘</Text>
                </View>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.renderMovie}
                    style={styles.listView}
                />
                <View style={styles.navigate} >
                    <Text style={this.state.styleType == 'all' ? styles.onNav : styles.nav} selectedTitleStyle={{color:'blue'}}  onPress={()=>this.resetMainPage('all')}>首页</Text>
                    <Text style={this.state.styleType == 'good' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('good')}>发表</Text>
                    <Text style={this.state.styleType == 'share' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('share')}>分享</Text>
                    <Text style={this.state.styleType == 'ask' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('ask')}>消息</Text>
                    <Text style={this.state.styleType == 'job' ? styles.onNav : styles.nav} onPress={()=>this.resetMainPage('job')}>我的</Text>
                </View>
            </View>
        );
    }

}



// function getCmp(data,id) {
//     return {
//         screen:Main({
//             id:id,
//             url:'topics',
//             title:data,
//             nav:true,
//             data:{page:1,tab:data,limit:10,mdrender:false},
//             component: Index,
//         })
//     }
// }
// const MainScreen = TabNavigator({
//     Index: getCmp('all',1),
//     Good: {
//         screen: Test
//     }
// },{
//     tabBarOptions: {
//         activeTintColor: 'blue',
//         tabBarPosition:'top',
//         path:'/index/:type',
//         animationEnabled:true,
//         swipeEnabled:true,
//     }})
// function select(store){
//     return store;
// }
// export default connect(select)(MainScreen);

export default Main({
    id:'index',
    url:'topics',
    title:'index',
    data:{page:1,tab:'all',limit:10,mdrender:false},
    component: Index,
});
