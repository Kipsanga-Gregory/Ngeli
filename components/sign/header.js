import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LottieView from 'lottie-react-native';

export default function Header(props){
    return (
      <View style={styles.container}>
        <View style={styles.first}>
          <Text style={styles.header}>
          <LottieView source={require('../../assets/lottie/love-and-kiss.json')} autoPlay loop style={{width: 90, height: 135}}/>
          </Text>
        </View>
        <View style={{...styles.second, borderColor: props.border ? props.border : 'snow'}}>
          <Text style={styles.text}>
            {props.guide}
          </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 0.4,
    marginTop: 25,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginRight: 10
  },
  header:{
    color: 'snow',
    // alignSelf: 'flex-start',
    fontFamily: 'LobsterTwo-BoldItalic',
    fontSize: 60,
    marginTop: 0,
    paddingTop: 0
  },
  first:{
    // flex: 1
    alignSelf: 'center',
    marginRight: 10
  },
  second:{
    flex: 1,//'#5e5acf'  #6a65ff #504ccb #3732c9 #5b56fb
    // backgroundColor: '#3732c9',
    opacity: 1,
    marginTop: 0,
    flexGrow: 1,
    borderWidth: 1.5,
    borderLeftWidth: 3,
    borderRadius: 10,

    marginLeft: 60,
    padding: 4
  },
  text:{
    fontSize: 20,
    color: 'white',
    fontFamily: 'BalsamiqSans-BoldItalic',
    letterSpacing: 0.6,
  }
});
