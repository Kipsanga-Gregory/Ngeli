import React, { Component , useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  Image,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Header from './header'
import {connect} from 'react-redux'
import {ToggleAuth, RegNewUser} from '../../store/actions/authActions/authActions'
import { BASE_URL } from '../../constants';
import Preloader from '../pre-loader';

 const SignUp4 = (props)=> {
  // const imageD = require('../../assets/images/background1.jpg')
  const [value4, changeValue4] = useState({})
  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState('')
  const [guide, setGuide] = useState("A picture is worth a thousand words. Let yours be a million, use your best photos!")
  const [User, setUser] = useState({
    ...props.newUser,
    relStatus: 'Single',
    occupation: 'Still a student'
  })

  const onNavigateHandler = ()=>{
    setLoading(true)
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { security: 'public'},
      data: {
        query: `
          mutation {
            adduser(id: ${User.phone}, firstname: "${User.name}", about: "${User.description}", gender: "${User.gender}",
                     occupation: "${User.occupation}", intrestinapp: "${User.intrestInApp}", password: "${User.password}",
                     relstatus: "${User.relStatus}", givenlocation: "${User.location}",
                     age: ${User.age}, contacts: ${User.phone})
            {
              id
              firstname
              about
              gender
              occupation
              intrestinapp
              password
              relstatus
              givenlocation
              livelocation
              age
              contacts
              drink
              viewedad
              kids
              joined
              message
              x_access_token
            }
          }
          `
      }
    }).then((result) => {
      if(result.data.data.adduser.message){
        // setLoading(false)
        if(result.data.data.adduser.message == "User Already exists, maybe try loging in instead"){
          setGuide(result.data.data.adduser.message)
          // props.ToggleAuth()
        }else if(result.data.data.adduser.message == "Created succesfully"){
          axios({
            url: BASE_URL,
            method: 'post',
            headers: { security: 'public'},
            data: {
              query: `
              mutation {
                addimage (ownerid: ${User.phone} , is_profile: true, image_url: "${User.image}" ){
                    message
                    ownerid
                    is_profile
                    image_url
                }
              }
                `
            }
          }).then((result) => {
            if(result.data.data.addimage.message){
              setLoading(false)
              if(result.data.data.addimage.message == "Insert success"){
                // props.navigation.navigate('Sign Up', {name: 'Sign Up'})
                props.ToggleAuth()
              }
            }
          });

        }
      }
    });
  }

  const onChangeLocation = (val) => {
    setUser({
      ...User,
      location : val
    })
  }

  const cloudinaryUpload = (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'ngeli_preset')
    data.append("cloud_name", "greglimo")
    fetch("https://api.cloudinary.com/v1_1/greglimo/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json()).
      then(data => {
        setUser({...User, image: data.secure_url})
        changeValue4({path: data.secure_url})
      }).catch(err => {
        console.log(err)
        Alert.alert("An Error Occured While Uploading")
      })
  }

  const onSelectImage = ()=>{
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
       cropping: true
    }).then(image => {
      const source = {
        uri: image.path,
        type: image.mime,
        name: "thisimage",
      }
      cloudinaryUpload(source)
      // changeValue4(image)
    }).catch((err) => {
      console.log(`erro is ${err}`)
    })
  }
    return (
      <ImageBackground source={require('../../assets/images/background1.jpg')} style={styles.background}>
        <Header guide={guide} />
        <View style={styles.main}>
          <Preloader visible={loading} />
          <View style={styles.first}>
            <Text style={styles.label}>Current Location</Text>
            <TextInput
              style={styles.inputsecond}
              onChangeText={(val)=> onChangeLocation(val)}
              selectionColor={'snow'}
            />
          </View>
          <View style={styles.third}>
            <Text style={styles.label} >Profile Photo</Text>
            <View style={styles.imagewrap}>
              <TouchableOpacity onPress={()=>onSelectImage()}>
                <Image
                  style={styles.image}
                  source={value4.path ? {uri: value4.path} : require('../../assets/images/avatar-default.jpg')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.nextbtn} onPress={()=> onNavigateHandler()}>
              <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
                <Text style={styles.nextbtntext}>
                  Submit
                </Text>
                <Ionicons style={styles.ico} name="ios-save" size={40} color="snow" />
              </View>
        </TouchableOpacity>
      </ImageBackground>
    );
}

const mapStateToProps = (state)=>{
  return{
    newUser : state.AuthReducer.newUser
  }
}

const mapDispatchToProps =(dispatch) =>{
  return{
    ToggleAuth: ()=>dispatch(ToggleAuth()),
    RegUser : (claim)=>dispatch(RegNewUser(claim))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(SignUp4)

const styles = StyleSheet.create({
  image:{
    width: 150,
    height: 150,
    borderRadius: 90,
    resizeMode: 'cover',
    borderColor: 'snow',
    borderWidth: 2,
    overflow: 'hidden'
  },
  imagewrap:{
    // alignItems: 'center',
    marginTop: 7
  },
  nextbtntext:{
    color: 'snow',
    fontSize: 45,
    fontFamily: 'Tangerine-Bold',
    marginRight: 10
  },
  ico:{
    marginLeft: 10,
    alignSelf: 'center'
  },
  nextbtn:{
    alignSelf: 'center',
    marginRight: 20,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 30,
    borderWidth: 1,
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
      alignSelf: 'center'
    },
    second:{
      marginLeft: 20
    },
    third:{
      alignSelf: 'center',
      flexGrow: 0.3,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
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
      opacity: 1,
      borderTopWidth: 0.5,
      alignSelf: 'flex-start',
      borderLeftWidth: 0.6,
      borderRadius: 5,
      borderColor: 'snow',
      paddingRight: 7
    }
});
