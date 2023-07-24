import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React  , {useCallback, useEffect, useState} from 'react'
import { DISH } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import { DetailRestaurantNavigationProp } from '../screens/DetailRestaurant';
import { HOST_URL } from '../store/store';

type DishComponentProp = {
    dish: DISH,
    navigation: DetailRestaurantNavigationProp,
    handlePressItem: () => void
}

const imageDefault = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80";

const DishComponent = ({dish, navigation, handlePressItem}: DishComponentProp) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const pressFunction = () => {
      console.log("dish " + dish.id);
      handlePressItem();
    }
    const image = dish?.imageurl == null ? imageDefault : dish?.imageurl &&  dish?.imageurl?.startsWith("https") ? dish.imageurl : HOST_URL + "/api/images/image/" + dish.imageurl;

  return (
    <View style={tw('px-2')}>
      <TouchableOpacity onPress={pressFunction} disabled={dish.availability == true ? false : true} style={[tw('rounded-md w-full flex-row items-center justify-between border-b border-gray-200 my-2 mb-2 pl-4'), {backgroundColor: dish.availability ? "white" : "#a1a1aa"}]}>
        <View style={tw('flex items-start justify-start flex-1')}>
          <Text style={[tw(' font-bold mb-2 text-black'), {fontSize: 18}]}>{dish.name}</Text>
          <Text style={[tw(' mb-2 text-[#f7691a] font-bold'), {color: dish.availability ? "#f7691a" : "black"}]}>{Math.round(dish.price * 100 / 100).toFixed(2)} €</Text>
          {!dish.availability && (
            <Text style={[tw(' font-bold text-black'), {fontSize: 18}]}>Unsold</Text>
          )}
        </View>
        <Image source={{uri: image}} style={[tw('rounded-md'), {height: 100, width: 120}]}></Image>
      </TouchableOpacity>    
    </View>
  )
}

export default DishComponent

const styles = StyleSheet.create({})