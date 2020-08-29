import React, {useState} from 'react';
import { StyleSheet, Text, View,Modal, TouchableOpacity, Image, Dimensions,TextInput } from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import {BLUE_THEME, PURPLE_INTENSE_THEME, PURPLE_LIGHT_THEME, BASE_URL, SUCCESS_GREEN} from '../../constants';
const {width, height} = Dimensions.get('window')
const MatchModal = (props) => {
    const [message, setMessage] = useState()
    const [sent, setSent] = useState(false)
    const onSendMessage = () =>{
        let rid = props.crushedPerson.id.toString()
        let sid = props.userdata.id.toString()
        if(sid > rid){
            let thread_id = Number(rid.slice(0,5).concat(sid.slice(0,5)))
            /* First add thread */
            axios({
                url: BASE_URL,
                method: 'post',
                headers: { x_access_token: `${props.userdata.x_access_token}` ,security: 'public'},
                data: {
                  query: `
                  mutation{
                    addthread(senderid: ${props.userdata.id}, receiverid: ${props.crushedPerson.id}){
                        receiverid
                        senderid
                        infomessage
                    }
                  }
                    `
                }
            }).then((result) => {
                /* If thread already exist or new one created succesfuly, proceed */
              if(result.data.data.addthread.infomessage == "Thread already exists" || result.data.data.addthread.infomessage == "Insert success"){
                /* Add the message */
                 axios({
                    url: BASE_URL,
                    method: 'post',
                    headers: { x_access_token: `${props.userdata.x_access_token}` ,security: 'public'},
                    data: {
                      query: `
                      mutation{
                        addmessage( message: "${message}", senderId: ${props.userdata.id}, receiverId: ${props.crushedPerson.id}, thread_id: ${thread_id}, readStatus: false) {
                            thread_id
                            infomessage
                        }
                      }
                        `
                    }
                }).then((result) => {
                  if(result.data.data.addmessage){
                    /* Reset Input field and send notification */
                   setMessage('')
                   setSent(true)
                  }
                }).catch((err)=>{
                  console.log(` err ${err}`)
                })
              }
        
            });

        }else{
            let thread_id = Number(sid.slice(0,5).concat(rid.slice(0,5)))
             /* First add thread */
            axios({
                url: BASE_URL,
                method: 'post',
                headers: { x_access_token: `${props.userdata.x_access_token}` ,security: 'public'},
                data: {
                  query: `
                  mutation{
                    addthread(senderid: ${props.userdata.id}, receiverid: ${props.crushedPerson.id}){
                        receiverid
                        senderid
                        infomessage
                    }
                  }
                    `
                }
            }).then((result) => {
                /* If thread already exist or new one created succesfuly, proceed */
              if(result.data.data.addthread.infomessage == "Thread already exists" || result.data.data.addthread.infomessage == "Insert success"){
                /* Add the message */
                 axios({
                    url: BASE_URL,
                    method: 'post',
                    headers: { x_access_token: `${props.userdata.x_access_token}` ,security: 'public'},
                    data: {
                      query: `
                      mutation{
                        addmessage( message: "${message}", senderId: ${props.userdata.id}, receiverId: ${props.crushedPerson.id}, thread_id: ${thread_id}, readStatus: false) {
                          thread_id
                          infomessage
                        }
                      }
                        `
                    }
                }).then((result) => {
                  if(result.data.data.addmessage){
                    /* Reset Input field and send notification */
                   setMessage('')
                   setSent(true)
                  }
                }).catch((err)=>{
                  console.log(` err ${err}`)
                })
              }
        
            });
        }
    }
    return (
        <Modal visible={props.visible} animationType="slide">
          <View style={styles.modalContent}>
            {sent ? (
                <TouchableOpacity style={styles.notific} onPress={()=>setSent(false)}>
                <Ionicons name="ios-arrow-dropleft" size={51} color='#01a3a4' />
                  <Text style={styles.notificText}>Message Sent</Text>
              </TouchableOpacity>
            ) : null}
            <LottieView source={require('../../assets/lottie/love-and-kiss.json')} autoPlay loop style={{width: 130, height: 130}}/>
            <View style={styles.mainWrapper}>
                <View style={styles.rotated1}>
                    <Image style={styles.image} source={{uri: props.userdata.images.filter((image)=> {return image.is_profile == true})[0].image_url}}/>
                </View>
                <Ionicons style={styles.overlayIcon} name="ios-heart" size={67} color="#f368e0" />
                <View style={styles.rotated2}>
                    <Image style={styles.image} source={{uri: props.crushedPerson.images.filter((image)=> {return image.is_profile == true})[0].image_url}}/>
                </View>
            </View>
            <Text style={styles.modalText}><Text style={{...styles.modalText, fontSize: 23,fontFamily: 'BalsamiqSans-Bold'}}>You</Text> and <Text style={{...styles.modalText, fontSize: 23, fontFamily: 'BalsamiqSans-Bold'}}>{props.crushedPerson.firstname}</Text> Like each Other</Text>
            <Text style={{...styles.modalText, fontSize: 18}}>Why not send her a message</Text>
            <View style={styles.InputSection}>
                <TextInput style={styles.Input} multiline= {true} placeholder="Type message here..." onChangeText={(val)=>setMessage(val)} value={message} />
                <TouchableOpacity style={styles.subMitBtn} onPress={()=>onSendMessage()}>
                    <Ionicons name="ios-arrow-dropright" size={51} color={message ? "#01a3a4" : "#8395a7"} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={()=>{props.setModal(); setMessage('')}} style={styles.actionBtn}>
                <Ionicons name="ios-close-circle-outline" size={67} color="#ff9f43" />
            </TouchableOpacity>
          </View>
        </Modal>
    )
}

const mapStateToProps = (state)=>{
    return {
        userdata : state.AuthReducer.UnregUser
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MatchModal)

const styles = StyleSheet.create({
    modalContent:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: PURPLE_LIGHT_THEME
      },
      modalText:{
        color: '#c8d6e5',
        fontSize: 18,
        fontFamily: 'BalsamiqSans-Regular'
      },
      actionBtn:{
          position: 'absolute',
          top: (8/100) * height,
          right: (10/100) * width
      },
      mainWrapper:{
        flexDirection: 'row',
        marginVertical: 15
        // flexGrow: 0.3
      },
      image: {
          width: null,
          height: 110,
        //   borderRadius: 15,
        //   borderWidth: 2,
        //   borderColor: '#ff9ff3',
        //   margin: 7
      },
      overlayIcon:{
          position: 'absolute',
          left: 82,
          bottom: 46,
          zIndex: 5000
      },
    InputSection:{
      width: (3.3/4) * width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 35,
      borderRadius: 12,
      backgroundColor: '#c8d6e5',
      elevation: 1,
      marginBottom: width / 4
    },
    Input:{
        color: 'grey',
        marginHorizontal: 15,
        fontSize: 20
      },
      subMitBtn:{
        marginRight: 6,
        alignSelf: 'center'
      },
      rotated1:{
        width: 110,
        height: 110,
        resizeMode: "contain",
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ff9ff3',
        transform: [{ rotate: '10deg' }]
      },
      rotated2:{
        width: 110,
        height: 110,
        resizeMode: "contain",
        overflow: 'hidden',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#ff9ff3',
        transform: [{ rotate: '-10deg' }]
      },
      notific:{
        // width: (width / 2) + 10,
        flexDirection: 'row',
        height: 50,
        backgroundColor: SUCCESS_GREEN,
        position: 'absolute',
        top: height * (1/16),
        left: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        elevation: 5
      },
      notificText:{
          alignSelf: 'center',
          marginLeft: 10,
          color: '#01a3a4',
          fontSize: 18,
          fontFamily: 'BalsamiqSans-Bold'
      }
})

