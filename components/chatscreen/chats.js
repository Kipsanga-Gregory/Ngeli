import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {AddConvoParam} from '../../store/actions/chatActions/chatActions'
import { BASE_URL, BORDER_TINT } from '../../constants';

class Chats extends Component {
  constructor(props){
    super(props)
    this.state = {
      threads: []
    }
    this.onChatBarPressHandler = this.onChatBarPressHandler.bind(this)
  }
  componentDidMount(){
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
      data: {
        query: `
        {
          thread(id: ${this.props.userdata.id}){
            id
            receiverid
            senderid
            message {
              thread_id
              receiverid
              senderid
              message
              time_sent
              readstatus
              message
            }
            patner(id: ${this.props.userdata.id}){
              id
              firstname
              about
              age
              gender
              occupation
              drink
              smoke
              kids
              occupation
              intrestinapp
              contacts
              password
              relstatus
              givenlocation
              livelocation
              age
              contacts
              drink
              viewedad
              plan
              online
              kids
              joined
              images {
                ownerid
                is_profile
                image_url
            }
            }
          }
        }
          `
      }
  }).then((result) => {
    if(result.data.data.thread){
      this.setState({threads: result.data.data.thread})
    }
  }).catch((err)=>{
    console.log(err)
  })
  }

  async onChatBarPressHandler (user) {
    await this.props.AddConvoParam(user)
    this.props.navigation.navigate('Convo', {name: 'Convo'})
  }
  
  render() {

    const DATA = [
      {name:'Waweru', lastMessage: {val: 'Hey can I be your',isRead: true},online: true, id: Math.random(), image: require('../../assets/images/me.jpg') , isFavorite: false},
      {name:'Jonathan', lastMessage: {val: 'Hey can I be your',isRead: true},online: true, id: Math.random(), image: require('../../assets/images/IMG-20190916-WA0001.jpg') , isFavorite: false},
    ]
    const filterStatus = ()=>{
      /*First check wether the call is from main or Online, Online call has a query prop */
      if(this.props.query == 'true'){
        let Online = DATA.filter((user) => {
          return user.online == true
        })
        return Online.map((user)=>(
          <TouchableOpacity style={styles.chatBar} onPress={()=>this.onChatBarPressHandler()} key={user.id}>
            <View style={styles.firstSection}>
              <Image
                style={styles.image}
                source={user.image} />
            </View>
            <View style={styles.secondSection}>
              <View style={styles.middleSection}>
                <Text style={styles.name}>
                  {`${user.firstname}  `}
                  {user.lastMessage.isRead ? null : (<SimpleLineIcons name="star" color={ 'green'} size={15} />)}
                </Text>
                <Text style={{
                  ...styles.messages,
                  color: user.lastMessage.isRead ? styles.messages.color : 'green'
                }}>
                {user.lastMessage.val.split('').length < 26 ? user.lastMessage.val :
                  `${user.lastMessage.val.split('').splice(0,25).concat('...').join('')}`
                }
                </Text>
              </View>
              <View style={styles.thirdSection}>
                  <SimpleLineIcons name="star" color={user.isFavorite ? 'blue' : 'grey'} size={20} />
              </View>
            </View>
          </TouchableOpacity>
        ))
      }else{
      return this.state.threads.map((user)=>{
          if(user.message[0]){
            return (
              <TouchableOpacity style={styles.chatBar} onPress={()=>this.onChatBarPressHandler(user)} key={user.id}>
                <View style={styles.firstSection}>
                  <Image
                    style={styles.image}
                    source={{uri: user.patner[0].images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                </View>
                <View style={styles.secondSection}>
                <View style={styles.middleSection}>
                    <Text style={styles.name}>
                      {`${user.patner[0].firstname}  `}
                      {user.message[0].readstatus == "true" ? null : (<SimpleLineIcons name="star" color={ 'green'} size={15} />)}
                    </Text>
                    <Text style={{
                      ...styles.messages,
                      color: user.message[0].readstatus == "true" ? styles.messages.color : 'green'
                    }}>
                    {user.message[user.message.length - 1].message.split('').length < 26 ? user.message[user.message.length - 1].message :
                      `${user.message[user.message.length - 1].message.split('').splice(0,25).concat('...').join('')}`
                    }
                    </Text>
                  </View>
                  <View style={styles.thirdSection}>
                      <SimpleLineIcons name="star" color={user.isFavorite ? 'blue' : 'grey'} size={20} />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }else{
            return null
          }
      })
      }
    }
    return (
      <ScrollView style={styles.main} >
      {
        filterStatus()
      }
      </ScrollView>
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
    AddConvoParam: (user)=>dispatch(AddConvoParam(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats)

const styles = StyleSheet.create({
  main:{
    flex: 1,
    paddingTop: 10
  },
  chatBar:{
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 5,
    padding: 5
  },
  firstSection:{
    alignSelf: 'center',
  },
  image:{
    resizeMode: 'cover',
    width: 66,
    height: 66,
    borderRadius: 33
  },
  secondSection:{
    alignSelf: 'center',
    marginLeft: 20,
    flexGrow: 1,
    paddingVertical: 4,
    flexDirection: 'row',
    borderBottomWidth: 0.7,
    borderColor: BORDER_TINT
  },
  middleSection:{
    marginLeft: 3
  },
  thirdSection:{
    alignSelf: 'center',
    position: 'absolute',
    right: 15
  },
  name:{
    color: 'rgb(49, 49, 49)',
    fontSize: 18,
    fontFamily: 'BalsamiqSans-Regular'
  },
  messages:{
    fontSize: 16,
    fontFamily: 'BalsamiqSans-Regular',
    color: 'grey'
  }
});
