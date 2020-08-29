import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux'
import Header from '../components/profilescreen/header'
import ProfileView from '../components/profilescreen/profileView';
import { Plan } from '../components/profilescreen/plan';
import { ScrollView } from 'react-native-gesture-handler';
import { Gallery } from '../components/profilescreen/gallery';
import { PURPLE_LIGHT_THEME } from '../constants';
import {ToggleAuth} from '../store/actions/authActions/authActions'


class ProfileScreen extends Component {
  constructor(){
    super()
    this.removeLocalStorage = this.removeLocalStorage.bind(this)
  }


  removeLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem('userdata')
    } catch(e) {
      // remove error
      console.log(e)
    }
    
    this.props.toggleAuth(false)
    
  }
  
  render() {
    console.log(this.props.userdata)
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.second}>
          <ScrollView>
            <ProfileView navigation={this.props.navigation} />
            <Plan userdata={this.props.userdata}/>
            <Text style={styles.header}>Photo Album</Text>
            <Gallery userdata={this.props.userdata} />
            <TouchableOpacity style={styles.nextbtn} onPress={()=> this.removeLocalStorage()}>
            <Text style={styles.nextbtntext}>
              Logout
              </Text>
              <Ionicons style={styles.ico} name="ios-arrow-dropright-circle" size={50} color="snow" />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      userdata: state.AuthReducer.UnregUser
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    toggleAuth: ()=>dispatch(ToggleAuth(false))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#c8d6e5',
      marginBottom: 47
    },
    second:{
      flex: 1,
      justifyContent: 'space-around'
    },
    header:{
      alignSelf: 'center',
      marginTop: 15,
      color: '#222f3e',
      fontSize: 23,
      fontWeight: 'bold',
    },
    nextbtntext:{
      alignSelf: 'center',
      color: 'snow',
      fontSize: 25,
      fontWeight: 'bold',
      // fontFamily: 'Tangerine-Bold',
      marginRight: 10
    },
    ico:{
      marginLeft: 10
    },
    nextbtn:{
      // backgroundColor: '#3732c9',
      backgroundColor: PURPLE_LIGHT_THEME,
      alignSelf: 'center',
      borderRadius: 15,
      paddingLeft: 15,
      paddingRight: 15,
      marginBottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 1.5,
      borderColor:  'snow'
    }
});
