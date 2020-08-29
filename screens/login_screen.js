import React, { Component , useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {connect} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/sign/header'
import {BASE_URL} from '../constants'
import {ToggleAuth, userLogin} from '../store/actions/authActions/authActions'
import { from } from 'apollo-client-preset';
import Preloader from '../components/pre-loader';

const Login = (props) => {

  const [guide, setGuide] = useState("Note the name field is optional")
  const [border, setBorder] = useState('snow')
  const [loading, setLoading] = useState(false)
  const [User, setUser] = useState({
      name : undefined,
      phone : undefined,
      password : undefined
    })

  const onChangeName = (val) => {
    setUser({...User, name : val})
  }
  const onChangePassword = (val) => {
    setUser({...User, password : val})
  }
  const onChangePhone = (val) => {
    setUser({...User, phone : Number(val)})
  }

    /* Method to persist data on async storage */
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userdata', jsonValue)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  const onLoginHandler = () => {

    if(!User.name && !User.phone && !User.password){
      setGuide("You havent entered any values, please enter your login details")
      setBorder("coral")
    }else if(!User.name){
      setGuide("The name field cant be empty please")
      setBorder("coral")
    }else if(!User.phone){
      setGuide("The phone number field can't be empty. Please enter your phone number")
      setBorder("coral")
    }else if(!User.password){
      setGuide("Please enter your password it cant be empty")
      setBorder("coral")
    }else{
      setLoading(true)
      axios({
        url: BASE_URL,
        method: 'post',
        headers: {security: 'public'},
        data: {
          query: `
          { login (password: "${User.password}" , contacts:${User.phone} ,){
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
                message
                x_access_token
                images {
                ownerid
                is_profile
                image_url
            }
      }
    }
            `
        }
    }).then((result) => {
      if(result.data.data.login){
        if(result.data.data.login[0].message == "Granted"){
          console.log(JSON.stringify(result.data.data))
          setBorder('snow')
          setLoading(false)
              /* Save data to local storage */
          storeData(result.data.data.login[0])
              /* Set userdata to redux */
          props.Login(result.data.data.login[0])
              /* set auth to true */
          props.ToggleAuth()
        } else if(result.data.data.login[0].message == "PassWordError"){
          setBorder("coral")
          setGuide("The passWord entered does not match the contacts, please check your password")
        } else if (result.data.data.login[0].message == "Contact unavailble"){
          setBorder("coral")
          setGuide("The contact entered does not match any in our database, please check or sign up instead")
        }

      }
    });
    }

  }
    return (
      <ImageBackground source={require('../assets/images/background1.jpg')} style={styles.background}>
        <Header guide={guide} border={border}/>
        <View style={styles.main}>
        <Preloader visible={loading} />
          <View style={styles.first}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.inputfirst}
              onChangeText={(val)=> onChangeName(val)}
              selectionColor={'snow'}
            />
          </View>
          <View style={styles.second}>
            <Text style={styles.label}>Phone No</Text>
            <TextInput
              style={styles.inputsecond}
              onChangeText={(val)=> onChangePhone(val)}
              selectionColor={'snow'}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <View style={styles.third}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputfirst}
              onChangeText={(val)=> onChangePassword(val)}
              secureTextEntry
              selectionColor={'snow'}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.nextbtn} onPress={()=> onLoginHandler()}>
          <Text style={styles.nextbtntext}>
            Sign In
            </Text>
            <Ionicons style={styles.ico} name="ios-arrow-dropright-circle" size={50} color="snow" />
        </TouchableOpacity>
      </ImageBackground>
    );
}


const mapStateToProps = (state)=>{
  return{
    userdata : state.AuthReducer.UnregUser
  }
}

const mapDispatchToProps =(dispatch) =>{
  return{
    ToggleAuth: ()=>dispatch(ToggleAuth()),
    Login: (claim)=>dispatch(userLogin(claim))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(Login)



const styles = StyleSheet.create({
  nextbtntext:{
    color: 'snow',
    fontSize: 45,
    fontFamily: 'Tangerine-Bold',
    marginRight: 10
  },
  ico:{
    marginLeft: 10
  },
  nextbtn:{
    // backgroundColor: '#3732c9',
    alignSelf: 'flex-end',
    marginRight: 30,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor:  'snow'
  },
    background:{
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',
      opacity: 0.7
    },
    main:{
      marginRight: 20,
      marginLeft: 20,
      marginTop: 30,
      flex: 1,
      flexDirection: 'row',
      marginBottom: 10
    },
    first:{
      marginRight: 20,
      flexGrow: 0.3
    },
    second:{
      alignSelf: 'center',
      position: 'absolute',
      right: 0
    },
    third:{
      alignSelf: 'flex-end',
      position: 'absolute',
      flexGrow: 0.3
    },
    inputfirst:{
      height: 50,
      borderColor: "snow",
      borderBottomWidth: 2,
      fontFamily: 'LobsterTwo-Reguler',
      fontSize: 23,
      color: 'snow',
      paddingTop: 8,
      paddingBottom: 8,
      marginRight: 10
    },
    inputsecond:{
      height: 50,
      borderColor: 'snow',
      fontFamily: 'LobsterTwo-Reguler',
      borderBottomWidth: 2,
      fontSize: 23,
      color: 'snow',
      marginLeft: 0,
    },
    label:{
      fontFamily: 'Tangerine-Bold',
      fontSize: 45,
      color: 'snow',
      marginTop: 20,
      marginLeft: 5,
      paddingLeft: 5,
      opacity: 1,
      borderTopWidth: 0.8,
      alignSelf: 'flex-start',
      borderLeftWidth: 0.6,
      borderRightWidth: 0.6,
      borderRadius: 5,
      borderColor: 'grey',
      paddingRight: 7
    }
});
