import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React  , {useCallback, useEffect, useState} from 'react'
import { DISH } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import { DetailRestaurantNavigationProp } from '../screens/DetailRestaurant';

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


  return (
    <TouchableOpacity onPress={pressFunction} style={tw('w-full flex-row items-center justify-between border-b border-gray-200 my-2 pb-2 px-4')}>
      <View style={tw('flex items-start justify-start flex-1')}>
        <Text style={[tw(' font-bold mb-2 text-black'), {fontSize: 18}]}>{dish.name}</Text>
        <Text style={tw(' mb-2 text-blue-500 font-bold')}>{Math.round(dish.price * 100 / 100).toFixed(2)} €</Text>
      </View>
      <Image source={{uri: dish?.imageurl ? dish?.imageurl : imageDefault}} style={[tw('rounded-md'), {height: 60, width: 80}]}></Image>
    </TouchableOpacity>
  )
}

export default DishComponent

const styles = StyleSheet.create({})