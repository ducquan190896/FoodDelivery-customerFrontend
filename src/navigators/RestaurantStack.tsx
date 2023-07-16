import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import DetailRestaurant from '../screens/DetailRestaurant'

export type RestaurantStackParamList = {
  HomeScreen: undefined,
  DetailRestaurant: {
    restaurantId: number
  }
}
const stack = createNativeStackNavigator<RestaurantStackParamList>();

const RestaurantStack = () => {
  return (
    <stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        headerShown: false,
      }}>
      <stack.Screen name="HomeScreen" component={HomeScreen} />
      <stack.Screen name="DetailRestaurant" component={DetailRestaurant} />
    </stack.Navigator>
  )
}



export default RestaurantStack

const styles = StyleSheet.create({})