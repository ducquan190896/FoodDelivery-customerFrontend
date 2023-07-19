import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import DetailRestaurant from '../screens/DetailRestaurant'
import BasketScreen from '../screens/BasketScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import MapRestaurants from '../screens/MapRestaurants'

export type RestaurantStackParamList = {
  HomeScreen: undefined,
  DetailRestaurant: {
    restaurantId: number
  },
  BasketScreen: {
    basketId: number,
    restaurantId: number
  },
  CheckoutScreen: {
    basketId: number
  },
  MapRestaurants: undefined
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
      <stack.Screen name="BasketScreen" component={BasketScreen} />
      <stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <stack.Screen name="MapRestaurants" component={MapRestaurants} />
    </stack.Navigator>
  )
}



export default RestaurantStack

const styles = StyleSheet.create({})