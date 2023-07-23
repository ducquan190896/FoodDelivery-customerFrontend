import { StyleSheet, Text, View, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import { RESTAURANT } from '../model/index.d'
import { useTailwind } from 'tailwind-rn';
import { MainHomeNavigationProp } from '../screens/HomeScreen';
import { HOST_URL } from '../store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingSmiling from './RatingSmiling';

const imageDefault = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80";

type DishCardProp = {
    restaurant: RESTAURANT,
    navigation: MainHomeNavigationProp | SearchRestaurantsNavigationProp
}

const DishCard = ({restaurant, navigation}: DishCardProp) => {
    const tw = useTailwind();
    const width = useWindowDimensions().width;
    const height = useWindowDimensions().height;
    const deliveryTime = restaurant?.estimatedTime ? restaurant?.estimatedTime : restaurant?.cookingTime + 20;
    const image = restaurant?.imageurl == null ? imageDefault : restaurant?.imageurl &&  restaurant?.imageurl?.startsWith("https") ? restaurant.imageurl : HOST_URL + "/api/images/image/" + restaurant.imageurl;

    const navigateToDetailedRestaurant = () => {
        navigation.navigate("DetailRestaurant", {restaurantId: restaurant?.id});
    }

  return (
    <TouchableOpacity onPress={navigateToDetailedRestaurant} style={[{width: width - 20}, tw('my-2 mx-auto')]}>
        <View  style={[tw('bg-white rounded-md mx-2 my-2 border border-2 border-gray-200 pb-2'), ]}>
            {/* <Image source={{uri: restaurant?.imageurl ? HOST_URL + "/api/images/image/" +  restaurant?.imageurl : imageDefault}} style={[tw('w-full rounded-md'), {height: 170}]}></Image> */}
            <Image source={{uri: image}} style={[tw('w-full rounded-md'), {height: height/4}]}></Image>
            <View style={tw('flex-row w-full px-2')}>
                <View style={tw('flex items-start justify-center ml-2 flex-1')}>
                    <Text style={tw('mt-4 text-lg text-black font-bold')}>{restaurant.name.toUpperCase()}</Text>
                    <Text style={tw(' text-zinc-400 font-bold')}>{restaurant.address} {restaurant.city.toUpperCase()}</Text>
                    <View style={tw('flex-row justify-start items-center mt-2')}>
                        <Ionicons name='bicycle' size={26} color="#f7691a"></Ionicons>
                        <Text style={tw('text-zinc-400 text-lg font-bold mx-2')}>{restaurant?.distance?.toFixed(2)} km</Text>
                        <RatingSmiling rating={restaurant?.rating}></RatingSmiling>
                    </View>
                </View>
                <View>
                    <View style={tw('bg-gray-200 flex items-center justify-center px-2 py-2 rounded-md my-2 mx-2')}>
                        <Text style={tw('text-[#f7691a] font-bold')}>{deliveryTime - 5} - {deliveryTime + 5}</Text>
                        <Text style={tw('text-[#f7691a]')}>min</Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default DishCard

const styles = StyleSheet.create({})