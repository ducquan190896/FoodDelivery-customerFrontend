import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import RestaurantStack from './RestaurantStack';
import OrderDetailed from '../screens/OrderDetailed';
import OrderStack, { OrderStackParamList } from './OrderStack';
import PersonalStack from './PersonalStack';


export type BottomTabProps = {
    RestaurantStack: {
        screen: string,
        params?: any
    },
    OrderStack: {
        screen: string,
        params?: any
    },
    PersonalStack: {
        screen: string,
        params: any
    }
}

const tab = createBottomTabNavigator<BottomTabProps>();

 

const BottomTabs = () => {
    return (
        <tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarInactiveTintColor: '#FCE4D6',
                tabBarActiveTintColor: '#f7691a',
                unmountOnBlur: true
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
            <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <Entypo name="box" size={24} color={color} />
                    )
                }} 
                name="OrderStack" 
                component={OrderStack}
            ></tab.Screen>
            <tab.Screen 
                options={{
                headerShown: false,
                tabBarIcon: ({color}) => (
                    <FontAwesome name="user" size={28} color={color} />
                    )
                }} 
                name="PersonalStack" 
                component={PersonalStack}
            ></tab.Screen>
           
        </tab.Navigator>
    )
}

export default BottomTabs

const styles = StyleSheet.create({})