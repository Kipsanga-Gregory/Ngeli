import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {AddMessage} from '../../store/actions/chatActions/chatActions'
import Header from './header';
import { BASE_URL } from '../../constants';

const {width, height} = Dimensions.get('window')
class Convo extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: undefined,
      messageList: this.props.convoParam.message
    }
  }
  render() {
    const onChangeHandler = (val) =>{
      let rid = this.props.convoParam.patner[0].id.toString()
      let sid = this.props.userdata.id.toString()
      if(this.props.userdata.id > this.props.convoParam.id){
          let thread_id = Number(rid.slice(0,5).concat(sid.slice(0,5)))
          // Update the state with new message
          this.setState({messageList: this.state.messageList.concat({message: val.nativeEvent.text, thread_id:thread_id, senderId: this.props.userdata.id, receiverId:this.props.convoParam.patner[0].id , time: '12:34'})})
          // Add the message to redux store for persistence
          this.props.AddMessage({message: val.nativeEvent.text, thread_id:thread_id, senderId: this.props.userdata.id, receiverId:this.props.convoParam.patner[0].id , time: '12:34'})
          // save the message to server
          axios({
            url: BASE_URL,
            method: 'post',
            headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
            data: {
              query: `
              mutation{
                addmessage( message: "${val.nativeEvent.text}", senderId: ${this.props.userdata.id}, receiverId: ${this.props.convoParam.patner[0].id}, thread_id: ${thread_id}, readStatus: false) {
                  senderid
                  thread_id
                  receiverid
                  message
                  readstatus
                  infomessage
                }
              }
                `
            }
        }).then((result) => {
          if(result.data.data.addmessage){
            /* TODO ::
             * :: Set single tick confirmation here here 
            */
            console.log(` result ${result.data.data.addmessage}`)
          }
        }).catch((err)=>{
          console.log(` err ${err}`)
        });
      }else{
          let thread_id = Number(sid.slice(0,5).concat(rid.slice(0,5)))
          this.setState({messageList: this.state.messageList.concat({message: val.nativeEvent.text, thread_id: thread_id, senderId: this.props.userdata.id, receiverId:this.props.convoParam.patner[0].id , time: '12:34'})})
          // Add the message to redux store for persistence
          this.props.AddMessage({message: val.nativeEvent.text, thread_id:thread_id, senderid: this.props.userdata.id, receiverid:this.props.convoParam.patner[0].id , time: '12:34'})
          // save the message to server
          axios({
            url: BASE_URL,
            method: 'post',
            headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
            data: {
              query: `
              mutation{
                addmessage( message: "${val.nativeEvent.text}", senderId: ${this.props.userdata.id}, receiverId: ${this.props.convoParam.patner[0].id}, thread_id: ${thread_id}, readStatus: false) {
                  senderid
                  thread_id
                  receiverid
                  message
                  readstatus
                  infomessage
                }
              }
                `
            }
        }).then((result) => {
          if(result.data.data.addmessage){
            /* TODO ::
             * :: Set single tick confirmation here here 
            */
            console.log(` result ${JSON.stringify({...this.props.convoParam})}`)
          }
        }).catch((err)=>{
          console.log(` err ${err}`)
        })
        
      }
    }
    return (
    <View style={styles.container} >
      <Header navigation={this.props.navigation}/>
      <View style={styles.status}>
        <Text style={styles.statusText}>Online</Text>
      </View>
      <ScrollView>
        <View style={styles.received}>
          <Text style={styles.receivedText}>Hey bro, how yah, good</Text>
          <Text style={styles.time}>14:37</Text>
        </View>
        {
          this.state.messageList.map((item, index)=>{
            {/* console.log(new Date(Number(item.time_sent))) */}
            return(
              <View style={styles.sent} key={index}>
                <Text style={styles.sentText}>{ item.message }</Text>
                <Text style={{...styles.time, color: 'snow'}}>{item.time}</Text>
              </View>
            )
          })
        }
      </ScrollView>
        <View style={styles.InputSection}>
          <TextInput style={styles.Input} placeholder="Type message here..." onSubmitEditing={(val)=>onChangeHandler(val)} />
        </View>
    </View>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    userdata : state.AuthReducer.UnregUser,
    convoParam: state.ChatsReducer.convoParam
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    AddConvoParam: (user)=>dispatch(AddConvoParam(user)),
    AddMessage: (message)=>dispatch(AddMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Convo)


const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    sent:{
      alignSelf: 'flex-end',
      marginRight: 20,
      marginLeft: (30/100)*(width - 20),
      padding: 10,
      borderRadius: 10,
      elevation: 5,
      marginTop: 5,
      flexDirection: 'row',
      backgroundColor: 'rgba(1,154,252,1)'
    },
    sentText:{
      marginRight: 10,
      fontSize: 16,
      fontFamily: 'BalsamiqSans-Regular'
    },
    received:{
      alignSelf:'flex-start',
      marginLeft: 22,
      marginRight: (30/100)*(width - 20),
      padding: 10,
      marginTop: 5,
      borderRadius: 10,
      elevation: 2,
      flexDirection: 'row',
      backgroundColor: 'white'
    },
    receivedText:{
      marginRight: 25,
      color: 'grey',
      fontSize: 16,
      fontFamily: 'BalsamiqSans-Regular'
    },
    time:{
      alignSelf: 'flex-end',
      color: 'black'
    },
    status:{
      alignSelf: 'center'
    },
    statusText:{
      color: 'rgba(1,154,252,1)',
      fontFamily: 'BalsamiqSans-Bold',
      letterSpacing: 1
    },
    InputSection:{
      marginHorizontal: 20,
      marginBottom: 10,
      borderRadius: 12,
      elevation: 1,
      padding: 2
    },
    Input:{
      color: 'grey',
      marginHorizontal: 15,
      fontSize: 18
    }
});
