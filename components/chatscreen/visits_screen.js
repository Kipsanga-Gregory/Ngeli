import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Header from './header';
import CustomNav from './customnav';
import {AddUserClicked} from '../../store/actions/browseActions/browseActions'
import { BASE_URL } from '../../constants';

class Visits extends Component {
  constructor(props){
    super(props)
    this.state = {
      visits:[]
    }
  }

  componentDidMount(){
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
      data: {
        query: `
        {
          visits(id: ${this.props.userdata.id}){
            visitorid
            visitedid
            time_visited
            reacted
            visitor{
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
    if(result.data.data.visits){
      this.setState({visits: result.data.data.visits})
    }
  });
  }
  render() {
    const onVisitorPress = (visitor) =>{
      this.props.AddUserClicked(visitor)
      // console.log(visitor)
      this.props.navigation.navigate('UserScreen', {name: 'UserScreen'})
    }
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <CustomNav navigation={this.props.navigation}/>
        <ScrollView style={styles.main}>
          {
            this.state.visits.map((visit)=>{
              return (
                <TouchableOpacity key={Math.random(0,1)} style={{...styles.chatBar,borderWidth: 0.3, borderColor: visit.reacted == false ? "rgba(1,146,252,1)" : styles.chatBar.borderColor}} onPress={()=>onVisitorPress(visit.visitor[0])}>
                  <View style={styles.firstSection}>
                    <Image
                      style={styles.image}
                      source={{uri: visit.visitor[0].images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                  </View>
                  <View style={styles.secondSection}>
                    <View style={styles.middleSection}>
                      <Text style={styles.name}>{visit.visitor[0].firstname}</Text>
                      <Text style={{...styles.messages}}>Visited you 1 hour ago!</Text>
                    </View>
                  </View>
                  <Text style={styles.notification}>{visit.reacted == false ? "New" : ""}</Text>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Visits)

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  main:{
    flex: 1,
    padding: 8
  },
  chatBar:{
    height: 100,
    overflow: 'hidden',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 15,
    borderWidth: 0.6,
    borderRadius: 15,
    borderColor: 'grey'
  },
  firstSection:{
    alignSelf: 'center',
  },
  image:{
    resizeMode: 'cover',
    width: 100,
    height: 100
  },
  secondSection:{
    alignSelf: 'center',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent:'center'
  },
  middleSection:{
    marginLeft: 3,
    alignItems: 'center'
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
  },
  notification:{
    position: 'absolute',
    top: 2,
    right: 8,
    fontSize: 16,
    fontFamily: 'BalsamiqSans-Regular',
    color: 'rgba(1,146,252,1)'
  }
});
