import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { PURPLE_INTENSE_THEME, BORDER_TINT } from '../../constants';

const {width, height} = Dimensions.get('window')
const Header = ({navigation,atHome}) => {
  const onArrowBack = () => {
    navigation.navigate('ChatScreen', {name:'ChatScreen'})
  }
  return (
    <View style={styles.background}>
        <TouchableOpacity style={styles.left} onPress={()=>onArrowBack()}>
          <Text>
            <SimpleLineIcons name="arrow-left" size={30} color={atHome ? '#341f97' : '#c2bbdf'} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.right} >
          <Text>
            <Ionicons name="ios-menu" size={40} color="snow" />
          </Text>
        </TouchableOpacity>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
    background:{
      // flex: 0.14,
      height: (9/100) * (height - 47),
      // backgroundColor: 'rgba(52,10,221,0.9)',
      // backgroundColor: 'rgba(1,146,252,1)',
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
      color: 'snow',
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
      // fontSize: 23,
      // color: 'snow',
      paddingBottom: 10
    }
});
