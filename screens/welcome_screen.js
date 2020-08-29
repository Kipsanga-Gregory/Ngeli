import React, { Component , useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image
} from 'react-native';
import {connect} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import WelcomeHeader from '../components/sign/welcome_header'
import {ToggleAuth} from '../store/actions/authActions/authActions'

 const Welcome = (props)=> {

  const onNavigateSignHandler = ()=>{
    props.navigation.navigate('Sign Up', {name: 'Sign Up'})
  }
  const onNavigateLoginHandler = () => {
    props.navigation.navigate('Login', {name: 'Login'})
  }
    return (
      <ImageBackground source={require('../assets/images/background1.jpg')} style={styles.background}>
        <WelcomeHeader guide="A picture is worth a thousand words. Let yours be a million, use your best photos!"/>

        <View style={styles.second}>
          <View style={styles.btnwrap1}>
            <TouchableOpacity style={styles.nextbtn} onPress={()=> onNavigateLoginHandler()}>
              <Text style={styles.nextbtntext}>
                Sign In
                </Text>
                <Ionicons style={styles.ico} name="ios-lock" size={50} color="snow" />
            </TouchableOpacity>
          </View>
          <View style={styles.btnwrap}>
            <TouchableOpacity style={styles.nextbtn} onPress={()=> onNavigateSignHandler()}>
              <Text style={styles.nextbtntext}>
                Sign Up
                </Text>
                <Ionicons style={styles.ico} name="ios-lock" size={50} color="snow" />
            </TouchableOpacity>
          </View>
          <Text style={styles.footer}>
            By logging in, I accept the <Text style={styles.link}>Terms of Use</Text> and <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  link:{
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    fontFamily: 'BalsamiqSans-Bold'
  },
  footer:{
    fontFamily: 'BalsamiqSans-Regular',
    marginTop: 30,
    alignSelf: 'center',
    marginBottom: 8,
    marginLeft: 10
  },
  btnwrap1:{
    marginBottom: 20,
    alignSelf: 'center'
  },
  btnwrap:{
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center'
  },
  second:{
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  nextbtntext:{
    color: 'snow',
    fontSize: 50,
    fontFamily: 'Tangerine-Bold',
    marginRight: 10
  },
  ico:{
    marginLeft: 50
  },
  nextbtn:{
    alignSelf: 'flex-end',
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    // marginBottom:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor:  'snow'
  },
    background:{
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',
      opacity: 0.7,
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    label:{
      fontFamily: 'Tangerine-Bold',
      fontSize: 40,
      color: 'snow',
      marginTop: 20,
      opacity: 1,
      borderTopWidth: 0.8,
      alignSelf: 'flex-start',
      borderLeftWidth: 0.98,
      borderColor: 'snow',
      paddingRight: 7
    }
});

const mapStateToProps = (state)=>{
  return{

  }
}

const mapDispatchToProps =(dispatch) =>{
  return{
    ToggleAuth: ()=>dispatch(ToggleAuth())
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Welcome)
