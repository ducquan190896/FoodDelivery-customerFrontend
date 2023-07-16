import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RestaurantStack from './RestaurantStack';


export type BottomTabProps = {
    RestaurantStack: undefined,
  
}

const tab = createBottomTabNavigator<BottomTabProps>();

 

const BottomTabs = () => {
    return (
        <tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#c7c9c9',
                tabBarActiveTintColor: '#6203fc'
            }}
            initialRouteName='RestaurantStack'
        >
            <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <AntDesign name="home" size={28} color={color} />
                    )
                }} 
                name="RestaurantStack" 
                component={RestaurantStack}
            ></tab.Screen>
           
        </tab.Navigator>
    )
}

export default BottomTabs

const styles = StyleSheet.create({})