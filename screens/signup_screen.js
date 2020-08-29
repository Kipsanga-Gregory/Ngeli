import React, { Component , useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/sign/header';
import {RegNewUser} from '../store/actions/authActions/authActions'

const SignUp = (props) => {

  const [guide, setGuide] = useState("Please provide your details below to help us swiftly create your user acount")
  const [border, setBorder] = useState('snow')
  const [User, setUser] = useState({
    name : undefined,
    phone : undefined,
    password : undefined
  })

  const onChangeName = (val) => {
    setUser({
      ...User,
      name : val
    })
  }
  const onChangePhone = (val) => {
    setUser({
      ...User,
      phone : Number(val)
    })
  }
  const onChangePassword = (val) => {
    setUser({
      ...User,
      password : val
    })
  }

  const onClickHandler = () => {
    if(!User.name && !User.password && !User.phone){
      setGuide("One of the below values must not be empty please")
      setBorder("coral")
    }else{
      props.RegUser(User)
      props.navigation.navigate('Sign Up step-2', {name: "Sign Up step-2"})
    }
  }

  return (
    <ImageBackground source={require('../assets/images/background1.jpg')} style={styles.background}>
      <Header guide={guide} border={border}/>
      <View style={styles.main}>
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
            keyboardType='numeric'
            maxLength={10}
            selectionColor={'snow'}
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
      <TouchableOpacity style={styles.nextbtn} onPress={()=> onClickHandler()}>
        <Text style={styles.nextbtntext}>
          Next
          </Text>
          <Ionicons style={styles.ico} name="ios-arrow-dropright-circle" size={50} color="snow" />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const mapStateToProps = (state) => {
  return {
    newUser : state.AuthReducer.newUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    RegUser : (claim)=>dispatch(RegNewUser(claim))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

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
      fontFamily: 'LobsterTwo-Regular',
      fontSize: 23,
      color: 'snow',
      paddingTop: 8,
      paddingBottom: 8,
      marginRight: 10
    },
    inputsecond:{
      height: 50,
      borderColor: 'snow',
      fontFamily: 'LobsterTwo-Regular',
      borderBottomWidth: 2,
      fontSize: 23,
      color: 'snow',
      marginLeft: 0,
    },
    label:{
      fontFamily: 'Tangerine-Bold',
      fontSize: 40,
      color: 'snow',
      marginTop: 20,
      marginLeft: 10,
      opacity: 1,
      borderTopWidth: 0.8,
      alignSelf: 'flex-start',
      borderLeftWidth: 1,
      borderColor: 'snow',
      paddingRight: 7
    }
});
