import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { BORDER_TINT, PURPLE_LIGHT_THEME, PURPLE_INTENSE_THEME } from '../../constants';

export default class CustomNav extends Component {
  render() {
    const onChatPress = () => {
      this.props.navigation.navigate('ChatScreen', {name:'ChatScreen'})
    }
    const onVisitsPress = () => {
      this.props.navigation.navigate('Visits', {name: 'Visits'})
    }
    const onFavoritesPress = () => {
      this.props.navigation.navigate('Favorites', {name: 'Favorites'})
    }
    const onLikesPress = () => {
      this.props.navigation.navigate('Likes', {name: 'Likes'})
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.section} onPress={()=>onChatPress()}>
          <SimpleLineIcons name="bubble" size={30} color='green' />
          <Text style={styles.label}>Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={()=>onVisitsPress()}>
          <Ionicons name="ios-menu" size={30} color="grey" />
          <Text style={styles.label}>Visits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={()=>onFavoritesPress()}>
          <Ionicons name="ios-menu" size={30} color="grey" />
          <Text style={styles.label}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.section} onPress={()=>onLikesPress()}>
          <Ionicons name="ios-heart" size={30} color="rgb( 255, 147, 227 )" />
          <Text style={styles.label}>Matches</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    margin: 5,
    height: 80,
    borderWidth: 1,
    borderColor: BORDER_TINT,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: PURPLE_INTENSE_THEME
  },
  label:{
    color: BORDER_TINT,
    alignItems: 'center'
  },
  section:{
    alignSelf: 'center',
    alignItems: 'center'
  }
});
