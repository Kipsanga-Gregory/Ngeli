import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PURPLE_INTENSE_THEME, BLUE_THEME, PURPLE_LIGHT_THEME, BORDER_TINT } from '../../constants';

const {width, height} = Dimensions.get('window')
const Header = (props) => {

  return (
    <View style={styles.background}>
        <Text style={styles.left}>
          <Ionicons name="ios-notifications-outline" size={40} color="snow" />
        </Text>
        <Text style={styles.title}>Chain Chain</Text>
        <Text style={styles.right}>
          <Ionicons name="ios-menu" size={40} color="snow" />
        </Text>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
    background:{
      // flex: 0.14,
      height: (9/100) * (height - 47),
      // backgroundColor: 'rgba(52,10,221,0.9)',
      backgroundColor: PURPLE_INTENSE_THEME,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomStartRadius: 6,
      borderBottomEndRadius: 6,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderColor: BORDER_TINT
    },
    title:{
      alignSelf: 'center',
      color: BORDER_TINT,
      fontFamily: 'Tangerine-Bold',
      fontSize: 40
    },
    right:{
      alignSelf: 'flex-end',
      marginRight: 20,
      fontSize: 23,
      color: 'snow',
      paddingBottom: 10
    },
    left:{
      alignSelf: 'flex-end',
      marginLeft: 20,
      fontSize: 23,
      color: 'snow',
      paddingBottom: 10
    }
});
