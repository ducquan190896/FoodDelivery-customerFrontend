import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity } from 'react-native'
import React  , {useCallback, useEffect, useState} from 'react'
import { useTailwind } from 'tailwind-rn';
import { BASKETDISH } from '../model/index.d';
import { BasketScreenNavigationProp } from '../screens/BasketScreen';

type BasketDishComponentProp = {
    basketDish: BASKETDISH,
    // navigation: BasketScreenNavigationProp,
    handlePressItem: () => void
}

const BasketScreenItem = ({basketDish, handlePressItem}: BasketDishComponentProp) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const pressFunction = () => {
        console.log("basketDish " + basketDish.id);
        handlePressItem();
      }

  return (
    <TouchableOpacity onPress={pressFunction} style={tw('w-full flex-row items-center justify-between border-b border-gray-200 my-2 pb-4 px-4')}>
        <Text style={[tw('text-black mr-4'), {fontSize: 18}]}>{basketDish.quantity}</Text>
        <View style={tw('flex items-start justify-start flex-1')}>
            <Text style={[tw(' font-bold text-black '), {fontSize: 18}]}>{basketDish.dish.name}</Text>
        </View>
        <Text style={tw(' text-black ')}>{Math.round(basketDish.dish.price * basketDish.quantity * 100 / 100).toFixed(2)} €</Text>
    </TouchableOpacity>
  )
}

export default BasketScreenItem

const styles = StyleSheet.create({})