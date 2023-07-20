import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, ListRenderItem, FlatList, ScrollView } from 'react-native'
import React  , {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTailwind } from 'tailwind-rn';
import { DetailRestaurantNavigationProp } from '../screens/DetailRestaurant';
import { RESTAURANT } from '../model/index.d';

const imageDefault = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";

type HeaderProp = {
    navigation: DetailRestaurantNavigationProp,
    restaurant: RESTAURANT
}

const DetailedRestaurantHeader = ({navigation, restaurant}: HeaderProp) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;

  return (
    <View>
       <View style={tw('relative')}>
            <Image source={{uri: restaurant?.imageurl ? restaurant?.imageurl : imageDefault}} style={[tw('mb-2'), {height: height/3, width: width}]}></Image>
            <TouchableOpacity onPress={() => navigation.goBack()} style={[{top: 10, left: 10, height: 40, width: 40, zIndex: 10}, tw('bg-white rounded-full absolute items-center justify-center')]}>
                <AntDesign name='arrowleft' size={26} color="#f7691a"></AntDesign>
            </TouchableOpacity>
        </View>
        <View style={tw('px-4')}>
            <Text style={tw('text-3xl font-bold text-[#f7691a] my-2')}>{restaurant?.name}</Text>
            <Text style={tw('text-lg text-black')}>{restaurant?.address}, {restaurant?.city} </Text>
            <View style={tw('flex flex-row items-center justify-start mt-6')}>
                <Entypo name={restaurant?.rating > 4 ?  "emoji-flirt" : (restaurant?.rating > 3) ? "emoji-happy" : restaurant?.rating > 2 ? "emoji-neutral" : "emoji-sad"} size={24} color="#f7691a"></Entypo>
                <Text style={tw('mx-2 ml-6 text-lg text-black')}>{(Math.round(restaurant?.rating * 100  / 100).toFixed(2))}</Text>
            </View>
            {restaurant?.estimatedTime && (
                <View style={tw('flex flex-row items-center justify-start my-2 mb-8')}>
                    <Ionicons name='bicycle' size={26} color="#f7691a"></Ionicons>
                    <Text style={tw('mx-2 ml-6 text-lg text-black')}>Delivery in {restaurant?.estimatedTime - 5} - {restaurant?.estimatedTime + 5} minutes</Text>
                </View>
            )}
            
        </View>
    </View>
  )
}

export default DetailedRestaurantHeader

const styles = StyleSheet.create({})