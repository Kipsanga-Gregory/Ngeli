import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LottieView from 'lottie-react-native';

export default function WelcomeHeader(props){
    return (
      <View style={styles.container}>
        <View style={styles.first}>
          <Text style={styles.header}>
          <LottieView source={require('../../assets/lottie/ove-pride-heart.json')} autoPlay loop style={{width: 180, height: 205}}/>
          </Text>
        </View>
        <View style={styles.second}>
          <Text style={styles.text}>
            Hey welcome to <Text style={styles.name}>Ngeli</Text>
          </Text>
          <Text style={styles.guideText}>
            <Text style={styles.name2}>Sign In</Text> or click <Text style={styles.name2}>Sign Up</Text> below to create a new account.
          </Text>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  name:{
    fontFamily: 'BalsamiqSans-BoldItalic',
    fontSize: 30
  },
  name2:{
    fontFamily: 'BalsamiqSans-BoldItalic',
    fontSize: 19
  },
  container:{
    marginTop: 30,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent:'space-between',
    marginRight: 10
  },
  first:{
    alignSelf: 'center',
    marginRight: 20
  },
  second:{
    alignSelf: 'center',
    opacity: 1,
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 5
  },
  text:{
    fontSize: 25,
    color: 'white',
    fontFamily: 'BalsamiqSans-BoldItalic',
    letterSpacing: 0.6,
    marginBottom: 5
  },
  guideText:{
    fontFamily: 'BalsamiqSans-Regular',
    fontSize: 18,
    marginTop: 5
  }
});
