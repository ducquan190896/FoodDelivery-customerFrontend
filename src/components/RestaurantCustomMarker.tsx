import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Callout, Marker } from 'react-native-maps'
import { RESTAURANT } from '../model/index.d'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTailwind } from 'tailwind-rn';
import { MapRestaurantsNavigationProp } from '../screens/MapRestaurants';
import { useNavigation } from '@react-navigation/native';

const RestaurantCustomMarker = ({restaurant}: {restaurant: RESTAURANT}) => {
  const width = useWindowDimensions().width;
  const tw = useTailwind();
  const navigation = useNavigation<MapRestaurantsNavigationProp>();

  const navigateToDetailedRestaurant = () => {
    console.log("restaurant " + restaurant?.name)
    navigation.navigate("DetailRestaurant", {restaurantId: restaurant?.id});
  }

  return (
    <Marker
        coordinate={{
            latitude: restaurant?.latitude,
            longitude: restaurant.longitude
        }}
        title={"restaurant"}
        onCalloutPress={() => navigateToDetailedRestaurant()}
    > 
        <>
          <View style={{
              backgroundColor:"white",
              padding: 2,
              borderRadius: 20,
              borderColor: "grey",
              borderWidth: 1,
            }}>
              <Ionicons name="fast-food" size={24} color="#f7691a" />
            </View>
          <Callout>
            <View style={[{minWidth: width /2 }, tw('pt-2 flex-row mx-auto rounded-lg  items-center justify-center')]}>
              <View style={tw('flex-1 items-center justify-center')}>
                <Text style={tw('font-bold text-black text-lg')}>{restaurant?.name}</Text>
                <Text style={tw('font-bold text-gray-500 text-base')}>{restaurant?.address}, {restaurant?.city}</Text>
              </View>
              <AntDesign name="right" size={24} color="black" />
            </View>
          </Callout>
        </>
    </Marker>
  )
}

export default RestaurantCustomMarker

const styles = StyleSheet.create({})