import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';
import {BASE_URL, PURPLE_LIGHTER_BACKGROUND} from '../constants'
import Header from '../components/findscreen/header'
import Main from '../components/findscreen/main'
import Popular from '../components/findscreen/popular'


class FindScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      userList: [],
      popularList: []
    }
  }

  componentDidMount(){
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
      data: {
        query: `
        {
          users{
            id
            firstname
            about
            age
            gender
            occupation
            drink
            smoke
            kids
            occupation
            intrestinapp
            contacts
            password
            relstatus
            givenlocation
            livelocation
            age
            contacts
            drink
            viewedad
            plan
            online
            kids
            joined
            images {
              id
              ownerid
              is_profile
              image_url
          }
          }
        }
          `
      }
    }).then((result) => {
      if(result.data.data.users){
        this.setState({userList: this.state.userList.concat(...result.data.data.users)})
      }
    });
    axios({
      url: BASE_URL,
      method: 'post',
      headers: { x_access_token : `${this.props.userdata.x_access_token}`, security: 'secure'},
      data: {
        query: `
        {
          popular{
            id
            firstname
            about
            age
            gender
            occupation
            drink
            smoke
            kids
            occupation
            intrestinapp
            contacts
            password
            relstatus
            givenlocation
            livelocation
            age
            contacts
            drink
            viewedad
            plan
            online
            kids
            joined
            images {
              id
              ownerid
              is_profile
              image_url
          }
          }
        }
          `
      }
    }).then((result) => {
      if(result.data.data.popular){
        this.setState({popularList: this.state.popularList.concat(...result.data.data.popular)})
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Popular navigation={this.props.navigation} data={this.state.popularList}/>
        <Main navigation={this.props.navigation} data={this.state.userList}/>
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userdata: state.AuthReducer.UnregUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindScreen)


const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: PURPLE_LIGHTER_BACKGROUND
    }

});
