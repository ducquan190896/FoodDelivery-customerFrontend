import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import { BasketScreenNavigationProp } from '../screens/BasketScreen'
import { RESTAURANT } from '../model/index.d'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTailwind } from 'tailwind-rn';

type FooterBasketScreenProp = {
    price: number,
    quantity: number
}

const BasketScreenFooter = ({price, quantity}: FooterBasketScreenProp) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
  
    return (
      <View style={[tw('px-4 mt-4'), {width: width}]}>
            <View style={[tw('flex flex-row items-center justify-between my-2'), {}]}>
                <Text style={tw('text-lg text-blue-500 ')}>Total Items</Text>
                <Text style={tw('text-lg text-blue-500 ')}>{quantity}</Text>
            </View>
           <View style={[tw('flex flex-row items-center justify-between my-2'), {}]}>
                <Text style={tw('text-lg text-blue-500 ')}>Total Price</Text>
                <Text style={tw('text-lg text-blue-500 ')}>€{Math.round(price * 100 / 100).toFixed(2)}</Text>
            </View> 
      </View>
    )
}

export default BasketScreenFooter

const styles = StyleSheet.create({})