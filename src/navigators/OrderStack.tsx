import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderDetailed from '../screens/OrderDetailed'
import OrderListScreen from '../screens/OrderListScreen'


export type OrderStackParamList = {
    OrderListScreen: undefined,
    OrderDetailed: {
        orderID: number
    },
}
const stack = createNativeStackNavigator<OrderStackParamList>();


const OrderStack = () => {
    return (
        <stack.Navigator
          initialRouteName='OrderDetailed'
          screenOptions={{
            headerShown: false,
          }}>
            <stack.Screen name="OrderListScreen" component={OrderListScreen} />
            <stack.Screen name="OrderDetailed" component={OrderDetailed} />
         
        </stack.Navigator>
      )
}

export default OrderStack

const styles = StyleSheet.create({})