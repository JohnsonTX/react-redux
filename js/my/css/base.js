/**
 * Created by ulife on 2017/5/10.
 */
import {Platform,StyleSheet,} from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detail:{
        flex:1,
        alignItems:'stretch'
    },
    listView: {
        marginBottom:25
    },
    reContainer:{
        flex:1,
        borderTopWidth:1,
        borderColor:'rgba(100,100,100,0.3)',
        flexDirection:'row',
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        padding:10,
        backgroundColor:'rgb(0,200,200)',
        flexDirection:'row',
    },
    contentBar:{
        flex: 1,
        backgroundColor: 'white',
    },
    detailContainer:{
        flex:1,
        padding:10,
        flexDirection:'row'
    },
    detailContent:{
        flex:1,
        padding:5,
        alignItems:'stretch',
    },
    thumbnail:{
        width:50,
        height:50,
        borderRadius:25,
        margin:5,
        borderColor:'rgba(0,0,0,0.2)',
        borderWidth:1,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom:5,
    },
    title:{
        flex:1,
        color:'rgb(100,180,0)',
        fontSize:16,
        fontWeight:'bold',
        marginTop:5
    },
    nextPg:{
        flex:1,
        alignItems:"flex-end"
    },
    loading:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        borderTopWidth:1,
        borderColor:'rgba(100,100,100,0.3)',
        height:500,
        backgroundColor:'rgba(100,100,100,0.3)'
    },
    next:{alignItems:'flex-end',color:'white'},
    righttext:{
        flex:1,
        flexDirection:'column',
        padding:5,
    },
    webView: {
        alignItems:'stretch',
    },
    author:{
        width:200,
        height:200,
    },
    navigate:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'rgba(200,200,200,1)',
        borderBottomWidth:1,
        marginTop:5
    },
    onNav:{
       color:"white",
        padding:10,
        marginTop:15,
        borderWidth:1,
        borderColor:'rgb(100,190,0)',
        backgroundColor:"rgb(100,180,0)",
        overflow:"hidden",
    },
    nav:{
        padding:10,
        marginTop:15
    },
    navImg:{
        width:20,
        height:20,
    }
});
