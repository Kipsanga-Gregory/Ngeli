import React, {useState} from 'react';
import axios from 'axios'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { BASE_URL, SUCCESS_GREEN } from '../../constants';
import { TextInput } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')
const Swiper = (props)=> {
  const [message, setMessage] = useState('')
  const [input, setInput] = useState(false)
  const [sent, setSent] = useState(false)
  const cancelHandler = () => {
    props.navigation.goBack()
  }
  const onChatPressHandler = (user)=>{
    if(!message){
      console.log('Cant send empty message')
    }else {

        /*  
          :::Attempt to create a new thread
        */
        axios({
          url: BASE_URL,
          method: 'post',
          headers: { x_access_token : `${props.userdata.x_access_token}`, security: 'secure'},
          data: {
            query: `
            mutation{
              addthread(senderid: ${props.userdata.id}, receiverid: ${user.id}){
                  receiverid
                  senderid
                  infomessage
              }
            }
              `
          }
      }).then((result) => {
        console.log(result.data.data.addthread)
        if(result.data.data.addthread.infomessage == "Thread already exists" || result.data.data.addthread.infomessage == "Insert success"){
            /* Procceed from here..... 
              :::TODO - Create a an input field that will add a new messages per thread id
            */
          let rid = user.id.toString()
          let sid = props.userdata.id.toString()
          if(sid > rid){
            let thread_id = Number(rid.slice(0,5).concat(sid.slice(0,5)))
            /* 
            ::: ADD MESSAGE
            */
            axios({
              url: BASE_URL,
              method: 'post',
              headers: { x_access_token : `${props.userdata.x_access_token}`, security: 'secure'},
              data: {
                query: `
                mutation{
                  addmessage( message: "${message}", senderId: ${props.userdata.id}, receiverId: ${user.id}, thread_id: ${thread_id}, readStatus: false) {
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
              setInput(false)
              }
            }).catch((err)=>{
              console.log(` err ${err}`)
            })
          } else {
            let thread_id = Number(sid.slice(0,5).concat(rid.slice(0,5)))
            /* 
            ::: ADD MESSAGE
            */
            axios({
              url: BASE_URL,
              method: 'post',
              headers: { x_access_token : `${props.userdata.x_access_token}`, security: 'secure'},
              data: {
                query: `
                mutation{
                  addmessage( message: "${message}", senderId: ${props.userdata.id}, receiverId: ${user.id}, thread_id: ${thread_id}, readStatus: false) {
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
              setInput(false)
              }
            }).catch((err)=>{
              console.log(` err ${err}`)
            })
          }
        }
        });
      }
    }
    return (
      <View style={styles.container} >

      <View style={styles.swiper}>
      {sent ? (
              <TouchableOpacity style={styles.notific} onPress={()=>setSent(false)}>
                <Ionicons name="ios-arrow-dropleft" size={51} color='snow' />
                <Text style={styles.notificText}>Message Sent</Text>   
              </TouchableOpacity>
            ) : null}
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.scrollView}>
          <View style={styles.imagewrap}>
            <Image
              style={styles.image}
              source={{uri: props.userClicked.images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
            <View style={styles.detail}>
              <Text style={styles.name}>{props.userClicked.firstname}  {props.userClicked.age}</Text>
              <Text style={styles.location}>Eldoret, 35km away</Text>
            </View>
            <View style={styles.actionbtns}>
                <TouchableOpacity onPress={()=>setInput(true)}>
                  <SimpleLineIcons name="bubble" size={45} color="rgb( 15, 166, 91 )" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>cancelHandler()}>
                  <SimpleLineIcons name="close" size={55} color="coral" />
                </TouchableOpacity>
            </View>
            {input ? (
              <View style={styles.inputField}>
                <TextInput style={styles.Input} multiline= {true} placeholder="Type message here..." onChangeText={(val)=>setMessage(val)} value={message} />
                <TouchableOpacity style={styles.subMitBtn} onPress={()=>onChatPressHandler(props.userClicked)}>
                    <Ionicons name="ios-arrow-dropright" size={51} color={message ? "#01a3a4" : "#8395a7"} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={styles.infosec}>
            <View style={styles.firstV}>
              <View style={styles.kids}>
                <Icon name="child-care" size={40} color="rgb(220,220,220)" />
                <Text style={styles.IconLabel}>Someday</Text>
              </View>
              <View style={styles.smoke}>
                <Icon name="smoking-rooms" size={40} color="rgb(220,220,220)" />
                <Text style={styles.IconLabel}>Someday</Text>
              </View>
              <View style={styles.affiliation}>
                <Icon name="child-care" size={40} color="rgb(220,220,220)" />
                <Text style={styles.IconLabel}>Someday</Text>
              </View>
              <View style={styles.status}>
                <Ionicons name="logo-no-smoking" size={40} color="rgb(220,220,220)" />
                <Text style={styles.IconLabel}>Socially</Text>
              </View>
            </View>
            <View style={styles.secondV}>
              <Text style={styles.label}>About...</Text>
              <Text style={styles.text}>{props.userClicked.about}</Text>
            </View>
            <View style={styles.thirdV}>
            {
                props.userClicked.images.filter((image)=> {return image.is_profile != true}).map((image)=>(
                  <Image
                    key={Math.random()}
                    style={styles.image}
                    source={{uri: image.image_url}}
                  />
                ))
              }
            </View>
          </View>
        </ScrollView>
      </View>
      </View>
    );
  }

const mapStateToProps = (state)=>{
  return{
    userClicked: state.BrowseReducer.userClicked,
    userdata : state.AuthReducer.UnregUser
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    AddUserClicked: (user)=>dispatch(AddUserClicked(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Swiper)

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  swiper:{
    // height: height - ( ( (6/100) * (height - 47) ) + 67 ),
    height: height - ( ( (6/100) * (height - 47) ) + 20 ),
    marginHorizontal: 20,
    marginTop: (4/100) * (height - 47),
    marginBottom: 10,
    borderRadius: 20,
    borderColor: 'rgba(1,154,252,0.9)',
    borderWidth: 0.8,
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  image:{
    width: null,
    height: height - ( ( (6/100) * (height - 47) ) + 20 ),
  },
  detail:{
    position: 'absolute',
    bottom: 80,
    left: 50,
    display: 'flex',
    flexDirection: 'column'
  },
  actionbtns:{
    position: 'absolute',
    bottom: 15,
    left: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems: 'center',
    right: 25
  },
  inputField:{
    position: 'absolute',
    bottom: 15,
    left: 25,
    backgroundColor: 'snow',
    paddingVertical: 3,
    right: 25,
    width: (3.1/4) * width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    elevation: 1
  },
  Input:{
    width: (2.4/4) * width,
    color: 'grey',
    marginLeft: 15,
    fontSize: 20,
    flexWrap: 'wrap'
  },
  subMitBtn:{
    marginRight: 6,
    alignSelf: 'center'
  },
  name:{
    alignSelf: 'center',
    color: 'rgb(220,220,220)',
    fontSize: 23,
    fontFamily: 'BalsamiqSans-Regular'
  },
  location:{
    alignSelf: 'center',
    color: 'rgb(220,220,220)',
    fontSize: 23,
    fontFamily: 'BalsamiqSans-Regular'
  },
  infosec:{
    backgroundColor: 'transparent',
  },
  infosecVimage:{
    width: null,
    height: null,
  },
  firstV:{
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgb(174,174,174)',
    height: 165,
    backgroundColor: 'rgba(1,146,252,1)'
  },
  kids:{
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  smoke:{
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  affiliation:{
    position: 'absolute',
    right: 10,
    top: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  status:{
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'column',
    alignItems: 'center'
  },
  IconLabel:{
    fontSize: 18,
    fontFamily: 'BalsamiqSans-Regular',
    color: 'rgb(220,220,220)'
  },
  secondV:{
    marginHorizontal: 8,
    marginTop: 0,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgb(174,174,174)',
    backgroundColor: 'rgba(1,146,252,1)',
    padding: 8
  },
  text:{
    color: 'rgb(220,220,220)',
    fontSize: 18,
    fontFamily: 'BalsamiqSans-Regular',
    marginLeft: 5
  },
  label:{
    color: 'rgb(220,220,220)',
    fontSize: 23,
    fontFamily: 'BalsamiqSans-BoldItalic'
  },
  notific:{
    // width: (width / 2) + 10,
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgb( 15, 166, 91 )',
    position: 'absolute',
    top: (1/100) * (height - 47),
    left: (width - 40) / 24,
    borderRadius: 10,
    paddingHorizontal: 10,
    elevation: 5
  },
  notificText:{
      alignSelf: 'center',
      marginLeft: 10,
      color: 'snow',
      fontSize: 18,
      fontFamily: 'BalsamiqSans-Bold'
  }
});
