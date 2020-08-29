import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';
import {
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
    /** Action imports **/
import {userLogin, RegNewUser, ToggleAuth} from './store/actions/authActions/authActions'
    /** Navigation Imports **/
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
    /** Font Imports **/
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
    /** Screen Imports -Order- Profile,Chat,Find,Swipe,SignUp**/
import ProfileScreen from './screens/profile_screen';
import ChatScreen from './screens/chat_screen';
import Convo from './components/chatscreen/convo';
import Likes from './components/chatscreen/likes_screen';
import Visits from './components/chatscreen/visits_screen';
import Favorites from './components/chatscreen/favorite_screen';
import FindScreen from './screens/find_screen';
import UserScreen from './components/findscreen/user_screen'
import SwipeScreen from './screens/swipe_screen';
import SignUp from './screens/signup_screen';
import AuthNavigator from './screens/auth_navigator';
import { PURPLE_LIGHT_THEME, HEART_PINK, GREEN_CHAT, LOCATION_RED, PURPLE_INTENSE_THEME } from './constants';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
class App extends Component {
  constructor(props){
    super(props)

    this.getData()
    this.HomeTabs = this.HomeTabs.bind(this)
  }
  componentDidMount(){
    SplashScreen.hide()
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userdata')
      if(jsonValue){
        const userdata = JSON.parse(jsonValue)
        this.props.userLogin(userdata)
        this.props.RegNewUser(userdata)
        this.props.toggleAuth(true)
      }else {
        return null
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  HomeTabs (){
    return (
    <Tab.Navigator
      screenOptions={({route})=>({
        tabBarIcon: ({focused, color, size})=>{
          let iconName;

          switch (route.name) {
            case "ChatScreen":
              iconName = "bubble";
              focused ? color = GREEN_CHAT : 'snow'
              break;
            case "SwipeScreen":
              iconName = "heart"
              focused ? color = HEART_PINK : 'snow'
              break
            case "FindScreen":
              iconName = "location-pin"
              focused ? color = LOCATION_RED : 'snow'
              break
            case "ProfileScreen":
              iconName = "user"
              break;
          }
          return <SimpleLineIcons name={iconName} size={33} color={color} />;
        }
      })}
      tabBarOptions={{
        // rgb( 250, 129, 236 )
        activeTintColor: 'snow',
        inactiveTintColor: 'rgb(210,210,210)',
        showLabel: false,
        keyboardHidesTabBar: true,
        tabStyle:{

        },
        style:{
          position: 'absolute',
          height:50,
          borderTopWidth: 2,
          borderColor: 'rgba(52,10,221,0.9)',
          backgroundColor: PURPLE_INTENSE_THEME
        }
      }}

      >
      <Tab.Screen name="SwipeScreen" component={SwipeScreen} />
      <Tab.Screen name="ChatScreen" component={ChatScreen} />
      <Tab.Screen name="FindScreen" component={FindScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  )}
  render(){
    return (
      <NavigationContainer>
        {
          this.props.isAuthenticated ?
          (
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="HomeTabs" component={this.HomeTabs} />
              <Stack.Screen name="UserScreen" component={UserScreen} />
              <Stack.Screen name="Convo" component={Convo} />
              <Stack.Screen name="Likes" component={Likes} />
              <Stack.Screen name="Visits" component={Visits} />
              <Stack.Screen name="Favorites" component={Favorites} />
            </Stack.Navigator>
          )
          :
          (
                  <AuthNavigator />
          )
        }

      </NavigationContainer>
    );
    }
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state)=>{
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    userLogin: (claim)=>dispatch(userLogin(claim)),
    RegNewUser: (claim)=>dispatch(RegNewUser(claim)),
    toggleAuth: (claim)=>dispatch(ToggleAuth(claim))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
