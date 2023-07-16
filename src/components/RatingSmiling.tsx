import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTailwind } from 'tailwind-rn';
import Entypo from 'react-native-vector-icons/Entypo';

const RatingSmiling = ({rating} : {rating: number}) => {
    const tw = useTailwind();
  return (
    <View style={tw('flex flex-row ml-6 items-center justify-center')}>
        <Entypo name={rating > 4 ?  "emoji-flirt" : (rating > 3) ? "emoji-happy" : rating > 2 ? "emoji-neutral" : "emoji-sad"} size={24} color="gray"></Entypo>
        <Text style={tw('mx-2 text-lg text-gray-500')}>{(Math.round(rating * 100  / 100).toFixed(2))}</Text>
    </View>
  )
}

export default RatingSmiling

const styles = StyleSheet.create({})