import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import Header from '../components/chatscreen/header';
import Chats from '../components/chatscreen/chats';
import CustomNav from '../components/chatscreen/customnav';
window.navigator.userAgent = "react-native";

export default class ChatScreen extends Component {
  constructor(){
    super()

  }

  render(props) {

    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} atHome='true' />
        <CustomNav navigation={this.props.navigation}/>
        <Chats navigation={this.props.navigation}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
container:{
  flex: 1,
  paddingBottom: 54,
  backgroundColor: '#eae8f4'
}
});
