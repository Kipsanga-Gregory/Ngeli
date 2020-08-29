import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Header from './header';
import CustomNav from './customnav';
import { BASE_URL } from '../../constants';
import {AddUserClicked} from '../../store/actions/browseActions/browseActions';

class Favorites extends Component {
  constructor(props){
    super(props)
    this.state = {
      favorites: []
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
          favorites(id: ${this.props.userdata.id}){
            favoritedid
            favoriterid
            time_fav
            reacted
            favoritor{
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
    if(result.data.data.favorites){
      this.setState({favorites: result.data.data.favorites})
    }
  });
  }
  render() {
    const onVisitorPress = (favoriter) =>{
      this.props.AddUserClicked(favoriter)
      console.log(favoriter)
      this.props.navigation.navigate('UserScreen', {name: 'UserScreen'})
    }
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <CustomNav navigation={this.props.navigation}/>
        <View style={styles.main}>
          {
            this.state.favorites.map((fav)=>{
              return (
                <TouchableOpacity key={Math.random()} style={styles.chatBar} onPress={()=>onVisitorPress(fav.favoritor[0])}>
                  <View style={styles.firstSection}>
                    <Image
                      style={styles.image}
                      source={{uri: fav.favoritor[0].images.filter((image)=> {return image.is_profile == true})[0].image_url}} />
                  </View>
                  <View style={styles.middleSection}>
                    <Text style={styles.name}>{fav.favoritor[0].firstname}</Text>
                    <Text style={styles.messages}>Marked you Favorite. You got a chance! Utilise this Greg</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  main:{
    flex: 1,
    margin: 8
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
    alignItems: 'center',
    flex: 1,
    padding: 5
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
