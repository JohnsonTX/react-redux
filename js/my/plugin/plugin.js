'use strict';
import React, { Component } from 'react';
var ReactNative = require('react-native');
var {
    Animated,
    Easing,
    StyleSheet,
    Image,
    Button,
    Text,
    View,
} = ReactNative;

class FadeInView extends Component {
    constructor(props) {
        super(props);
        this.state ={
            anims: new Animated.Value(0)
        }
        this.Circle=()=>{
             this.state.anims.setValue(0);
            Animated.spring(this.state.anims,{
                toValue:1,
                velocity:10,
                tension:10,
                friction:3,
            }).start(()=>{this.Circle()});
        }
    }
    render() {
        return (
            <View style={styles.loading}>
                <Animated.Image source={require('../img/loading.png')} style={{width:38,height:38,transform:[{
                    rotate:this.state.anims.interpolate({
                        inputRange:[0,1],
                        outputRange:[
                            '0deg','360deg'
                        ]
                    })
                }]}} />
               <Text style={{ color:'gray'}}>loading...</Text>
            </View>


        );
    }
    componentDidMount(){
        this.Circle()
    }

}
var styles = StyleSheet.create({
    content: {
        backgroundColor: 'deepskyblue',
        borderWidth: 1,
        borderColor: 'dodgerblue',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    loading:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',

    }
});
module.exports = FadeInView;
