import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import BottomTabs from './BottomTabs';
import OrderDetailed from '../screens/OrderDetailed';
import SignUpScreen from '../screens/SignUpScreen';


export type RootStackParamList = {
    Login: undefined,
    SignUp: undefined,
    ChangePassword: undefined,
    BottomTabs: undefined
};

const stack = createNativeStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <stack.Navigator
      initialRouteName='Login'
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="SignUp" component={SignUpScreen} />
      <stack.Screen name="BottomTabs" component={BottomTabs} />
      
    </stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
