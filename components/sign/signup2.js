import React, { Component , useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker
} from 'react-native';
import {connect} from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from './header'
import {RegNewUser} from '../../store/actions/authActions/authActions'

const SignUp2 = (props) => {

  const [guide, setGuide] = useState("A brief Info about yourself and be just a swipe away from your other half !")
  const [border, setBorder] = useState('snow')
  const [User, setUser] = useState({
    ...props.newUser,
    gender: 'Male',
    intrestInApp: 'To date seriously'
  })

  const onchangeGender = (val) => {
    setUser({
      ...User,
      gender: val
    })
  }
  const onchangeIntrest = (val) => {
    setUser({
      ...User,
      intrestInApp: val
    })
  }
  const onChangeAge = (val) => {
    setUser({
      ...User,
      age: Number(val)
    })
  }

  const onNavigateHandler = ()=>{

    if(typeof(User.age) == 'NaN'){
      setGuide("Please you must enter a number for the age field")
      setBorder("coral")
    }else if(!User.age){
      setGuide("Age value must be a number between and including 18 and 99. Please enter correct age")
      setBorder("coral")
    }else if(User.age < 18){
      setGuide("Users Only above 18years of age are allowed to sign up please")
      setBorder("coral")
    }else if(typeof(User.age) != 'number'){
      setGuide("Age value must be a number between and including 18 and 99 please. Enter correct age")
      setBorder("coral")
    }else{
      props.RegUser(User)
      props.navigation.navigate('Sign Up step-3', {name: 'Sign Up step-3'})
    }

  }

    return (
      <ImageBackground source={require('../../assets/images/background1.jpg')} style={styles.background}>
        <Header guide={guide} border={border}/>
        <View style={styles.main}>
          <View style={styles.first}>
              <Text style={styles.label}>Gender</Text>
              <Picker
              selectedValue={User.gender}
              onValueChange={(val)=>onchangeGender(val)}
              style={{color: 'snow'}}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
          </View>
          <View style={styles.second}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.inputsecond}
              onChangeText={(val)=> onChangeAge(val)}
              keyboardType='numeric'
              maxLength={2}
              selectionColor={'snow'}
            />
          </View>
          <View style={styles.third}>
            <Text style={styles.label}>I'm here...</Text>
            <Picker
            selectedValue={User.intrestInApp}
            onValueChange={(val)=>onchangeIntrest(val)}
            style={{color: 'snow'}}
            >
              <Picker.Item label="To date seriously" value="To date seriously" />
              <Picker.Item label="To chat" value="To chat" />
              <Picker.Item label="For friends with benefits" value="For friends with benefits" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity style={styles.nextbtn} onPress={()=> onNavigateHandler()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp2);

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
