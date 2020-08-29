import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './signup_screen'
import Login from './login_screen'
import Welcome from './welcome_screen'
import SignUp2 from '../components/sign/signup2'
import SignUp3 from '../components/sign/signup3'
import SignUp4 from '../components/sign/signup4'

const Stack = createStackNavigator()
export default function AuthNavigator() {

    return (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Welcom" component={Welcome} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Sign Up step-2" component={SignUp2} />
          <Stack.Screen name="Sign Up step-3" component={SignUp3} />
          <Stack.Screen name="Sign Up step-4" component={SignUp4} />
        </Stack.Navigator>
    )
}
