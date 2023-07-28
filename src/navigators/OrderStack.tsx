import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OrderDetailed from '../screens/OrderDetailed'
import OrderListScreen from '../screens/OrderListScreen'
import CompletedOrderDetailed from '../screens/CompletedOrderDetailed'


export type OrderStackParamList = {
    OrderListScreen: undefined,
    OrderDetailed: {
        orderID: number
    },
    CompletedOrderDetailed: {
      orderID: number
    }
}
const stack = createNativeStackNavigator<OrderStackParamList>();


const OrderStack = () => {
    return (
        <stack.Navigator
          initialRouteName='OrderListScreen'
          screenOptions={{
            headerShown: false
          }}>
            <stack.Screen name="OrderListScreen" component={OrderListScreen} />
            <stack.Screen name="OrderDetailed" component={OrderDetailed} />
            <stack.Screen name="CompletedOrderDetailed" component={CompletedOrderDetailed} />
         
        </stack.Navigator>
      )
}

export default OrderStack

const styles = StyleSheet.create({})