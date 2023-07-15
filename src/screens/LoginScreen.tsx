import { Alert,  Keyboard, KeyboardAvoidingView, KeyboardAvoidingViewBase, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useTailwind from 'tailwind-rn/dist/use-tailwind'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Button } from '@rneui/themed';
import { RootStackParamList } from '../navigators/MainStack'
import { RootState } from '../store/store'
import { login } from '../store/actions/userAction'

const LoginScreen = () => {
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  
})