import React, { Component } from 'react';
import {connect} from 'react-redux'
import axios from 'axios';
import LottieView from 'lottie-react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BASE_URL, PURPLE_INTENSE_THEME, PURPLE_LIGHT_THEME} from '../../constants'
import Header from './header';
import CustomNav from './customnav';
import {AddUserClicked} from '../../store/actions/browseActions/browseActions'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')
class Likes extends Component {
  constructor(){
    super()

    this.state = {
      
    }

    this.onImagePress = this.onImagePress.bind(this)

  }
  componentDidMount(){
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
      data: {
        query: `
        {
          crushes(id: ${this.props.userdata.id}) {
            crusherid
            crushedid
            reacted
            mutual
            users(id: ${this.props.userdata.id}){
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
    if(result.data.data.crushes){
      this.setState({matches: result.data.data.crushes})
    }
  }).catch((err)=>{
    console.log(err)
  })
  }

  async onImagePress (match){
    await this.props.AddUserClicked(match)
    this.props.navigation.navigate('UserScreen', {name:'UserScreen'})
  }

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <CustomNav navigation={this.props.navigation}/>
        <ScrollView>
          <View style={styles.main}>
            {
              this.state.matches ? (
                this.state.matches.map((match)=>(
                  <View style={styles.FirstCol} key={match.users[0].id}>
                    <TouchableOpacity style={styles.image} onPress={()=>this.onImagePress(match.users[0])}>
                      <Image
                        style={{width: width/2-14, height: 140}}
                        source={{uri: match.users[0].images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                    </TouchableOpacity>
                    <View style={styles.action}>
                      <View style={styles.wrap}>
                        <Text style={styles.name}>{match.users[0].firstname}</Text>
                        <Text style={styles.name}>{match.users[0].age}</Text>
                      </View>
                      <LottieView source={require('../../assets/lottie/love.json')} autoPlay loop style={{width: 100, height: 100, alignSelf:"center"}}/>
                    </View>
                  </View>
                ))
              ) : null
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userdata: state.AuthReducer.UnregUser
})

const mapDispatchToProps = (dispatch) =>({
  AddUserClicked: (user)=>dispatch(AddUserClicked(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Likes)


const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  main:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  FirstCol:{
     // backgroundColor: '#635DB7',
     height: 200,
     overflow: 'hidden',
     width: width/2 - 14,
     display: "flex",
     alignItems:"center",
     marginTop: 8,
     marginRight: 4,
     marginBottom: 4,
     marginLeft: 8,
     borderWidth: 0.1,
     elevation: 1,
     borderColor: 'rgba(1,146,252,1)',
     borderRadius: 10
},
action:{
  height: 60,
  width: width/2-14,
  paddingHorizontal: 6,
  flexDirection: 'row',
  justifyContent:"space-between",
  backgroundColor: 'rgba(1,146,252,0.03)'
},
wrap:{
  alignSelf: 'center'
},
name:{
  alignSelf: 'center',
  color: 'grey',
  fontSize: 17,
  fontFamily: 'BalsamiqSans-Regular'
}
});
