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

const SignUp3 = (props) => {

  const [guide, setGuide] = useState("A third of happy couples found each other on a dating app, why not you too?")
  const [border, setBorder] = useState('snow')
  const [User, setUser] = useState({
    ...props.newUser,
    relStatus: 'Single',
    occupation: 'Still a student'
  })

  const onChangeOccupation = (val) => {
    setUser({
      ...User,
      occupation : val
    })
  }
  const onchangeRelStatus = (val) => {
    setUser({
      ...User,
      relStatus : val
    })
  }
  const onChangeDescription = (val) => {
    setUser({
      ...User,
      description : val
    })
  }

  const onNavigateHandler = ()=>{
    if(!User.description){
      setGuide("The description Field must not be empty please")
      setBorder("coral")
    }else{
      props.RegUser(User)
      props.navigation.navigate('Sign Up step-4', {name: 'Sign Up step-4'})
    }
  }
    return (
      <ImageBackground source={require('../../assets/images/background1.jpg')} style={styles.background}>
        <Header guide={guide} border={border}/>
        <View style={styles.main}>
          <View style={styles.wrap}>
            <View style={styles.first}>
                <Text style={styles.label}>Occupation</Text>
                <Picker
                selectedValue={User.occupation}
                onValueChange={(val)=>onChangeOccupation(val)}
                style={{color: 'snow'}}
                >
                  <Picker.Item label="Still a student" value="Student" />
                  <Picker.Item label="Working" value="Working" />
                </Picker>
            </View>
            <View style={styles.second}>
              <Text style={styles.label}>Rel Status</Text>
              <Picker
              selectedValue={User.relStatus}
              onValueChange={(val)=>onchangeRelStatus(val)}
              style={{color: 'snow'}}
              >
                <Picker.Item label="Single" value="Single" />
                <Picker.Item label="Engaged" value="Engaged" />
                <Picker.Item label="Married" value="Married" />
                <Picker.Item label="Divorced" value="Divorced" />
              </Picker>
            </View>
          </View>
          <View style={styles.third}>
            <Text style={styles.label}>A brief description of yourself</Text>
            <View style={styles.textarea}>
              <TextInput style={styles.inputfirst}
              numberOfLines={5}
              multiline={true}
              onChangeText={(val)=>onChangeDescription(val)}
              selectionColor={'snow'}
              />
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp3);


const styles = StyleSheet.create({
  nextbtntext:{
    color: 'snow',
    fontSize: 45,
    fontFamily: 'Tangerine-Bold',
    marginRight: 10
  },
  wrap:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ico:{
    marginLeft: 10
  },
  nextbtn:{
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
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    first:{
      marginRight: 20,
      flexGrow: 0.3
    },
    second:{
      marginLeft: 20
    },
    third:{
      alignSelf: 'flex-end',
      flexGrow: 0.3
    },
    textarea:{
      borderWidth: 1,
      borderColor: 'snow',
      borderRadius: 5,
      marginTop: 7
    },
    inputfirst:{
      height: 50,
      fontFamily: 'LobsterTwo-Regular',
      fontSize: 23,
      color: 'snow',
      justifyContent: 'flex-start',
      height: 130
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
      // marginLeft: 10,
      opacity: 1,
      borderTopWidth: 0.8,
      alignSelf: 'flex-start',
      borderLeftWidth: 0.98,
      borderColor: 'snow',
      paddingRight: 7
    }
});
