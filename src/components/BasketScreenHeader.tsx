import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import { BasketScreenNavigationProp } from '../screens/BasketScreen'
import { RESTAURANT } from '../model/index.d'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTailwind } from 'tailwind-rn';

type HeaderBasketScreenProp = {
    navigation: BasketScreenNavigationProp,
    restaurant: RESTAURANT
}

const BasketScreenHeader = ({navigation, restaurant} : HeaderBasketScreenProp) => {
  const tw = useTailwind();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  return (
    <View style={[tw('px-4 mt-4'), {width: width}]}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={[{ height: 40, width: 40, zIndex: 10}, tw('bg-gray-300 rounded-full  items-center justify-center mt-2')]}>
            <AntDesign name='arrowleft' size={26} color="#f7691a"></AntDesign>
        </TouchableOpacity> */}
        <Text style={tw('text-3xl font-bold text-[#f7691a] my-4 mx-auto')}>{restaurant?.name}</Text>
        <Text style={tw('text-lg font-bold text-black my-4')}>Your items</Text>
    </View>
  )
}

export default BasketScreenHeader

const styles = StyleSheet.create({})